import { useEffect, useState } from 'react';
import { APIProvider, Map, useMap, useMapsLibrary } from '@vis.gl/react-google-maps';

interface DirectionsProps {
  origin: string;
  destination: string;
  travelMode: string;
  vehicleMpg: number | null;
}

const Directions = ({ origin, destination, travelMode, vehicleMpg }: DirectionsProps) => {
  const map = useMap();
  const routesLibrary = useMapsLibrary("routes");
  const [directionsService, setDirectionsService] = useState<google.maps.DirectionsService | null>(null);
  const [directionsRenderer, setDirectionsRenderer] = useState<google.maps.DirectionsRenderer | null>(null);
  const [routeInfo, setRouteInfo] = useState<{distance: string; duration: string; distanceMiles: number} | null>(null);

  // Map string travel modes to Google Maps constants
  const getTravelMode = (mode: string): google.maps.TravelMode => {
    switch (mode) {
      case 'driving':
        return window.google.maps.TravelMode.DRIVING;
      case 'walking':
        return window.google.maps.TravelMode.WALKING;
      case 'biking':
        return window.google.maps.TravelMode.BICYCLING;
      case 'public-transportation':
        return window.google.maps.TravelMode.TRANSIT;
      default:
        return window.google.maps.TravelMode.WALKING;
    }
  };

  // Calculate CO2 emissions and savings
  const calculateEmissionsSavings = (distanceMiles: number, vehicleMpg: number | null) => {
    const NATIONAL_AVERAGE_MPG = 24.8;
    const CO2_PER_GALLON = 8887; // grams of CO2 per gallon of gasoline
    
    if (!distanceMiles || distanceMiles <= 0) return null;
    
    // Calculate emissions for national average vehicle
    const nationalGallons = distanceMiles / NATIONAL_AVERAGE_MPG;
    const nationalEmissions = nationalGallons * CO2_PER_GALLON;
    
    if (!vehicleMpg || vehicleMpg <= 0) {
      return {
        nationalEmissions: Math.round(nationalEmissions / 1000 * 100) / 100, // Convert to kg, round to 2 decimals
        vehicleEmissions: null,
        savings: null
      };
    }
    
    // Calculate emissions for user's vehicle
    const vehicleGallons = distanceMiles / vehicleMpg;
    const vehicleEmissions = vehicleGallons * CO2_PER_GALLON;
    const savings = nationalEmissions - vehicleEmissions;
    
    return {
      nationalEmissions: Math.round(nationalEmissions / 1000 * 100) / 100, // kg
      vehicleEmissions: Math.round(vehicleEmissions / 1000 * 100) / 100, // kg
      savings: Math.round(savings / 1000 * 100) / 100 // kg
    };
  };

  useEffect(() => {
    if (!routesLibrary || !map) return;
    setDirectionsService(new routesLibrary.DirectionsService());
    setDirectionsRenderer(
      new routesLibrary.DirectionsRenderer({
        map
      })
    );
  }, [routesLibrary, map]);

  useEffect(() => {
    console.log('🗺️ Directions useEffect triggered:', {
      directionsService: !!directionsService,
      directionsRenderer: !!directionsRenderer,
      origin,
      destination,
      travelMode
    });

    if (!directionsService || !directionsRenderer) {
      console.log('❌ Missing services:', {
        directionsService: !!directionsService,
        directionsRenderer: !!directionsRenderer
      });
      return;
    }

    if (!origin || !destination) {
      console.log('❌ Missing origin/destination:', { origin, destination });
      // Clear existing directions when missing origin/destination
      directionsRenderer.setDirections(null as google.maps.DirectionsResult | null);
      setRouteInfo(null);
      return;
    }

    console.log('🚀 Making directions request:', {
      origin,
      destination,
      travelMode
    });

    directionsService
      .route({
        origin,
        destination,
        travelMode: getTravelMode(travelMode)
      })
      .then((response: google.maps.DirectionsResult) => {
        console.log('✅ Directions response received:', response);
        console.log('📍 Routes array length:', response.routes?.length || 0);
        if (response.routes && response.routes.length > 0) {
          console.log('🛣️ Routes found:', response.routes.length);
          directionsRenderer?.setDirections(response);
          console.log('✅ Directions set on renderer');
          
          // Extract route distance and duration
          const route = response.routes[0];
          const leg = route.legs[0];
          if (leg.distance && leg.duration) {
            // Convert meters to miles (1 meter = 0.000621371 miles)
            const distanceMiles = leg.distance.value * 0.000621371;
            
            setRouteInfo({
              distance: leg.distance.text,
              duration: leg.duration.text,
              distanceMiles: distanceMiles
            });
            console.log('📏 Route info:', {
              distance: leg.distance.text,
              duration: leg.duration.text,
              distanceMiles: Math.round(distanceMiles * 100) / 100
            });
          }
        } else {
          console.log('❌ No routes found in response');
          setRouteInfo(null);
        }
      })
      .catch((error) => {
        console.error('❌ Directions request failed:', error);
      });

  }, [directionsService, directionsRenderer, origin, destination, travelMode]);

  // Separate cleanup effect that only runs on unmount
  useEffect(() => {
    return () => {
      console.log('🧹 Component unmounting - cleaning up directions renderer');
      directionsRenderer?.setMap(null);
    };
  }, [directionsRenderer]);

  return (
    <div style={{ 
      position: 'absolute', 
      top: '10px', 
      right: '10px', 
      background: 'white', 
      padding: '10px', 
      borderRadius: '5px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      zIndex: 1000
    }}>
      {routeInfo ? (() => {
        const emissions = calculateEmissionsSavings(routeInfo.distanceMiles, vehicleMpg);
        return (
          <div>
            <div><strong>Distance:</strong> {routeInfo.distance}</div>
            <div><strong>Duration:</strong> {routeInfo.duration}</div>
            {vehicleMpg && (
              <div><strong>Vehicle MPG:</strong> {vehicleMpg} combined</div>
            )}
            {emissions && (
              <div style={{ marginTop: '8px', paddingTop: '8px', borderTop: '1px solid #eee' }}>
                {travelMode === 'driving' ? (
                  // Driving mode: Show comparison with user's vehicle
                  emissions.vehicleEmissions !== null ? (
                    <>
                      <div><strong>Your CO₂:</strong> {emissions.vehicleEmissions} kg</div>
                      <div><strong>Average Car:</strong> {emissions.nationalEmissions} kg</div>
                      <div style={{ color: emissions.savings! > 0 ? 'green' : 'red' }}>
                        <strong>
                          {emissions.savings! > 0 ? '🌱 Savings: ' : '💨 Extra: '}
                          {Math.abs(emissions.savings!)} kg CO₂
                        </strong>
                      </div>
                    </>
                  ) : (
                    <div><strong>Average Car CO₂:</strong> {emissions.nationalEmissions} kg</div>
                  )
                ) : (
                  // Non-driving modes: Show what car emissions would be
                  <>
                    <div><strong>Your CO₂:</strong> 0 kg ({travelMode})</div>
                    <div><strong>If driving avg car:</strong> {emissions.nationalEmissions} kg</div>
                    <div style={{ color: 'green' }}>
                      <strong>🌱 Savings: {emissions.nationalEmissions} kg CO₂</strong>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        );
      })() : (
        <div>
          Enter start and end addresses
          {vehicleMpg && (
            <div><strong>Vehicle MPG:</strong> {vehicleMpg} combined</div>
          )}
        </div>
      )}
    </div>
  );
};

interface MapComponentProps {
  origin: string;
  destination: string;
  travelMode: string;
  vehicleMpg: number | null;
}

const MapComponent = ({ origin, destination, travelMode, vehicleMpg }: MapComponentProps) => {
  console.log('🗺️ MapComponent render with props:', { origin, destination, travelMode, vehicleMpg });
  
  return (
    <div id = 'google-maps'>
    <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      <Map
        style={{ width: '30rem', height: '24rem'}}
        defaultCenter={{ lat: 40.7128, lng: -74.0060 }}
        defaultZoom={12}
      >
        {/* Child components, like markers, can go here */}
        <Directions origin={origin} destination={destination} travelMode={travelMode} vehicleMpg={vehicleMpg} />
      </Map>
    </APIProvider>
    </div>
  );
};

export default MapComponent;