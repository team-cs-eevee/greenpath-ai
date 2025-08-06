import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"

interface NavbarProps {
    currentUser: { id: number; username: string } | null;
    onLogout: () => void;
}

const Navbar = ({ currentUser, onLogout }: NavbarProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        if (onLogout) {
            onLogout();
        }
        setIsOpen(false); // Close mobile menu when logging out
        navigate('/'); // Redirect to home page
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
            {currentUser && <Link to = '/trips' onClick={() => setIsOpen(false)}>Trips</Link>}
            {!currentUser && <Link to = '/login' onClick={() => setIsOpen(false)}>Login</Link>}
            {!currentUser && <Link to = '/signup' onClick={() => setIsOpen(false)}>Sign Up</Link>}
            {currentUser && <button onClick={handleLogout}>Log Out</button>}
            </div>
        </div>
    )
}

export default Navbar;
