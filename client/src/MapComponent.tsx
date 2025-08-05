import { useEffect, useState } from 'react';
import { APIProvider, Map, useMap, useMapsLibrary } from '@vis.gl/react-google-maps';

interface DirectionsProps {
  origin: string;
  destination: string;
}

const Directions = ({ origin, destination }: DirectionsProps) => {
  const map = useMap();
  const routesLibrary = useMapsLibrary("routes");
  const [directionsService, setDirectionsService] = useState<google.maps.DirectionsService | null>(null);
  const [directionsRenderer, setDirectionsRenderer] = useState<google.maps.DirectionsRenderer | null>(null);
  const [routeInfo, setRouteInfo] = useState<{distance: string; duration: string} | null>(null);

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
      destination
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
      travelMode: 'WALKING'
    });

    directionsService
      .route({
        origin,
        destination,
        travelMode: window.google.maps.TravelMode.WALKING
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
            setRouteInfo({
              distance: leg.distance.text,
              duration: leg.duration.text
            });
            console.log('📏 Route info:', {
              distance: leg.distance.text,
              duration: leg.duration.text
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

  }, [directionsService, directionsRenderer, origin, destination]);

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
      {routeInfo ? (
        <div>
          <div><strong>Distance:</strong> {routeInfo.distance}</div>
          <div><strong>Duration:</strong> {routeInfo.duration}</div>
        </div>
      ) : (
        <div>Enter start and end addresses</div>
      )}
    </div>
  );
};

interface MapComponentProps {
  origin: string;
  destination: string;
}

const MapComponent = ({ origin, destination }: MapComponentProps) => {
  console.log('🗺️ MapComponent render with props:', { origin, destination });
  
  return (
    <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      <Map
        style={{ width: '100%', height: '500px' }}
        defaultCenter={{ lat: 40.7128, lng: -74.0060 }}
        defaultZoom={12}
      >
        {/* Child components, like markers, can go here */}
        <Directions origin={origin} destination={destination} />
      </Map>
    </APIProvider>
  );
};

export default MapComponent;