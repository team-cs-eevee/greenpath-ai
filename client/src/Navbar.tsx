import { Link } from "react-router-dom"
import { useState } from "react"

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div id = 'navbar'>
            <div id = 'navbar-logo-title'>
            <img src = '/logo.png' />
            <h1>GreenPath</h1>
            </div>
            
            {/* Hamburger Menu */}
            <div id="hamburger" onClick={() => setIsOpen(!isOpen)}>
                <span></span>
                <span></span>
                <span></span>
            </div>
            
            <div id = 'navbar-links' className={isOpen ? 'mobile-open' : ''}>
            <Link to = '/' onClick={() => setIsOpen(false)}>Home</Link>
            <Link to = '/login' onClick={() => setIsOpen(false)}>Login</Link>
            <Link to = '/signup' onClick={() => setIsOpen(false)}>Sign Up</Link>
            </div>
        </div>
    )
}

export default Navbar