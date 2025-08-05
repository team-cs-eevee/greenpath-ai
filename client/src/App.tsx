import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './Navbar.jsx';
import Signup from './Signup.jsx';
import Login from './Login.jsx';
import Home from './Home.jsx';


function App() {
  // const [start, setStart] = useState('');
  // const [end, setEnd] = useState('');
  // const [travelMode, setTravelMode] = useState('walking');
  // const [vehicleMpg, setVehicleMpg] = useState(null);

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home  />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
