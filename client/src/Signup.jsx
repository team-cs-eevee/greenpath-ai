import { useState } from "react"

const Signup = () => {
    const [username, setUsername] = useState('')
     const [password, setPassword] = useState('')

    return (
        <div id = 'signup'>
            <h1 id = 'signup-title'>Sign Up</h1>
            <form id = 'signup-form'>
                <input id = 'signup-username' type = 'text' placeholder = 'Username...' />
                  <input id = 'signup-password' type = 'password' placeholder = 'Password...' />
                  <button type = 'submit' id = 'signup-submit'>Submit</button>
            </form>
        </div>
    )
}

export default Signup