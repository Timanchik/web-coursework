import { Stack, TextField, Button, Typography } from "@mui/material"
import useSetState from "../../hooks/useSetState"
import { useNavigate } from "react-router-dom"
import { useUserStore } from "../../hooks/useUserStore"

const regexes = {
    email: /\S+@\S+\.\S+/,
    name: /^[a-zA-Zа-яА-Я]{3,}$/,
    lastName: /^[a-zA-Zа-яА-Я]{3,}$/,
}

const AboutSettings = () => {
    const navigate = useNavigate()
    const { getUserData } = useUserStore()


    const [data, setData] = useSetState({
        aboutUser: "",
        email: "",
        name: "",
        lastName: "",
        error: ''
    })

    const [errors, setErrors] = useSetState({
        aboutUser: "",
        email: "",
        name: "",
        lastName: "",
        userPic: "",
    })

    const validate = (data) => {
        setErrors({
            aboutUser: "",
            email: "",
            name: "",
            lastName: "",
            userPic: "",
        })
        const errors = {}
        if (!regexes.email.test(data.email) && data.email !== "") {
            errors.email = 'Incorrect email'
        }
        if (!regexes.name.test(data.name) && data.name !== "") {
            errors.name = 'Incorrect name'
        }
        if (!regexes.lastName.test(data.lastName) && data.lastName !== "") {
            errors.lastName = 'Incorrect lastname'
        }
        setErrors(errors)
        return Object.keys(errors).length === 0
    }

    const setAbout = (data) => {
        return fetch("/info-update", {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(response => {
            if(response.status === 200) {
                getUserData()
                navigate('/user')
            }
        }).catch(error => {
            console.error(error);
        });
    }

    return <Stack spacing={2}>
        <TextField
            label='About'
            value={data.aboutUser}
            onChange={({ target: { value } }) => setData({ aboutUser: value })}
            error={!!errors.aboutUser}
            helperText={errors.aboutUser}
            fullWidth
        />
        <TextField
            label='Email'
            value={data.email}
            onChange={({ target: { value } }) => setData({ email: value })}
            error={!!errors.email}
            helperText={errors.email}
            fullWidth
        />
        <TextField
            label='Name'
            value={data.name}
            onChange={({ target: { value } }) => setData({ name: value })}
            error={!!errors.name}
            helperText={errors.name}
            fullWidth
        />
        <TextField
            label='LastName'
            value={data.lastName}
            onChange={({ target: { value } }) => setData({ lastName: value })}
            error={!!errors.lastName}
            helperText={errors.lastName}
            fullWidth
        />
        <Typography>
            {data.error}
        </Typography>
        <Button onClick={() => {
            if (!validate(data)) return
            setAbout(data)
        }}>
            Подтвердить
        </Button>
    </Stack>
}

export default AboutSettings