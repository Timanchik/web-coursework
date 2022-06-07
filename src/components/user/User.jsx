import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "../Header";
import { useState } from "react";
import { Badge, Tooltip, useTheme, useMediaQuery, Typography, Container, Stack, Button, Avatar, CardHeader, Card, ImageList, IconButton, LinearProgress } from "@mui/material";
import { useUserStore } from "../../hooks/useUserStore";
import UserImageItem from "./UserImageItem";
import ContactsIcon from '@mui/icons-material/Contacts';
import GroupIcon from '@mui/icons-material/Group';
import { Box } from "@mui/system";
import UserListDialog from "./UserListDIalog";

const User = () => {
    let [searchParams, setSearchParams] = useSearchParams({});
    const [userProfile, setUserProfile] = useState({});
    const [isMyProfile, setIsMyProfile] = useState(false);
    const [dialogType, setDialogType] = useState(false);
    const { user } = useUserStore();

    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
    const isTablet = useMediaQuery(theme.breakpoints.down('md'))

    const getUserByName = (username) => {
        fetch("/get-user-by-username", {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ username: username })
        }).then(response => {
            if (response.status === 200) {
                return response.json()
            } else {
                throw Error("Failed to get user profile")
            }
        }).then(response => {
            console.log(response)
            setUserProfile({ ...response });

        }).catch(error => {
            console.error(error);
        });
    }

    const subscribe = (id) => {
        fetch("/subscribe", {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ id: id })
        }).then(response => {
            if (response.status === 200) {
                getUserByName(userProfile?.username)
                // setUserProfile({...userProfile, subStatus: !userProfile?.subStatus })
            } else {
                throw Error("Failed to subscribe")
            }
        }).catch(error => {
            console.error(error);
        });
    }

    useEffect(() => {
        const username = searchParams.get('username') ?? user?.username;
        if (user?.username === username) {
            setIsMyProfile(true);
        } else {
            setIsMyProfile(false);
        }
        if (username) {
            getUserByName(username);
        }
    }, [searchParams, user])

    console.log(userProfile)

    return <>
        <Header />
        {
            !userProfile?.username ? <LinearProgress /> :
                userProfile === null ? <Typography variant="h4">User not found</Typography> :
                    <Container maxWidth='md' sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px', overflowX: 'hidden', width: '100%' }}>
                        <Stack sx={{ flex: 1 }}>
                            <Card>
                                <CardHeader
                                    avatar={
                                        <Avatar src={userProfile?.userPic}
                                            sx={{ height: '150px', width: '150px' }}>
                                            <Typography variant="h1">
                                                {!userProfile?.userPic && userProfile?.username[0]}
                                            </Typography>
                                        </Avatar>
                                    }
                                    action={<Box sx={{ margin: '5px 5px 0 0' }}>
                                        <Tooltip title='Subscribers'>
                                            <IconButton onClick={() => setDialogType('subscribers')}>
                                                <Badge showZero badgeContent={userProfile?.subscribers.length ?? 0} color="primary">
                                                    <ContactsIcon />
                                                </Badge>
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title='Subscriptions' onClick={() => setDialogType('subscriptions')}>
                                            <IconButton>
                                                <Badge showZero badgeContent={userProfile?.subscriptions.length ?? 0} color="primary">
                                                    <GroupIcon />
                                                </Badge>
                                            </IconButton>
                                        </Tooltip>
                                        {!isMyProfile && <Button onClick={() => subscribe(userProfile?.id)}>
                                            {userProfile?.subStatus ? 'Unsubscribe' : 'Subscribe'}
                                        </Button>}
                                    </Box>
                                    }
                                    title={<Typography variant="h3">{userProfile?.username}</Typography>}
                                    subheader={<>
                                        <Typography variant="h4">{userProfile?.name} {userProfile?.lastName}</Typography>
                                        <Typography variant="h6">{userProfile?.aboutUser}</Typography>
                                    </>}
                                />
                            </Card>
                            <ImageList variant="masonry" cols={isMobile ? 1 : isTablet ? 2 : 3} gap={8}>
                                {userProfile.posts.map(({ imgUrl, likes, _id, isLike, description, creator, commentsCount, date }) => <UserImageItem {...{ imgUrl, likes, isMyProfile, isLike, description, creator, commentsCount, date }} userPic={userProfile?.userPic} getUserByName={() => getUserByName(userProfile?.username)} key={_id} id={_id}  username={userProfile?.username}/>)}
                            </ImageList>
                        </Stack>
                    </Container>
        }
        {dialogType && userProfile[dialogType].length !== 0 && <UserListDialog open={!!dialogType} setOpen={setDialogType} list={dialogType === 'subscribers' ? userProfile?.subscribers : userProfile?.subscriptions}/>}
    </>
}
export default User