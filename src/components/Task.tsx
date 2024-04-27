import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Box, Modal } from '@mui/material';
import NewTask from './NewTask';
import { useState } from 'react';
import { TaskProps } from '../utils/types';



export default function Task({ item }: TaskProps) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
      <CardActions>
        <Button onClick={handleOpen} variant="contained">Update Task</Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <NewTask handleClose={handleClose} item={item} />
          </Box>
        </Modal>
      </CardActions>
    </Card>
  )
}
