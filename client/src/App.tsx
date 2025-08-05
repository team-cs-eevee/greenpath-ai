import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './Navbar.jsx';
import Signup from './Signup.jsx';
import Login from './Login.jsx';
import Home from './Home.jsx';
import MapComponent from './MapComponent.tsx';

function App() {
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  
  console.log('📱 App render with state:', { start, end });

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home start={start} setStart={setStart} end={end} setEnd={setEnd} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      <MapComponent origin={start} destination={end} />
    </div>
  );
}

export default App;
