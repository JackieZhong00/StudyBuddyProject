import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login from './components/Login'
import Explore from './components/Explore'
import Profile from './components/Profile'
import Calendar from './components/Calendar'
import { Toaster } from 'react-hot-toast'


function App() {


  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/explore/:id" element={<Explore />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/calendar/:id" element={<Calendar />} />
        </Routes>
      </Router>
      <Toaster position='top-center'/>
    </>
  )
}

export default App
