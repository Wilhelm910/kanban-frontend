
import './App.css'
import Board from './components/Board';
import Footer from './components/Footer';
import Header from './components/Header';
import Login from './components/Login'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Navigate } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className='main-container'>
        <Header />
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/board/:id" element={<Board />} />
          <Route path="/board/" element={<Board />} />
        </Routes>
        <div className='footer-container'>
          <Footer />
        </div>
      </div>
    </Router>
  )
}

export default App
