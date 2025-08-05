import { useState } from "react"

const Home = ({ start, setStart, end, setEnd }) => {
    const [make, setMake] = useState('')
    const [model, setModel] = useState('')
    const [check, setCheck] = useState(false)

    const handlerSubmit = async(e) => {
        e.preventDefault();
        console.log('🏠 Form submitted with values:', { start, end, make, model });
        
        if (make === '' && model === '' && check === false) {
            alert('Please fill both inputs OR check the box');
            return;
        }
        try {
            const response = await fetch('/api/userinfo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({start, end, make, model})
            })
            const data = await response.json()
            console.log(data)
            setMake('')
            setModel('')
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div id = 'home'>
            <form id = 'home-form' onSubmit = {handlerSubmit} >
                <input type = 'text' id = 'home-start' required placeholder = 'Start address...' value={start} onChange = {(e) => {
                    console.log('🏠 Start address changed:', e.target.value);
                    setStart(e.target.value);
                }}/>
                <input type = 'text' id = 'home-end' required placeholder = 'End address...' value={end} onChange = {(e) => {
                    console.log('🏠 End address changed:', e.target.value);
                    setEnd(e.target.value);
                }}/>
                <input type = 'text' id = 'home-make' placeholder = 'Make...' onChange = {(e) => setMake(e.target.value)}/>
                <input type = 'text' id = 'home-model' placeholder = 'Model...' onChange = {(e) => setModel(e.target.value)}/>
                <div id = 'home-checkbox'>
                <input type = 'checkbox' id = 'home-checkbox' onChange = {(e) => setCheck(!check)} />
                <p>I do not have a vehicle</p>
                </div>
                <button type = 'submit' id = 'home-submit'>Submit</button>
            </form>
        </div>
    )
}

export default Home