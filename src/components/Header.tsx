import { Box, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom';

export default function Header() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token")
        navigate("/login")
    }


    return (
        <Box
            p={2}
        >
            <Button onClick={handleLogout} variant="contained">Logout</Button>
        </Box>

    )
}
