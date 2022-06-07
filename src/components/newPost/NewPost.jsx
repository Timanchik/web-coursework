import useSetState from "../../hooks/useSetState"
import Header from "../Header"
import { useTheme, Typography, Container, Stack, TextField, Input, Button } from "@mui/material"
import { usePostStore } from "../../hooks/usePostStore"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const NewPost = () => {
    const { addPost } = usePostStore()
    const navigate = useNavigate()
    const theme = useTheme()

    const [data, setData] = useSetState({
        postImage: '',
        description: '',
    })
    const [error, setError] = useState(null)

    const validate = (data) => {
        if (data.postImage === '') {
            setError('Please select an image')
            return false
        }
        return true
    }


    return <>
        <Header />
        <Container maxWidth='md' sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px', width: '100%' }}>
            <Stack spacing={2}>
                <TextField
                    label='Description'
                    value={data.description}
                    onChange={({ target: { value } }) => setData({ description: value })}
                    fullWidth
                />
                <Input inputProps={{ accept: "image/png, image/jpeg, image/jpg" }} type="file"
                    onChange={e => setData({ postImage: e.target.files[0] })}
                />
                <Typography variant='subtitle1' sx={{ color: theme.palette.error.main }}>{error}</Typography>
                <Button onClick={() => {
                    if (!validate(data)) return
                    addPost(data).then(response => {
                        console.log(response)
                        if (response.status === 200) {
                            navigate('/user')
                        } else {
                            setError(response?.errorMessage)
                        }
                    })
                }}>
                    Подтвердить
                </Button>
            </Stack>
        </Container>

    </>

}

export default NewPost