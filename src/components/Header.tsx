import { Box, Button, FormControl, InputLabel, MenuItem, Modal, Select, SelectChangeEvent, Typography } from '@mui/material'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BoardsProps } from '../utils/types';
import NewBoard from './NewBoard';
import NewAccount from './NewAccount';

type UserProps = {
    username: string
}

const initialUser: UserProps = {
    username: ""
}

type ToastProps = {
    notify: (message: string) => void
  }


export default function Header({ notify }: ToastProps) {
    const [user, setUser] = useState<UserProps>(initialUser)
    const navigate = useNavigate();
    const [boards, setBoards] = useState<BoardsProps[]>([])
    const [selectedBoard, setSelectedBoard] = useState<string>("")
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };



    const handleLogout = () => {
        localStorage.removeItem("token")
        navigate("/login")
    }


    const handleSelect = (e: SelectChangeEvent) => {
        const selectedValue = e.target.value as string;
        setSelectedBoard(selectedValue);
        navigate(`/board/${selectedValue}`);
    }

    const loadAllBoards = async () => {
        try {
            let response = await fetch("http://127.0.0.1:8000/boards/", {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Token ${localStorage.getItem("token")}`
                }
            })
            if (response.ok) {
                let json = await response.json()
                setBoards(json)
            }
        } catch (error) {
            console.log("An error occured", error)
        }
    }

    const loadCurrentUser = async () => {
        try {
            let response = await fetch("http://127.0.0.1:8000/users/current/", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Token ${localStorage.getItem("token")}`
                }
            })
            if (response.ok) {
                let json = await response.json()
                setUser(json)
            } else {
                console.error("Data loading failed")
            }
        } catch (error) {
            console.log("An error occurred", error)
        }
    }

    const loadCurrentBoard = () => {
        const currentUrl = window.location.href;
        const lastIndex = currentUrl.lastIndexOf('/');
        const currentBoard = currentUrl.substring(lastIndex + 1);
        if (currentBoard) {
            setSelectedBoard(currentBoard)
        }
    }



    useEffect(() => {
        if (localStorage.getItem("token")) {
            loadCurrentUser()
            loadAllBoards()
            loadCurrentBoard()
        }
    }, [localStorage.getItem("token")])


    useEffect(() => {
        const loadDefaultBoard = () => {
            const defaultBoard = boards.find(board => board.name === "Default")
            if (defaultBoard) {
                setSelectedBoard(defaultBoard.id)
                navigate(`/board/${defaultBoard.id}`);
            }
        }
        loadDefaultBoard()
    }, [boards])


    const renderLoggedInInfo = () => {
        return (
            <>
                <Typography mb={0} variant="h3" gutterBottom>
                    Welcome on board, {user.username.slice(0, 1).toUpperCase() + user.username.slice(1, -1).toLowerCase()}
                </Typography>
                <Button sx={{ marginRight: "4px" }} onClick={handleOpen} variant="contained">Create New Board</Button>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <NewBoard notify={notify} loadAllBoards={loadAllBoards} handleClose={handleClose} />
                    </Box>
                </Modal>
                <Box sx={{ minWidth: 120, marginRight: "4px" }}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Boards</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={selectedBoard}
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
            </>
        )
    }

    const renderNotLoggedInInfo = () => {
        return (
            <>
                <Box display="flex" alignItems="center">
                    <Typography mr={2}>Create an Account and Join this Awesome Board</Typography>
                    <Button onClick={handleOpen} sx={{ height: "fit-content" }} variant="contained">Join</Button>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                            <NewAccount notify={notify} handleClose={handleClose} />
                        </Box>
                    </Modal>
                </Box>
            </>
        )
    }


    return (
        <Box p={2} m={2} borderRadius={2} display="flex" justifyContent="space-around" alignItems="center" minHeight="100px" bgcolor="#f5f2f5">
            {localStorage.getItem("token") ? renderLoggedInInfo() : renderNotLoggedInInfo()}
        </Box >

    )
}
