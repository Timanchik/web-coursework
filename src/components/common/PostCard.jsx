import { useEffect, useState } from "react"
import { Box, CardContent, Typography, Divider, Dialog, List, TextField, IconButton, DialogContent, Card, CardHeader, Avatar, CardMedia } from "@mui/material"
import { Send, ModeComment, Favorite } from "@mui/icons-material"
import Comment from "./Comment"
import { usePostStore } from "../../hooks/usePostStore"
import moment from "moment"
import { useNavigate } from "react-router-dom"

const PostCard = ({ open, setOpen, imgUrl, likes, id, isLike, description, creator, commentsCount, date, creatorImg, updateContent }) => {
    const [newComment, setNewComment] = useState('')
    const [comments, setComments] = useState([])
    const navigate = useNavigate()
    const { like } = usePostStore()

    useEffect(() => {
        getComments(id)
    }, [])

    const getComments = () => {
        fetch("/get-post-comments", {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ postID: id })
        }).then(response => {
            if (response?.status === 200) {
                return response.json()
            } else {
                throw Error("Failed to get comments")
            }
        }).then(data => {
            setComments(data)
        }).catch(error => {
            console.error(error);
        });
    }

    const sendComment = (comment) => {
        fetch("/add-comment", {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ postID: id, commentData: comment })
        }).then(response => {
            if (response?.status === 200) {
                getComments()
                updateContent()
                return response
            } else {
                throw Error("Failed to send comment")
            }
        }).catch(error => {
            console.error(error);
        });
    }

    const deleteComment = (commentId) => {
        fetch("/del-comment", {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ commentId: commentId })
        }).then(response => {
            if (response?.status === 200) {
                getComments()
                return response
            } else {
                throw Error("Failed to delete comment")
            }
        }).catch(error => {
            console.error(error);
        });
    }

    return <Dialog
        maxWidth="sm"
        fullWidth={true}
        open={open}
        onClose={() => setOpen(false)}
    >
        <DialogContent>
            <Card>
                <CardHeader
                    avatar={
                        <Avatar src={creatorImg} onClick={() => { navigate(`/user?username=${creator}`) }}>
                            {!creatorImg && creator[0]}
                        </Avatar>
                    }
                    title={creator}
                    subheader={moment(date).format('MMMM Do YYYY, h:mm:ss a')}
                    action={
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <IconButton onClick={() => like(id).then(response => {
                                if (response?.status === 200) {
                                    updateContent()
                                }
                            })}>
                                <Favorite sx={{ color: isLike ? 'red' : 'currentColor' }} />
                            </IconButton>
                            <Typography>
                                {likes}
                            </Typography>
                            <IconButton>
                                <ModeComment />
                            </IconButton>
                            <Typography>
                                {commentsCount}
                            </Typography>
                        </Box>
                    }
                />
                <CardMedia
                    component="img"
                    width='100%'
                    image={imgUrl}
                />
                <CardContent>
                    <Typography sx={{marginBottom: '10px'}}>
                        {description}
                    </Typography>
                    <Divider />
                    <TextField
                        sx={{marginTop: '10px'}}
                        multiline
                        InputProps={{
                            endAdornment: <IconButton onClick={() => { if (newComment.length !== 0) { sendComment(newComment); setNewComment('') } }}>
                                <Send />
                            </IconButton>
                        }}
                        fullWidth
                        value={newComment}
                        onChange={e => setNewComment(e.target.value)}>
                    </TextField>
                    <List>
                        {comments.map(({ creatorName, creatorImg, commentData, yours, date, postID }, key) => (
                            <Comment {...{ creatorName, creatorImg, commentData, yours, date, deleteComment, postID }} key={key} />
                        ))}
                    </List>
                </CardContent>
            </Card>
        </DialogContent>
    </Dialog>

}

export default PostCard