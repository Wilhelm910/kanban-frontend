export type TaskItem = {
    title: string
    description: string
    user_info: Object
    created_at: string
    checked: boolean
    status: "todo" | "doing" | "review" | "done" | null
    id: string
  }
  
export type TaskProps = {
    item: TaskItem
  }