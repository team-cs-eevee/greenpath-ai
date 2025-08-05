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
      directionsRenderer.setDirections(null as any);
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
        } else {
          console.log('❌ No routes found in response');
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

  return null; // UI for directions is optional, it's rendered on the map
};

interface MapComponentProps {
  origin: string;
  destination: string;
}

const MapComponent = ({ origin, destination }: MapComponentProps) => {
  console.log('🗺️ MapComponent render with props:', { origin, destination });
  
  return (
    <div id = 'google-maps'>
    <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      <Map
        style={{ width: '30rem', height: '24rem'}}
        defaultCenter={{ lat: 40.7128, lng: -74.0060 }}
        defaultZoom={12}
      >
        {/* Child components, like markers, can go here */}
        <Directions origin={origin} destination={destination} />
      </Map>
    </APIProvider>
    </div>
  );
};

export default MapComponent;