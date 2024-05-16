export type TaskItem = {
    title: string
    description: string
    user: string
    created_at: string
    checked: boolean
    status: "todo" | "doing" | "review" | "done" | null
    id: string
    user_info: user_info
    board: string
  }
  
export type TaskProps = {
    item: TaskItem
    tasks: TaskItem[]
    setTasks: (tasks: TaskItem[]) => void
  }

  type user_info = {
    id: string
    username: string
  }

export type BoardsProps = {
  id: string,
  name: string
}

export type OpenProps = {
  handleClose: () => void
  item?: TaskItem
  tasks?: TaskItem[]
  setTasks?: (tasks: TaskItem[]) => void
  notify?: (message:string) => void
}
