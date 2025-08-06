import { useEffect, useState } from "react"

const Trips = ({setUserId, userId, start, setStart, end, setEnd}) => {
const [userTrips, setUserTrips] = useState([])

useEffect(() => {
    getTrips()
}, [])

const getTrips = async() => {
    try {
        const response = await fetch('/api/trips')
        if (!response.ok) {
            throw new Error('response failed')
        }
        const data = await response.json()
        console.log(data)
    } catch(error) {
console.log(error)
    }
}
    return (
    <h1 id = 'trips-title'>Previous Routes</h1>
    )
}

export default Trips