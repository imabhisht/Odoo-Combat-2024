import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const Markers = () => {
  // Static sample data
  const data = [
    { name: 'San Francisco', location: [37.7749, -122.4194] },
    { name: 'Los Angeles', location: [34.0522, -118.2437] },
    { name: 'New York City', location: [40.7128, -74.006] },
    { name: 'London', location: [51.5074, -0.1278] },
    { name: 'Paris', location: [48.8566, 2.3522] },
  ];

  return (
    <MapContainer center={[20, 0]} zoom={2} style={{ height: '100vh', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />

      {/* Render markers */}
      {data.map((point, index) => (
        <Marker key={index} position={point.location}>
          <Popup>{point.name}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Markers;
