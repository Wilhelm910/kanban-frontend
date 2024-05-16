import { Box, Button, TextField } from '@mui/material'
import React, { useState } from 'react'


type NewAccountProps = {
    handleClose: () => void
    notify: (message: string) => void
}


type NewUserProps = {
    username: string
    // first_name: string
    // last_name: string
    password: string
}

const initialNewUser = {
    username: "",
    // first_name: "",
    // last_name: "",
    password: ""
}



export default function NewAccount({ handleClose, notify }: NewAccountProps) {
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
            notify("Passwords do not match");
            setNewUser(initialNewUser)
            setConfirmPassword("")
            return;
        }
        try {
            let response = await fetch("http://127.0.0.1:8000/users/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newUser)
            })
            if (response.ok) {
                // const data = await response.json()
                setNewUser(initialNewUser)
                setConfirmPassword("")
                notify("Account created!")

            } else {
                const errorResponse = await response.json();
                if (errorResponse.username) {
                    notify(errorResponse.username[0]);
                } else {
                    notify(`Fehler beim Erstellen des Users: ${response.statusText}`);
                }
            }

        }
        catch (error) {
            console.log("An error occured: ", error)
        }
        handleClose()
    }



    return (
        <form onSubmit={(e) => handleSubmit(e)}>
            <Box display="flex" flexDirection="column" gap={2}>
                <TextField onChange={(e) => handleChange(e)} name="username" value={newUser.username || ""} id="outlined-basic" label="Username" type="text" variant="outlined" />
                {/* <TextField onChange={(e) => handleChange(e)} name="first_name" value={newUser.first_name || ""} id="outlined-basic" label="First Name" type="text" variant="outlined" />
                <TextField onChange={(e) => handleChange(e)} name="last_name" value={newUser.last_name || ""} id="outlined-basic" label="Last Name" type="text" variant="outlined" /> */}
                <TextField onChange={(e) => handleChange(e)} name="password" value={newUser.password || ""} id="outlined-basic" label="Password" type="password" variant="outlined" />
                <TextField onChange={(e) => handleChange(e)} name="confirmPassword" value={confirmPassword || ""} id="outlined-basic" label="Confirm Password" type="password" variant="outlined" />
                <Button type="submit" variant="contained">Create</Button>
            </Box>
        </form>
    )
}
