import Header from "../Header"
import { usePostStore } from "../../hooks/usePostStore"
import { Container, Stack, Box } from "@mui/material"
import FeedCard from "./FeedCard"
import { useEffect } from "react"
import { observer } from "mobx-react-lite"
import { CircularProgress } from "@mui/material"
import { useState } from "react"

const Feed = observer(() => {
    const [feed, setFeed] = useState([])

    const getFeed = () => {
        fetch("/get-feed", {
            method: 'POST',
        }).then(response => {
            if (response.status === 200) {
                return response.json()
            } else {
                throw Error("Failed to get user data")
            }
        }).then(data => {
            console.log(data)
            setFeed(data)
        }).catch(error => {
            console.error(error);
        });
    }

    useEffect(() => {
        getFeed()
    }, [])

    return <>
        <Header />
        <Box sx={{width: '100vw', overflowX: 'hidden'}}>
            <Container maxWidth='md' sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px', overflowX: 'hidden', width: '100%'}}>
                {feed !== null ? <Stack spacing={2}>
                    {feed?.map(({commentsCount, creatorImg, creator, _id, date, imgUrl, likes, description, isLike}) => {
                        return <FeedCard {...{imgUrl, likes, isLike, description, commentsCount, date, creatorImg, creator, getFeed}} key={_id} id={_id}/>
                    })}
                </Stack> :
                    <CircularProgress />
                }
            </Container>
        </Box>
    </>
})

export default Feed