import { useState, useEffect } from "react"

const Home = ({ start, setStart, end, setEnd, travelMode, setTravelMode, setVehicleMpg }) => {
    const [make, setMake] = useState('')
    const [model, setModel] = useState('')
    const [year, setYear] = useState('')
    const [check, setCheck] = useState(false)

    // Function to fetch vehicle MPG from fuel economy API
    const fetchVehicleMpg = async (year, make, model) => {
        if (!year || !make || !model) {
            setVehicleMpg(null);
            return;
        }

        try {
            console.log('🚗 Step 1: Fetching vehicle options for:', { year, make, model });
            
            // Step 1: Get vehicle options/IDs
            const optionsResponse = await fetch(
                `https://www.fueleconomy.gov/ws/rest/vehicle/menu/options?year=${year}&make=${make}&model=${model}`
            );
            
            if (!optionsResponse.ok) {
                throw new Error('Failed to fetch vehicle options');
            }

            const optionsXmlText = await optionsResponse.text();
            const parser = new DOMParser();
            const optionsXmlDoc = parser.parseFromString(optionsXmlText, 'text/xml');
            
            // Extract first vehicle ID from <value> element
            const firstValueElement = optionsXmlDoc.querySelector('menuItem value');
            if (!firstValueElement) {
                console.log('❌ No vehicle options found');
                setVehicleMpg(null);
                return;
            }

            const vehicleId = firstValueElement.textContent;
            console.log('🚗 Step 2: Using vehicle ID:', vehicleId);

            // Step 2: Get actual vehicle data using the ID
            const vehicleResponse = await fetch(
                `https://www.fueleconomy.gov/ws/rest/vehicle/${vehicleId}`
            );
            
            if (!vehicleResponse.ok) {
                throw new Error('Failed to fetch vehicle details');
            }

            const vehicleXmlText = await vehicleResponse.text();
            const vehicleXmlDoc = parser.parseFromString(vehicleXmlText, 'text/xml');
            
            // Extract combined MPG from <comb08> element
            const combMpgElement = vehicleXmlDoc.querySelector('comb08');
            if (combMpgElement) {
                const mpg = parseInt(combMpgElement.textContent);
                console.log('⛽ Found combined MPG:', mpg);
                setVehicleMpg(mpg);
            } else {
                console.log('❌ No MPG data found in vehicle details');
                setVehicleMpg(null);
            }
        } catch (error) {
            console.error('❌ Error fetching vehicle MPG:', error);
            setVehicleMpg(null);
        }
    };

    // Fetch MPG when vehicle details change
    useEffect(() => {
        if (check) {
            // Clear MPG if "no vehicle" is checked
            setVehicleMpg(null);
        } else if (year && make && model) {
            // Fetch MPG when all vehicle fields are filled
            fetchVehicleMpg(year, make, model);
        } else {
            // Clear MPG if any field is missing
            setVehicleMpg(null);
        }
    }, [year, make, model, check, setVehicleMpg]);

    const handlerSubmit = async(e) => {
        e.preventDefault();
        console.log('🏠 Form submitted with values:', { start, end, make, model, year });
        
        if (make === '' && model === '' && year === '' && check === false) {
            alert('Please fill vehicle information OR check the box');
            return;
        }
        try {
            const response = await fetch('/api/userinfo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({start, end, make, model, year})
            })
            const data = await response.json()
            console.log(data)
            setMake('')
            setModel('')
            setYear('')
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
                <input type = 'text' id = 'home-year' placeholder = 'Year...' onChange = {(e) => setYear(e.target.value)}/>
                    <div id = 'home-checkbox'>
                    <input type = 'checkbox' id = 'home-checkbox' onChange = {(e) => setCheck(!check)} />
                    <p>I do not have a vehicle</p>
                    </div>
                   <select id = 'home-dropdown' value={travelMode} onChange={(e) => setTravelMode(e.target.value)}>
                        <option value = 'walking'>walking</option>
                        <option value = 'biking'>biking</option>
                        <option value = 'driving'>driving</option>
                        <option value = 'public-transportation'>public transportation</option>
                    </select>
                    <button type = 'submit' id = 'home-submit'>Submit</button>
            </form>
        </div>
    )
}

export default Home