import { Box, Button, MenuItem, TextField } from '@mui/material'
import { useEffect, useState } from 'react'
import { TaskItem, TaskProps } from '../utils/types'


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
    status: null
}

type AllUsersProps = {
    id: string
    username: string
}

const initialAllUsers: AllUsersProps[] = [{
    id: "",
    username: ""
}]

type OpenProps = {
    handleClose: () => void
    item: TaskItem
}

export default function NewTask({ handleClose, item }: OpenProps) {
    const [newTask, setNewTask] = useState<TaskItem>(initialNewTask)
    const [allUsers, setAllUsers] = useState<AllUsersProps[]>(initialAllUsers)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setNewTask(prev => ({
            ...prev!,
            [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log(newTask)
        try {
            const response = await fetch(`http://127.0.0.1:8000/createTask/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Token ${localStorage.getItem("token")}`
                },
                body: JSON.stringify(newTask)
            })
            if (response.ok) {
                const data = await response.json();
                console.log("Task erfolgreich erstellt:", data);
                setNewTask(initialNewTask)
                handleClose()

            } else {
                console.error("Fehler beim Erstellen des Tasks:", response.statusText);
            }
        } catch (error) {
            console.log("error")
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
    }, [])


    return (
        <>
            <form onSubmit={(e) => handleSubmit(e)}>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
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
                    <Button type="submit" variant="contained">Create Task</Button>
                </Box>
            </form>
        </>
    )
}