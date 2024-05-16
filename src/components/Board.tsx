import { Box, Button, Modal, Typography } from "@mui/material";
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import NewTask from "./NewTask";
import Task from "./Task";
import { TaskItem } from "../utils/types";
import { fetchTasks } from "../services/api";

type StatusBoxProps = {
    status: 'todo' | 'doing' | 'review' | 'done';
    bgcolor: string;
    children: React.ReactNode;
}

type ToastProps = {
    notify: (message: string) => void
}



export default function Board({ notify }: ToastProps) {

    const [tasks, setTasks] = useState<TaskItem[]>([])
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const navigate = useNavigate();
    const params = useParams()

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


    const loadTasks = async () => {
        const token = localStorage.getItem("token")
        if (!token) {
            navigate("/login")
            return
        }
        const fetchedTasks = await fetchTasks(token)
        setTasks(fetchedTasks)
    }

    useEffect(() => {
        loadTasks()
    }, [open, navigate])


    const StatusBox = ({ bgcolor, status, children }: StatusBoxProps) => {
        return (
            <Box borderRadius={2} sx={{ width: "100%", bgcolor, flex: "1", padding: 2, display: "flex", flexDirection: "column", alignItems: "center" }}>
                <Typography variant="h6" sx={{ marginBottom: "8px" }}>{children}</Typography>
                {tasks.map((item) => {
                    if (item.board == params.id) {
                        return (
                            item.status == status && <Task key={item.id} item={item} tasks={tasks} setTasks={setTasks} />
                        )
                    }
                })}
            </Box>
        )
    }


    return (
        <>
            <Button onClick={handleOpen} sx={{ width: "200px", display: "inline-block", margin: "4px", alignSelf: "center" }} variant="contained">Add new Task</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <NewTask notify={notify} handleClose={handleClose} />
                </Box>
            </Modal>
            <Box gap={1} p={2} display="flex" justifyContent="space-around" width="100%">
                <StatusBox status="todo" bgcolor="#ebe6ec">To Do</StatusBox>
                <StatusBox status="doing" bgcolor="#d8cdd9">Doing</StatusBox>
                <StatusBox status="review" bgcolor="#c4b5c6">Review</StatusBox>
                <StatusBox status="done" bgcolor="#b19cb3">Done</StatusBox>
            </Box>
        </>
    )
}
