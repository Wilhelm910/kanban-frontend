import { Box, Button, Modal, Typography } from "@mui/material";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import NewTask from "./NewTask";
import Task from "./Task";
import { TaskItem } from "../utils/types";

type StatusBoxProps = {
    status: 'todo' | 'doing' | 'review' | 'done';
    bgcolor: string;
    children: React.ReactNode;
}


export default function Board() {

    const [tasks, setTasks] = useState<TaskItem[]>([])
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const navigate = useNavigate();

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



    useEffect(() => {
        const loadTasks = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/board/`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Token ${localStorage.getItem("token")}`
                    }
                })
                let json = await response.json()
                setTasks(json)
                if (response.ok) {
                    console.log("Data loading was successfull")
                } else if (response.status == 401) {
                    navigate("/login")
                } else {
                    console.error("Data loading failed")
                }
            } catch (error) {
                console.error("An error occured", error)
            }
        }
        loadTasks()
    }, [])

    const StatusBox = ({ bgcolor, status, children }: StatusBoxProps) => {
        return (
            <Box sx={{ width: "100%", bgcolor, flex: "1", padding: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
                <Typography>{children}</Typography>
                {tasks.map((item) => {
                    return (
                        item.status == status && <Task key={item.id} item={item} />
                    )
                })}
            </Box>
        )
    }


    return (
        <>
            <Button onClick={handleOpen} sx={{ width: "200px", display: "inline-block" }} variant="contained">Add new Task</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <NewTask handleClose={handleClose} />
                </Box>
            </Modal>
            <Box display="flex" justifyContent="space-around" width="100%">
                <StatusBox status="todo" bgcolor="lightgreen">To Do</StatusBox>
                <StatusBox status="doing" bgcolor="lightcyan">Doing</StatusBox>
                <StatusBox status="review" bgcolor="lightcoral">Review</StatusBox>
                <StatusBox status="done" bgcolor="lightpink">Done</StatusBox>
            </Box>
        </>
    )
}
