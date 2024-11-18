import Login from './pages/Login';
import Signup from './pages/Signup';
import HeroSection from './components/HeroSection';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import { Routes, Route, useLocation } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path='/' element={<Login />}/>
        <Route path='/signup' element={<Signup />}/>
        <Route path='/Home' element={<Home/>} />
      </Routes>
    </div>
  );
}

export default App;
