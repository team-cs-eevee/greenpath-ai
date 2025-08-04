import { useState } from "react"

const Home = () => {
    const [start, setStart] = useState('')
    const [end, setEnd] = useState('')
    const [make, setMake] = useState('')
    const [model, setModel] = useState('')
    
    return (
        <div id = 'home'>
            <form id = 'home-form'>
                <input type = 'text' id = 'home-start' placeholder = 'Start address...' />
                <input type = 'text' id = 'home-end' placeholder = 'End address...' />
                <input type = 'text' id = 'home-make' placeholder = 'Make...' />
                <input type = 'text' id = 'home-model' placeholder = 'Model...' />
            </form>
        </div>
    )
}

export default Home