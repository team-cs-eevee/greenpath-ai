import { useEffect, useState } from 'react';
import { APIProvider, Map, useMap, useMapsLibrary } from '@vis.gl/react-google-maps';

const Directions = () => {
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
    if (!directionsService || !directionsRenderer) return;
    directionsService
      .route({
        origin: "175 Willoughby St, Brooklyn NY",
        destination: "500 College St, Toronto ON",
        travelMode: window.google.maps.TravelMode.WALKING
      })
      .then((response: google.maps.DirectionsResult) => {
        directionsRenderer?.setDirections(response);
      });

    // Cleanup to remove directions from the map if component unmounts
    return () => directionsRenderer?.setMap(null);
  }, [directionsService, directionsRenderer]);

  return null; // UI for directions is optional, it's rendered on the map
};

const MapComponent = () => {
  return (
    <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      <Map
        style={{ width: '100%', height: '500px' }}
        defaultCenter={{ lat: 40.7128, lng: -74.0060 }}
        defaultZoom={12}
      >
        {/* Child components, like markers, can go here */}
        <Directions />
      </Map>
    </APIProvider>
  );
};

export default MapComponent;