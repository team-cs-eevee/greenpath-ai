import { useEffect, useState } from "react"

const Trips = ({setUserId, userId, start, setStart, end, setEnd}) => {
const [userTrips, setUserTrips] = useState([])

useEffect(() => {
    getTrips()
}, [])

const getTrips = async() => {
    try {
        const response = await fetch('/api/gettrips', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({userId})
        })
        if (!response.ok) {
            throw new Error('response failed')
        }
        const data = await response.json()
        console.log(data)
        setUserTrips(data)
    } catch(error) {
console.log(error)
    }
}
    return (
        <div id = 'trips'>
    <h1 id = 'trips-title'>Previous Routes</h1>
    {userTrips.map((value, index) => (
        <div id = 'trips-routes' key = {index}>
        <p> Start: {value.start}</p>
        <p id = 'trips-end'>End: {value.end}</p>
        <br></br>
        </div>
    ))}
    </div>
    )
}

export default Trips