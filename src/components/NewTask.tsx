import { Box, Button, MenuItem, TextField } from '@mui/material'
import { useEffect, useState } from 'react'
import { BoardsProps, OpenProps, TaskItem } from '../utils/types'


const status = [
    {
        value: "todo",
        label: "To Do"
    },
    {
        value: "doing",
        label: "Doing"
    },
    {
        value: "review",
        label: "Review"
    },
    {
        value: "done",
        label: "Done"
    },
]


const initialNewTask: TaskItem = {
    title: "",
    description: "",
    user: "",
    created_at: new Date().toISOString().split('T')[0],
    checked: false,
    status: null,
    id: "",
    user_info: {
        id: "",
        username: ""
    },
    board: ""
}

type AllUsersProps = {
    id: string
    username: string
}

const initialAllUsers: AllUsersProps[] = [{
    id: "",
    username: ""
}]



export default function NewTask({ handleClose, item, tasks, setTasks }: OpenProps) {
    const [newTask, setNewTask] = useState<TaskItem>(initialNewTask)
    const [allUsers, setAllUsers] = useState<AllUsersProps[]>(initialAllUsers)
    const [boards, setBoards] = useState<BoardsProps[]>([])
    const updatedTasks: TaskItem[] = []

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setNewTask(prev => ({
            ...prev!,
            [e.target.name]: e.target.value
        }))
    }

    useEffect(() => {
        if (item) {
            setNewTask(item)
        }
    }, [])


    const URL = item ? `http://127.0.0.1:8000/updateTask/${item.id}/` : "http://127.0.0.1:8000/createTask/"

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const response = await fetch(URL, {
                method: `${item ? "PUT" : "POST"}`,
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Token ${localStorage.getItem("token")}`
                },
                body: JSON.stringify(newTask)
            })
            if (response.ok) {
                const data = await response.json();
                console.log(item ? "Task erfolgreich aktualisiert" : "Task erfolgreich erstellt:", data);
                if (item && tasks && setTasks) {
                    tasks.map((task) => {
                        if (task.id != item.id) {
                            updatedTasks.push(task)
                        } else {
                            updatedTasks.push(data)
                        }
                        setTasks(updatedTasks)
                    })
                }
                setNewTask(initialNewTask)
                handleClose()
            } else {
                console.error(item ? "Fehler beim aktualisieren des Tasks" : "Fehler beim Erstellen des Tasks:", response.statusText);
                console.log("Url", URL)
            }
        } catch (error) {
            console.log("error", error)
        }
    }


    useEffect(() => {
        const loadAllUsers = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/userlist/`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Token ${localStorage.getItem("token")}`
                    }
                })
                let json = await response.json()
                setAllUsers(json)
            } catch (error) {
                console.log(error)
            }
        }
        loadAllUsers()

        const loadAllBoards = async () => {
            try {
                let response = await fetch("http://127.0.0.1:8000/allboard/", {
                    method: "GET",
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
        <>
            <form onSubmit={(e) => handleSubmit(e)}>
                <Box gap={2} sx={{ display: "flex", flexDirection: "column" }}>
                    <TextField onChange={(e) => handleChange(e)} value={newTask.title} name='title' id="outlined-basic" label="Title" variant="outlined" />
                    <TextField onChange={(e) => handleChange(e)} value={newTask.description} name='description' id="outlined-basic" label="Description" variant="outlined" multiline rows={4} />
                    <TextField onChange={(e) => handleChange(e)} value={newTask.user} name='user' id="outlined-basic" label="User" variant="outlined" select>
                        {allUsers.map((item) => (
                            <MenuItem key={item.id} value={item.id}>{item.username}</MenuItem>
                        ))}
                    </TextField>
                    <TextField onChange={(e) => handleChange(e)} value={newTask.status || ""} name='status' id="outlined-basic" label="Status" variant="outlined" select>
                        {status.map((item) => (
                            <MenuItem key={item.value} value={item.value}>{item.label}</MenuItem>
                        ))}
                    </TextField>
                    <TextField onChange={(e) => handleChange(e)} value={newTask.board || ""} name='board' id="outlined-basic" label="Board" variant="outlined" select>
                        {boards.map((item) => (
                            <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
                        ))}
                    </TextField>
                    <Button type="submit" variant="contained">{item ? "Update Task" : "Create Task"}</Button>
                </Box>
            </form>
        </>
    )
}
