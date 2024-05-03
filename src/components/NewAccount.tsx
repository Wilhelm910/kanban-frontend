import { Box, Button, TextField } from '@mui/material'
import React, { useState } from 'react'


type NewAccountProps = {
    handleClose: () => void
}


type NewUserProps = {
    username: string
    password: string
}

const initialNewUser = {
    username: "",
    password: ""
}



export default function NewAccount({ handleClose }: NewAccountProps) {
    const [newUser, setNewUser] = useState<NewUserProps>(initialNewUser)
    const [confirmPassword, setConfirmPassword] = useState<string>("")

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (e.target.name == "confirmPassword") {
            setConfirmPassword(e.target.value)
        } else {
            setNewUser((prev) => ({
                ...prev,
                [e.target.name]: e.target.value
            }))
        }
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (newUser.password && newUser.password !== confirmPassword) {
            console.log("Passwords do not match");
            setNewUser(initialNewUser)
            setConfirmPassword("")
            return;
        }
        try {
            let response = await fetch("http://127.0.0.1:8000/createUser/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newUser)
            })
            if (response.ok) {
                const data = await response.json()
                console.log("New User created: ", data)
                setNewUser(initialNewUser)
                setConfirmPassword("")
            } else {
                console.error("Fehler beim Erstellen des Tasks:", response.statusText);
            }

        }
        catch (error) {
            console.log("An error occured: ", error)
        }
        handleClose()
    }



    return (
        <form onSubmit={(e) => handleSubmit(e)}>
            <Box display="flex" gap={2}>
                <TextField onChange={(e) => handleChange(e)} name="username" value={newUser.username || ""} id="outlined-basic" label="Name" type="text" variant="outlined" />
                <TextField onChange={(e) => handleChange(e)} name="password" value={newUser.password || ""} id="outlined-basic" label="Password" type="password" variant="outlined" />
                <TextField onChange={(e) => handleChange(e)} name="confirmPassword" value={confirmPassword || ""} id="outlined-basic" label="Confirm Password" type="password" variant="outlined" />
                <Button type="submit" variant="contained">Create</Button>
            </Box>
        </form>
    )
}
