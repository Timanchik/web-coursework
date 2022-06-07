import { IconButton, ListItem, ListItemAvatar, Avatar, ListItemText, Typography, Box } from "@mui/material"
import { useNavigate } from "react-router-dom"
import moment from "moment"
import { Delete } from "@mui/icons-material"

const Comment = ({ creatorName, creatorImg, commentData, yours, date, deleteComment, postID  }) => {
    const navigate = useNavigate()


    return <ListItem alignItems="flex-start">
        <ListItemAvatar>
            <Avatar src={creatorImg} onClick={() => { navigate(`/user?username=${creatorName}`) }}>
                {!creatorImg && creatorName[0]}
            </Avatar>
        </ListItemAvatar>
        <ListItemText
            sx={{ marginTop: '10px' }}
            primary={<Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography sx={{ marginRight: '20px' }}>{creatorName}</Typography>
                <Typography variant="caption" sx={{ marginRight: '40px' }}>{moment(date).format('MMMM Do YYYY, h:mm:ss a')}</Typography>
                {yours && <IconButton
                    onClick={() => deleteComment(postID)}
                >
                    <Delete />
                </IconButton>}
            </Box>
            }
            secondary={<Typography>
                {commentData}
            </Typography>}
        />
    </ListItem>
}

export default Comment