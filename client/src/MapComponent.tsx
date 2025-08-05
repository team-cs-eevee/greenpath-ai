import React from 'react';
import { APIProvider, Map } from '@vis.gl/react-google-maps';

const MapComponent = () => {
  return (
    <div id = 'google-maps'>
    <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      <Map
        style={{ width: '30rem', height: '30rem'}}
        defaultCenter={{ lat: 40.7128, lng: -74.0060 }}
        defaultZoom={12}
      >
        {/* Child components, like markers, can go here */}
      </Map>
    </APIProvider>
    </div>
  );
};

export default MapComponent;