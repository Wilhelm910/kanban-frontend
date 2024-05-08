import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Box, Modal } from '@mui/material';
import NewTask from './NewTask';
import { useState } from 'react';
import { TaskItem, TaskProps } from '../utils/types';
import DeleteIcon from '@mui/icons-material/Delete';


export default function Task({ item, tasks, setTasks }: TaskProps) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const updatedTasks: TaskItem[] = []

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/updateTask/${item.id}/`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Token ${localStorage.getItem("token")}`
        }
      })
      if (response.ok) {
        console.log("Task successfull deleted")
        tasks.map((task) => {
          if (item.id != task.id) {
            updatedTasks.push(task)
            setTasks(updatedTasks)
          }
        })
      }
    } catch (error) {
      console.log("An error ocured: ", error)
    }
  }

  // const updateTasks = async () => {
  //   const token = localStorage.getItem("token")
  //   if (token) {
  //     console.log("test")
  //     const fetchedTasks = await fetchTasks(token)
  //     setTasks(fetchedTasks)
  //   }
  // }


  const { title, description, user_info, created_at } = item

  return (
    <Card sx={{ width: '100%', maxWidth: '100%', marginBottom: "4px" }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {created_at}
        </Typography>
        <Typography variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2">
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {description}
        </Typography>
        <Typography bgcolor="lightgrey" p={1} borderRadius={2} sx={{ fontSize: 12, display: "inline-block" }} color="text.primary" gutterBottom>
          {user_info.username.toUpperCase()}
        </Typography>
      </CardContent>
      <CardActions sx={{ display: "flex", justifyContent: "space-evenly" }}>
        <Button onClick={handleOpen} variant="contained">Update Task</Button>
        <Button onClick={handleDelete}><DeleteIcon color='primary' fontSize='large' /></Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <NewTask handleClose={handleClose} item={item} tasks={tasks} setTasks={setTasks} />
          </Box>
        </Modal>
      </CardActions>
    </Card>
  )
}
