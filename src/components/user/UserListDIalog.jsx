import { ListItemText, Dialog, DialogActions, DialogContent, List, ListItem, ListItemAvatar, Avatar, Typography, Button } from "@mui/material"
import { useNavigate } from "react-router-dom"

const UserListDialog = ({ open, setOpen, list }) => {
    const navigate = useNavigate()

    return <Dialog
        open={open}
        onClose={() => setOpen(false)}
    >
        <DialogContent>
            <List>
                {list.map(({ userPic, username }, key) => (
                    <ListItem key={key} onClick={() => {navigate(`/user?username=${username}`); setOpen(false)}} sx={{cursor: 'pointer'}}>
                        <ListItemAvatar>
                            <Avatar src={userPic} >
                                <Typography variant="h5">
                                    {!userPic && username[0]}
                                </Typography>
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={username} />
                    </ListItem>
                ))}
            </List>
        </DialogContent>
        <DialogActions>
            <Button onClick={() => setOpen(false)}>Close</Button>
        </DialogActions>
    </Dialog>
}

export default UserListDialog