import Login from './pages/Login';
import Signup from './pages/Signup';
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
      </Routes>
    </div>
  );
}

export default App;
