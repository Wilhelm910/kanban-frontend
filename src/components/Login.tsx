import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

type LoginData = {
  username: string
  password: string
}


export default function Login() {
  const [loginData, setLoginData] = useState<LoginData | null>(null)
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
      localStorage.setItem("token", json.token)
      console.log(json)
      if (response.ok) {
        console.log("Login successfull")
        navigate("/board")
      } else {
        console.error("Login failed")
      }
    } catch (error) {
      console.error("An error occured", error)
    }
  }

  return (
    <>
      <form onSubmit={(e) => handleSubmit(e)}>
        <TextField onChange={(e) => handleChange(e)} name="username" value={loginData?.username || ""} id="outlined-basic" label="Username" type="text" variant="outlined" />
        <TextField onChange={(e) => handleChange(e)} name="password" value={loginData?.password || ""} id="outlined-basic" label="Password" type="password" variant="outlined" />
        <Button type="submit" variant="contained">Login</Button>
      </form>
    </>
  )
}
