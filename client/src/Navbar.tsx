import { Link } from "react-router-dom"
const Navbar = () => {
    return (
        <div id = 'navbar'>
            <div id = 'navbar-logo-title'>
            <img src = '/vite.svg' />
            <h1>GreenPath</h1>
            </div>
            <div id = 'navbar-links'>
            <Link to = '/'>Home</Link>
            <Link to = '/login'>Login</Link>
            <Link to = '/signup'>Sign Up</Link>
            </div>
        </div>
    )
}

export default Navbar