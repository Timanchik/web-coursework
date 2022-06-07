import { TextField, Autocomplete, AppBar, Container, Box, Toolbar, IconButton, Avatar, Menu, ListItem, Typography } from '@mui/material'
import FeedIcon from '@mui/icons-material/Feed';
import AddIcon from '@mui/icons-material/Add';
import { IconButtonLink, ListLinkComposition } from './router/LinkComposition';
import { useUserStore } from '../hooks/useUserStore';
import { useEffect, useState, useMemo } from 'react';
import { debounce } from 'lodash';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from 'react-router-dom';

const theme = createTheme({
    palette: {
        mode: "dark"
    }
});

const pages = [
    {
        to: '/feed',
        title: 'Feed',
        Icon: () => <FeedIcon />
    },
    {
        to: '/add',
        title: 'New Post',
        Icon: () => <AddIcon />
    }
]

const menuPages = [
    {
        to: '/settings',
        title: 'Settings',
    },
]

const Header = () => {
    const { user, logout } = useUserStore()
    const navigate = useNavigate()
    const [search, setSearch] = useState('')
    const [options, setOptions] = useState([])

    const getSuggestions = (search) => {
        if (search !== '') {
            console.log(search)

            fetch('/get-users-list', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({ 'username': search })
            }).then(response => {
                if (response.status === 200) {
                    return response.json()
                }
            }).then(data => {   
                data && setOptions(data.userList)
            })
        }
    }


    const debouncedSave = useMemo(() =>
        debounce((search) => getSuggestions(search), 700)
        , [])

    useEffect(() => {
        debouncedSave(search)
    }, [search, debouncedSave])


    const [anchor, setAnchor] = useState(false)

    return <AppBar position="static">
        <Toolbar>
                <Container sx={{ display: 'flex', flexDirection: 'row', paddingTop: '10px', paddingBottom: '10px' }} maxWidth='md'>
                    <Box sx={{ height: '30px', width: '30px', filter: 'hue-rotate(90deg)', alignSelf: 'center' }}>
                        <img src={require('../resources/logo.png')} alt="logo" width={30} height={30} />
                    </Box>
                    <Box sx={{ flexGrow: '1' }} />
                    <ThemeProvider theme={theme}>
                    <Autocomplete
                        value={search}
                        onChange={(event, newValue) => { newValue !== null && newValue !== '' && navigate(`/user?username=${newValue}`) }}
                        freeSolo
                        options={options}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                size="small"
                                fullWidth
                                onChange={(e) => { setSearch(e.target.value) }}
                                label="Search input"
                                sx={{ marginTop: '6px', width: '200px' }}
                                InputProps={{
                                    ...params.InputProps,
                                    type: 'search',
                                }}
                            />
                        )}
                    />
                    </ThemeProvider>
                    <Box sx={{ flexGrow: '1' }} />
                    {pages.map(({ to, Icon, title }, key) => (
                        <IconButtonLink {...{ to, key }} sx={{ color: 'white' }}>
                            <Icon />
                        </IconButtonLink>
                    ))}
                    <IconButton onClick={e => setAnchor(e.currentTarget)}>
                        <Avatar src={user?.userPic} sx={{ width: 35, height: 35 }}>
                            {!user?.userPic && user?.username[0]}
                        </Avatar>
                    </IconButton>
                    <Menu
                        anchorEl={anchor}
                        open={!!anchor}
                        onClose={() => setAnchor(false)}
                    >
                        <ListLinkComposition to={`/user?username=${user?.username}`}>
                            <Typography>
                                My Page
                            </Typography>
                        </ListLinkComposition>
                        {
                            menuPages.map(({ to, title }, key) => (
                                <ListLinkComposition {...{ to, key }}>
                                    <Typography>
                                        {title}
                                    </Typography>
                                </ListLinkComposition>
                            ))
                        }
                        <ListItem button onClick={() => logout()}>
                            <Typography>
                                Logout
                            </Typography>
                        </ListItem>
                    </Menu>
                </Container>

        </Toolbar>
    </AppBar>
}

export default Header;