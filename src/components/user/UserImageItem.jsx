import { Badge, Dialog, DialogTitle, DialogActions, Button, DialogContent, ImageListItem, ImageListItemBar, IconButton } from "@mui/material"
import { Favorite, ModeComment, Delete } from "@mui/icons-material";
import { useState } from "react";
import PostCard from "../common/PostCard";
import { usePostStore } from "../../hooks/usePostStore";

const UserImageItem = ({ key, imgUrl, likes, getUserByName, id, isMyProfile, isLike, description, commentsCount, date, userPic, username }) => {
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
    const [commentDialogOpen, setCommentDialogOpen] = useState(false)
    const { like, deletePost } = usePostStore()

    return <>
        <ImageListItem
            sx={{
                '& .MuiImageListItemBar-root': {
                    opacity: 0,
                    transition: 'opacity 0.3s',
                },
                '&:hover': {
                    '& .MuiImageListItemBar-root': {
                        opacity: 1
                    }
                }
            }}
        >
            <img
                height={200}
                src={imgUrl}
                alt={key}
                loading="lazy"
            />
            <ImageListItemBar
                sx={{
                    background: 'linear-gradient(to bottom, rgba(0,0,0,0.8) 0%, ' +
                        'rgba(0,0,0,0.4) 70%, rgba(0,0,0,0.0) 100%)',
                }}
                actionIcon={
                    <>

                        <IconButton onClick={() => {
                            like(id).then(response => {
                                if (response?.status === 200) {
                                    getUserByName()
                                }
                            })
                        }}>
                            <Badge
                                showZero
                                badgeContent={likes} color="primary"
                                anchorOrigin={{
                                    vertical: 'bottom', horizontal: 'right',
                                }}>
                                <Favorite sx={{ color: isLike ? 'red' : 'white', marginRight: '3px' }} />
                            </Badge>
                        </IconButton>
                        <IconButton
                            onClick={() => setCommentDialogOpen(true)}
                            sx={{ color: 'white' }}
                        >
                            <ModeComment />
                        </IconButton>
                        {isMyProfile && <IconButton
                            onClick={() => setDeleteDialogOpen(true)}
                            sx={{ color: 'white' }}
                        >
                            <Delete />
                        </IconButton>}
                    </>
                }
                position="top"
                actionPosition="right"
            />
        </ImageListItem >
        <Dialog
            open={deleteDialogOpen}
            onClose={() => setDeleteDialogOpen(false)}
        >
            <DialogTitle>
                Are you sure you want to delete this image?
            </DialogTitle>
            <DialogContent>
                <img
                    width='100%'
                    src={imgUrl}
                    alt={key}
                    loading="lazy"
                />
            </DialogContent>
            <DialogActions>
                <Button variant='contained' onClick={() => {
                    deletePost(id).then(response => {
                        if (response?.status === 200) {
                            setDeleteDialogOpen(false)
                            getUserByName()
                        }
                    })
                }}>Sure</Button>
                <Button onClick={() => setDeleteDialogOpen(false)}>Candel</Button>
            </DialogActions>
        </Dialog>
        {commentDialogOpen && <PostCard {...{ key, imgUrl, likes, id, isLike, description, commentsCount, date }} creator={username} open={commentDialogOpen} setOpen={setCommentDialogOpen} updateContent={getUserByName} creatorImg={userPic}/>}
    </>
}

export default UserImageItem