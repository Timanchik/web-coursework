import { Typography } from "@mui/material"
import { Link } from "react-router-dom"

const Error = () => {
    return <div sx={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
    }}>
        <div sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: '20px'
        }}>
            <Typography variant='h3' sx={{
                padding: '5px 15px 5px 0px',
                borderRight: '2px solid black',
                marginRight: '15px'
            }}>404</Typography>
            <Typography variant='h5'>Page not found</Typography>
        </div>
        <Link to="/" sx={{
            textDecoration: 'none',
            fontSize: '1.2rem'
        }}>
            Go to main page
        </Link>
    </div>
}

export default Error
