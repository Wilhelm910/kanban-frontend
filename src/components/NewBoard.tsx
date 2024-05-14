import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";

type NewBoardProps = {
  name: string
}

const initialNewBoard = {
  name: ""
}

type Props = {
  handleClose: () => void
  loadAllBoards: () => void
}


export default function NewBoard({ handleClose, loadAllBoards }: Props) {
  const [newBoard, setNewBoard] = useState<NewBoardProps>(initialNewBoard)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNewBoard((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }))

  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const response = await fetch("http://127.0.0.1:8000/boards/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Token ${localStorage.getItem("token")}`
        },
        body: JSON.stringify(newBoard)
      })
      if (response.ok) {
        // const data = await response.json()
        setNewBoard(initialNewBoard)
        loadAllBoards()
      } else {
        console.error("Fehler beim Erstellen des Tasks:", response.statusText);
      }
    } catch (error) {
      console.log("An error occured: ", error)
    }
    handleClose()
  }



  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <Box display="flex" gap={2}>
        <TextField onChange={(e) => handleChange(e)} name="name" value={newBoard.name || ""} id="outlined-basic" label="Name" type="text" variant="outlined" />
        <Button type="submit" variant="contained">Create</Button>
      </Box>
    </form>
  )
}
