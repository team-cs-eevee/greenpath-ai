import { Link } from "react-router-dom"
import { useState } from "react"

const Navbar = ({ currentUser, onLogout }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleLogout = () => {
        if (onLogout) {
            onLogout();
        }
        setIsOpen(false); // Close mobile menu when logging out
    };

    return (
        <div id = 'navbar'>
            <div id = 'navbar-logo-title'>
            <img src = '/logo.png' alt="GreenPath Logo" />
            <h1>GreenPath</h1>
            </div>
            
            {currentUser && <h2>Welcome {currentUser.username}</h2>}
            
            {/* Hamburger Menu */}
            <div id="hamburger" onClick={() => setIsOpen(!isOpen)}>
                <span></span>
                <span></span>
                <span></span>
            </div>
            
            <div id = 'navbar-links' className={isOpen ? 'mobile-open' : ''}>
            <Link to = '/' onClick={() => setIsOpen(false)}>Home</Link>
                <Link to = '/trips'>Trips</Link>
        {!currentUser && <Link to = '/login' onClick={() => setIsOpen(false)}>Login</Link>}
            {!currentUser && <Link to = '/signup' onClick={() => setIsOpen(false)}>Sign Up</Link>}
            {currentUser && <button onClick={handleLogout}>Log Out</button>}
            </div>
        </div>
    )
}

export default Navbar;
