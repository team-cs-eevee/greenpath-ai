import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './Navbar.jsx';
import Signup from './Signup.jsx';
import Login from './Login.jsx';
import Home from './Home.jsx';
import MapComponent from './MapComponent.js';

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      <MapComponent />
    </div>
  );
}

export default App;
