import { Box, Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Typography } from '@mui/material'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


type UserProps = {
    username: string
}

const initialUser: UserProps = {
    username: ""
}

type BoardsProps = {
    id: string,
    name: string
}

const initialBoard: BoardsProps = {
    id: "",
    name: ""
}


export default function Header() {
    const [user, setUser] = useState<UserProps>(initialUser)
    const navigate = useNavigate();
    const [boards, setBoards] = useState<BoardsProps[]>([])
    const [newBoard, setNewBoard] = useState<BoardsProps>(initialBoard)
    let currentBoard = ""


    const handleLogout = () => {
        localStorage.removeItem("token")
        navigate("/login")
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setNewBoard((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }


    const handleSubmit = () => {

    }


    const handleSelect = (e: SelectChangeEvent) => {
        console.log(e.target.value)
        console.log(e.target.name)
        currentBoard = e.target.value
        console.log(currentBoard)
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

        const loadAllBoards = async () => {
            try {
                let response = await fetch("http://127.0.0.1:8000/allboard/", {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Token ${localStorage.getItem("token")}`
                    }
                })
                if (response.ok) {
                    let json = await response.json()
                    setBoards(json)
                    console.log("Loading successfull, Board: ", boards)
                }
            } catch (error) {
                console.log("An error occured", error)
            }
        }
        loadAllBoards()

    }, [])


    return (
        <Box p={2} display="flex" justifyContent="space-around" >
            <Typography variant="h3" gutterBottom>
                Welcome on board, {user.username.toLocaleUpperCase()}
            </Typography>
            <Button onClick={handleLogout} sx={{ height: "fit-content", marginRight: "16px" }} variant="contained">Boards</Button>
            <TextField onChange={(e) => handleChange(e)} value={newBoard.id} name='name' id="outlined-basic" label="Boards" variant="outlined" select>
                {boards?.map((item) => (
                    <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
                ))}
            </TextField>
            <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Boards</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={currentBoard}
                        label="Boards"
                        onChange={handleSelect}
                    >
                        {boards?.map((item) => (
                            <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>
            <Button onClick={handleLogout} sx={{ height: "fit-content" }} variant="contained">Logout</Button>
        </Box>

    )
}
