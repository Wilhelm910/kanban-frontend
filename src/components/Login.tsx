import { Box, Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

type LoginData = {
  username: string
  password: string
}

const initialLoginData: LoginData = {
  username: "",
  password: ""
}


type ToastProps = {
  notify: (message: string) => void
}


export default function Login({ notify }: ToastProps) {
  const [loginData, setLoginData] = useState<LoginData>(initialLoginData)
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setLoginData(prev => ({
      ...prev!,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log("Submitted data:", loginData);
    try {
      const response = await fetch(`http://127.0.0.1:8000/login/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(loginData)
      })
      let json = await response.json()
      if (response.ok) {
        navigate("/board")
        localStorage.setItem("token", json.token)
      } else {
        notify("Login failed")
      }
    } catch (error) {
      console.error("An error occured", error)
    }
  }

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/board")
    }
  }, [])


  return (
    <Box sx={{ width: "100%", flex: "1", paddingTop: 10, display: "flex", flexDirection: "column", alignItems: "center" }}>
      <form onSubmit={(e) => handleSubmit(e)}>
        <Box display="flex" gap={2}>
          <TextField onChange={(e) => handleChange(e)} name="username" value={loginData?.username || ""} id="outlined-basic" label="Username" type="text" variant="outlined" />
          <TextField onChange={(e) => handleChange(e)} name="password" value={loginData?.password || ""} id="outlined-basic" label="Password" type="password" variant="outlined" />
          <Button type="submit" variant="contained">Login</Button>
        </Box>
      </form>
    </Box >
  )
}
