import { Routes, Route } from 'react-router-dom';
import Navbar from './Navbar.tsx';
import Signup from './Signup.jsx';
import Login from './Login.jsx';
import Home from './Home.jsx';
import { useState } from 'react';

function App() {
  // const [start, setStart] = useState('');
  // const [end, setEnd] = useState('');
  // const [travelMode, setTravelMode] = useState('walking');
  // const [vehicleMpg, setVehicleMpg] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  const handleLogout = () => {
    setCurrentUser(null);
  };

  return (
    <div>
      <Navbar
        currentUser={currentUser}
        onLogout={handleLogout}
      />
      <Routes>
        <Route
          path='/'
          element={
            <Home
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
            />
          }
        />
        <Route
          path='/login'
          element={
            <Login
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
            />
          }
        />
        <Route
          path='/signup'
          element={
            <Signup
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
