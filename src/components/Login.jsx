import { LinearProgress, Dialog, TextField, Stack, DialogContent, Button, IconButton, InputAdornment, Typography } from "@mui/material";
import useSetState from "../hooks/useSetState";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import { useUserStore } from "../hooks/useUserStore";
import { Navigate } from "react-router-dom";
import theme from "../theme";
import { ButtonLink } from "./router/LinkComposition";

const Login = () => {

    const [data, setData] = useSetState({
        username: '',
        password: '',
        showPassword: false,
        errorMessage: ''
    })
    const { login, isAuthenticated } = useUserStore()

    if (isAuthenticated === null) {
        return <LinearProgress />
    }

    if (isAuthenticated) {
        return <Navigate to="/" />
    }

    return <Dialog open={true} maxWidth='xs' fullWidth>
        <DialogContent>
            <Stack direction='column' spacing={3}>
                <TextField
                    label='Username'
                    value={data.username}
                    onChange={({ target: { value } }) => setData({ username: value })}
                />
                <TextField
                    label='Password'
                    value={data.password}
                    onChange={({ target: { value } }) => setData({ password: value })}
                    type={data.showPassword ? 'text' : 'password'}
                    InputProps={{
                        endAdornment: <InputAdornment position="end">
                            <IconButton
                                onClick={() => setData({ showPassword: !data.showPassword })}
                                edge="end"
                            >
                                {data.showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    }}
                />
                {data.errorMessage && <Typography
                    variant='subtitle1'
                    sx={{ color: theme.palette.error.main }}>{data.errorMessage}
                </Typography>}
                <Button
                    variant='contained'
                    onClick={
                        () => {
                            setData({ errorMessage: null });
                            login({ username: data.username, password: data.password })
                                .then((response) => {
                                    if (response?.errorMessage) {
                                        setData({ errorMessage: response.errorMessage });
                                    }
                                });
                        }
                    }
                >
                    Login
                </Button>
                <ButtonLink variant='outlined' to='/register'>
                    Go to register
                </ButtonLink>
            </Stack>
        </DialogContent>
    </Dialog>
}

export default Login
