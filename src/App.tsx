
import './App.css'
import Board from './components/Board';
import Footer from './components/Footer';
import Header from './components/Header';
import Login from './components/Login'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Navigate } from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const theme = createTheme({
  palette: {
    primary: {
      main: "#8d4aa5"
    }
  }
})

function App() {
  const notify = (message: string) => toast(message);
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div className='main-container'>
          <Header notify={notify} />
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login notify={notify} />} />
            <Route path="/board/:id" element={<Board notify={notify} />} />
            <Route path="/board/" element={<Board notify={notify} />} />
          </Routes>
          <div className='footer-container'>
            <Footer />
          </div>
          <ToastContainer />
        </div>
      </Router>
    </ThemeProvider>
  )
}

export default App
