import { Routes, Route } from 'react-router-dom';
import Navbar from './Navbar.tsx';
import Signup from './Signup.jsx';
import Login from './Login.jsx';
import Home from './Home.jsx';
import { useState } from 'react';
import Trips from './Trips.tsx'

function App() {
  // const [start, setStart] = useState('');
  // const [end, setEnd] = useState('');
  // const [travelMode, setTravelMode] = useState('walking');
  // const [vehicleMpg, setVehicleMpg] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  const handleLogout = () => {
    setCurrentUser(null);
    setUserId(null);
  };

  const [userId, setUserId] = useState(null);
    const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
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
               setUserId = {setUserId}
              userId = {userId}
              start = {start}
              setStart = {setStart}
              end = {end}
              setEnd = {setEnd}
            />
          }
        />
             <Route path = '/trips' element ={<Trips 
             setUserId = {setUserId}
              userId = {userId}
              start = {start}
              setStart = {setStart}
              end = {end}
              setEnd = {setEnd}
              />} />
        <Route
          path='/login'
          element={
            <Login
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
              setUserId = {setUserId}
              userId = {userId}
            />
          }
        />
        <Route
          path='/signup'
          element={
            <Signup
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
              setUserId = {setUserId}
              userId = {userId}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
