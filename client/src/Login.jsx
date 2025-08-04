import { useState } from "react"

const Login = () => {
    const [username, setUsername] = useState('')
     const [password, setPassword] = useState('')

        const handlerSubmit = async() => {
        e.preventDefault();
        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({username, password})
            })
            const data = response.json()
            console.log(data)
            setUsername('')
            setPassword('')
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div id = 'login'>
            <h1 id = 'login-title'>Login</h1>
            <form id = 'login-form' onSubmit = {handlerSubmit}>
                <input id = 'login-username' type = 'text' placeholder = 'Username...' onChange = {(e) => setUsername(e.target.value)}/>
                  <input id = 'login-password' type = 'password' placeholder = 'Password...' onChange = {(e) => setPassword(e.target.value)}/>
                  <button type = 'submit' id = 'login-submit'>Submit</button>
            </form>
        </div>
    )
}

export default Login