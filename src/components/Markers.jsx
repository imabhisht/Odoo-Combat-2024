import React, { useState } from 'react';
import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const Markers = () => {
  // Static sample data
  const initialData = [
    { name: 'San Francisco', location: [37.7749, -122.4194] },
    { name: 'Los Angeles', location: [34.0522, -118.2437] },
    { name: 'New York City', location: [40.7128, -74.006] },
    { name: 'London', location: [51.5074, -0.1278] },
    { name: 'Paris', location: [48.8566, 2.3522] },
    { name: 'Kushalgarh', location: [23.1987, 74.449997] },
  ];

  const [data, setData] = useState(initialData);

  const handleAddUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newLocation = {
            name: 'You are here',
            location: [position.coords.latitude, position.coords.longitude],
          };
          setData((prevData) => [...prevData, newLocation]);
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  };

  return (
    <>
      <button onClick={handleAddUserLocation}>
        Add your location
      </button>
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
    </>
  );
};

export default Markers;