import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login from './components/Login'
import Explore from './components/Explore'
import Profile from './components/Profile'


function App() {


  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/profile/:id" element={<Profile />} />
      </Routes>
    </Router>
  )
}

export default App
