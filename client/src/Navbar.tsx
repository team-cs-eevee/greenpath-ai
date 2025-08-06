import { Link } from 'react-router-dom';
const Navbar = ({ currentUser, setCurrentUser }) => {
  const handleLogOut = () => {
    setCurrentUser(null);
  };
  return (
    <div id='navbar'>
      <div id='navbar-logo-title'>
        <img src='/logo.png' />
        <h1>GreenPath</h1>
      </div>
      {currentUser && <h2>Welcome {currentUser.username}</h2>}
      <div id='navbar-links'>
        <Link to='/'>Home</Link>
        {!currentUser && <Link to='/login'>Login</Link>}
        {!currentUser && <Link to='/signup'>Sign Up</Link>}
        {currentUser && <button onClick={handleLogOut}>Log Out</button>}
      </div>
    </div>
  );
};

export default Navbar;
