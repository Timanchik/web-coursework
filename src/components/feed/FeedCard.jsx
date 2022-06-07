import { CardContent, Box, TextField, Dialog, DialogContent, List, Avatar, Card, CardHeader, IconButton, CardActions, CardMedia, Typography, Collapse } from "@mui/material"
import { Favorite, ModeComment, Send, ExpandMoreSharp } from "@mui/icons-material"
import { usePostStore } from "../../hooks/usePostStore"
import { useState } from "react"
import { styled } from "@mui/system"
import moment from 'moment'
import { useNavigate } from "react-router-dom"
import PostCard from "../common/PostCard"

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

const FeedCard = ({ commentsCount, creatorImg, creator, date, imgUrl, likes, description, isLike, getFeed, id }) => {
    const { like, sendComment } = usePostStore()
    const [open, setOpen] = useState(false)
    const [expanded, setExpanded] = useState(false)
    const navigate = useNavigate()


    return <>
        <Card>
            <CardHeader
                avatar={
                    <Avatar src={creatorImg} onClick={() => {navigate(`/user?username=${creator}`)}}>   
                        {!creatorImg && creator[0]}
                    </Avatar>
                }
                title={creator}
                subheader={moment(date).format('MMMM Do YYYY, h:mm:ss a')}
            />
            <CardMedia
                component="img"
                height="500"
                image={imgUrl}
            />
            <CardActions>
                <IconButton onClick={() => like(id).then(response => {
                    if (response?.status === 200) {
                        getFeed()
                    }
                })}>
                    <Favorite sx={{ color: isLike ? 'red' : 'currentColor' }} />
                </IconButton>
                <Typography>
                    {likes}
                </Typography>
                <IconButton onClick={() => setOpen(true)}>
                    <ModeComment />
                </IconButton>
                <Typography>
                    {commentsCount}
                </Typography>
                <Box sx={{ flexGrow: 1 }} />
                <ExpandMore
                    expand={expanded}
                    onClick={() => setExpanded(!expanded)}
                >
                    <ExpandMoreSharp />
                </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography>
                        {description}
                    </Typography>
                </CardContent>
            </Collapse>
        </Card>
        {open && <PostCard updateContent={getFeed} {...{commentsCount, creatorImg, creator, date, imgUrl, likes, description, isLike, getFeed, open, setOpen, id}}/> }
    </>
}

export default FeedCard