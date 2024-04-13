import { useEffect, useState } from "react"

export default function Board() {

    const [tasks, setTasks] = useState([])



    useEffect(() => {
        const loadTasks = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/board/`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                let json = await response.json()
                setTasks(json)
                if (response.ok) {
                    console.log("Data loading was successfull")
                } else {
                    console.error("Data loading failed")
                }
            } catch (error) {
                console.error("An error occured", error)
            }
        }

        loadTasks()
    }, [])



    return (
        <div>{JSON.stringify(tasks)}</div>
    )
}
