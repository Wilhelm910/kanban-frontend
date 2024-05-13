import { Box, Typography } from "@mui/material";


export default function Footer() {
  return (
    <Box p={1} m={2} borderRadius={2} display="flex" justifyContent="space-around" alignItems="center" bgcolor="#f5f2f5">
      <Typography fontSize={12}>&copy; Copyright 2024 Wilhelm Teicke</Typography>
    </Box >
  )
}
