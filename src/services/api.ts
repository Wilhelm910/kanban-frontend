export const fetchTasks = async (token: string) => {
    try {
        const response = await fetch(`http://127.0.0.1:8000/tasks/`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${token}`
            }
        })
        let json = await response.json()
        if (response.ok) {
            console.log("Data loading was successfull")
        } else if (response.status == 401) {
        } else {
            console.error("Data loading failed")
        }
        return json
    } catch (error) {
        console.error("An error occured", error)
    }
}