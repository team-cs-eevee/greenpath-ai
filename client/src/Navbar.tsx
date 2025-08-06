import { Link } from 'react-router-dom';
const Navbar = ({ currentUser, setCurrentUser }) => {
  return (
    <div id='navbar'>
      <div id='navbar-logo-title'>
        <img src='/logo.png' />
        <h1>GreenPath</h1>
      </div>
        <h2>Welcome {currentUser.username}</h2>
      <div id='navbar-links'>
        <Link to='/'>Home</Link>
        <Link to='/login'>Login</Link>
        <Link to='/signup'>Sign Up</Link>
      </div>
    </div>
  );
};

export default Navbar;
