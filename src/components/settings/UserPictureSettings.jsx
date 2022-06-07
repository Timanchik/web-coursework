import { Stack, Button, Typography, Input } from "@mui/material"
import useSetState from "../../hooks/useSetState"
import { getFormData } from "../../utils/getFormData"
import { useNavigate } from "react-router-dom"
import { useUserStore } from "../../hooks/useUserStore"

const UserPictureSettings = () => {
    const navigate = useNavigate()
    const { getUserData } = useUserStore()
    const [data, setData] = useSetState({
        value: null,
        error: null
    })

    const setUserPic = (image) => {
        const formData = getFormData({ avatar: image })
        return fetch("api/upload-avatar", {
            method: 'POST',
            body: formData
        }).then(response => {
            if (response.status === 200) {
                getUserData()
                navigate('/user')
            }
        }).catch(error => {
            console.error(error);
        });
    }

    return <Stack spacing={2}>
        <Input
            inputProps={{ accept: "image/png, image/jpeg, image/jpg" }} type="file"
            onChange={e => setData({ value: e.target.files[0] })}
            sx={{ marginTop: '20px' }} />
        <Typography>
            {data.error}
        </Typography>
        <Button onClick={() => {
            if (data.value === null) {
                setData({ error: 'Please select an image' })
                return
            }
            setUserPic(data.value)
        }}>
            Подтвердить
        </Button>
    </Stack>
}

export default UserPictureSettings