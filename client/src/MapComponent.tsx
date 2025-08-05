import React from 'react';
import { APIProvider, Map } from '@vis.gl/react-google-maps';

const MapComponent = () => {
  return (
    <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      <Map
        style={{ width: '100%', height: '500px' }}
        defaultCenter={{ lat: 40.7128, lng: -74.0060 }}
        defaultZoom={12}
      >
        {/* Child components, like markers, can go here */}
      </Map>
    </APIProvider>
  );
};

export default MapComponent;