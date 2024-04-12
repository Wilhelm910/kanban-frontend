import { Button, TextField } from "@mui/material";
import { useState } from "react";

type LoginData = {
  email: string
  password: string
}


export default function Login() {
  const [loginData, setLoginData] = useState<LoginData | null>(null)



  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setLoginData(prev => ({
        ...prev!,
        [e.target.name]: e.target.value
      }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log("Submitted data:", loginData);
  }

  return (
    <>
      <form onSubmit={(e) => handleSubmit(e)}>
        <TextField onChange={(e) => handleChange(e)} name="email" value={loginData?.email || ""} id="outlined-basic" label="Email" variant="outlined" />
        <TextField onChange={(e) => handleChange(e)} name="password" value={loginData?.password || ""} id="outlined-basic" label="Password" variant="outlined" />
        <Button type="submit" variant="contained">Login</Button>
      </form>
    </>
  )
}
