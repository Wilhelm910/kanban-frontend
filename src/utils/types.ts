export type TaskItem = {
    title: string
    description: string
    user: string
    created_at: string
    checked: boolean
    status: "todo" | "doing" | "review" | "done" | null
  }
  
export type TaskProps = {
    item: TaskItem
  }