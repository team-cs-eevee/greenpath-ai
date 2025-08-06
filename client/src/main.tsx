import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import '/css/Navbar.css';
import '/css/App.css';
import '/css/Home.css';
import '/css/Signup.css';
import '/css/Login.css';
import '/css/Trips.css';
import '/css/MapComponent.css';
import App from './App.jsx';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <StrictMode>
      <App />
    </StrictMode>
  </BrowserRouter>
);
