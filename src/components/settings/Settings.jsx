import { Tabs, Tab, Input, Box, Container, Stack, TextField, Typography, Button } from "@mui/material"
import Header from "../Header"
import { useUserStore } from "../../hooks/useUserStore"
import { useEffect } from "react"
import { useState } from "react"
import AboutSettings from './AboutSettings'
import UserPictureSettings from './UserPictureSettings'

const Settings = () => {
    const [activeTab, setActiveTab] = useState('about') 

    return <>
        <Header />
        <Box sx={{ width: '100vw', overflowX: 'hidden' }}>
            <Container maxWidth='md' sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px', width: '100%', flexGrow: 1, display: 'flex' }}>
                <Tabs
                    orientation="vertical"
                    value={activeTab}
                    onChange={(event, value) => setActiveTab(value)}
                    sx={{ borderRight: 1, borderColor: 'divider', marginRight: '20px' }}
                >
                    <Tab label='About' id='about' value='about'/>
                    <Tab label='User Picture' id='userPicture' value='userPicture'/>
                </Tabs>
                {activeTab === 'about' && <AboutSettings />}
                {activeTab === 'userPicture' && <UserPictureSettings />}
            </Container>
        </Box>
    </>
}

export default Settings