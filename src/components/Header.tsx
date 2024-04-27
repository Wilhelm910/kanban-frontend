import { Box, Button, Typography } from '@mui/material'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


type UserProps = {
    username: string
}

const initialUser: UserProps = {
    username: ""
}

export default function Header() {
    const [user, setUser] = useState<UserProps>(initialUser)
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token")
        navigate("/login")
    }



    useEffect(() => {
        const loadCurrentUser = async () => {
            try {
                let response = await fetch("http://127.0.0.1:8000/getCurrentUser/", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Token ${localStorage.getItem("token")}`
                    }
                })
                if (response.ok) {
                    let json = await response.json()
                    setUser(json)
                    console.log("User loading was successfull", user)
                } else {
                    console.error("Data loading failed")
                }
            } catch (error) {
                console.log("An error occurred", error)
            }
        }
        loadCurrentUser()
    }, [])


    return (
        <Box p={2} >
            <Typography variant="h3" gutterBottom>
                Welcome on board, {user.username.toLocaleUpperCase()}
            </Typography>
            <Button onClick={handleLogout} variant="contained">Logout</Button>
        </Box>

    )
}
