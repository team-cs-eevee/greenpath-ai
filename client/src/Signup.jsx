import { useState } from "react"
const Signup = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

       const handlerSubmit = async(e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({username, password})
            })
            const data = await response.json()
            console.log(data)
            setUsername('')
            setPassword('')
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div id = 'signup'>
            <h1 id = 'signup-title'>Sign Up</h1>
            <form id = 'signup-form' onSubmit = {handlerSubmit}>
                <input id = 'signup-username' type = 'text' placeholder = 'Username...' onChange={(e) => setUsername(e.target.value)}/>
                <input id = 'signup-password' type = 'password' placeholder = 'Password...' onChange={(e) => setPassword(e.target.value)}/>
                <button type = 'submit' id = 'signup-submit'>Submit</button>
            </form>
        </div>
    )
}

export default Signup