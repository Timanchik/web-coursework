import { Dialog, TextField, Stack, DialogContent, Button, IconButton, InputAdornment, Typography } from "@mui/material";
import useSetState from "../hooks/useSetState";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import { useUserStore } from "../hooks/useUserStore";
import theme from "../theme";
import { ButtonLink } from "./router/LinkComposition";
import { useNavigate } from "react-router-dom";
import { useState } from 'react';

const regexes = {
    username: /^[a-zA-Z0-9_]{3,}$/,
    password: /^[a-zA-Z0-9!@#$%^&*?]{8,}$/,
}

const Register = () => {
    const { register } = useUserStore()
    const navigate = useNavigate()
    const [errors, setErrors] = useState({})
    const [data, setData] = useSetState({
        username: {
            value: '',
        },
        password: {
            value: '',
            show: false,
        },
        repeatPassword: {
            value: '',
            show: false,
        },
        errorMessage: ''
    })

    const validate = (data) => {
        if (!regexes.username.test(data.username.value)) {
            console.log(regexes.username.test(data.username.value))
            setErrors(errors => ({ ...errors, username: 'Contains latin letters and numbers and !@#$%^&*? and more than 8 characters' }))
        }
        if (!regexes.password.test(data.password.value)) {
            console.log(regexes.password.test(data.password.value))
            setErrors(errors => ({ ...errors, password: 'Contains latin letters and numbers and !@#$%^&*? and more than 8 characters' }))
        }
        if (data.password.value !== data.repeatPassword.value) {
            setErrors(errors => ({ repeatPassword: 'Passwords do not match', ...errors }))
        }
        console.log(errors)

        return Object.keys(errors).length === 0
    }

    return <Dialog open={true} maxWidth='xs' fullWidth>
        <DialogContent>
            <Stack direction='column' spacing={3}>
                <TextField
                    label='Username'
                    value={data.username.value}
                    onChange={({ target: { value } }) => setData({ username: { ...data.username, value: value } })}
                    error={!!errors?.username}
                    helperText={errors?.username}
                />
                <TextField
                    label='Password'
                    value={data.password.value}
                    onChange={({ target: { value } }) => setData({ password: { ...data.password, value: value } })}
                    type={data.password.show ? 'text' : 'password'}
                    InputProps={{
                        endAdornment: <InputAdornment position="end">
                            <IconButton
                                onClick={() => setData({ password: { ...data.password, show: !data.password.show } })}
                                edge="end"
                            >
                                {data.password.show ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    }}
                    error={!!errors?.password}
                    helperText={errors?.password}
                />
                <TextField
                    label='Repeat password'
                    value={data.repeatPassword.value}
                    onChange={({ target: { value } }) => setData({ repeatPassword: { ...data.repeatPassword, value: value } })}
                    type={data.repeatPassword.show ? 'text' : 'password'}
                    InputProps={{
                        endAdornment: <InputAdornment position="end">
                            <IconButton
                                onClick={() => setData({ repeatPassword: { ...data.repeatPassword, show: !data.repeatPassword.show } })}
                                edge="end"
                            >
                                {data.repeatPassword.show ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    }}
                    error={!!errors?.repeatPassword}
                    helperText={errors?.repeatPassword}
                />
                {data.errorMessage && <Typography
                    variant='subtitle1'
                    sx={{ color: theme.palette.error.main }}>{data.errorMessage}
                </Typography>}
                <Button
                    variant='contained'
                    onClick={
                        () => {
                            setErrors({})
                            if (!validate(data)) return
                            else {
                                register({ username: data.username, password: data.password })
                                    .then((response) => {
                                        if (response.status === 200) {
                                            navigate('/login')
                                        }
                                        if (response?.errorMessage) {
                                            setData({ errorMessage: response.errorMessage });
                                        }
                                    });
                            }
                        }

                    }
                >
                    Register
                </Button>
                <ButtonLink variant='outlined' to='/login'>
                    Go to login
                </ButtonLink>
            </Stack>
        </DialogContent>
    </Dialog>
}

export default Register
