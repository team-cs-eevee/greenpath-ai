import { useState } from "react"

const Login = () => {
    const [username, setUsername] = useState('')
     const [password, setPassword] = useState('')

    return (
        <div id = 'login'>
            <h1 id = 'login-title'>Login</h1>
            <form id = 'login-form'>
                <input id = 'login-username' type = 'text' placeholder = 'Username...' />
                  <input id = 'login-password' type = 'password' placeholder = 'Password...' />
                  <button type = 'submit' id = 'login-submit'>Submit</button>
            </form>
        </div>
    )
}

export default Login