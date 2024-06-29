// src/components/MapComponent.js
import React, 
{ useState, useEffect } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.heat';
import L from 'leaflet';

const HeatmapLayer = ({ data }) => {
  const map = useMap();

  useEffect(() => {
    if (data.length > 0) {
      const heatLayer = L.heatLayer(data, {
        radius: 25,
        gradient: {
          0.1: 'blue',
          0.3: 'lime',
          0.5: 'yellow',
          0.7: 'orange',
          0.9: 'red'
        }
      }).addTo(map);
      return () => {
        map.removeLayer(heatLayer);
      };
    }
  }, [map, data]);

  return null;
};

const generateRandomPoints = (center, numPoints, radius) => {
  const points = [];
  for (let i = 0; i < numPoints; i++) {
    const angle = Math.random() * Math.PI * 2;
    const distance = Math.random() * radius;
    const latOffset = distance * Math.cos(angle) / 111000; // Approximation for latitude (meters to degrees)
    const lngOffset = distance * Math.sin(angle) / (111000 * Math.cos(center[0] * Math.PI / 180)); // Approximation for longitude (meters to degrees)
    const intensity = Math.random() * 5 + 0.1; // Random intensity between 0.1 and 1.0
    points.push([center[0] + latOffset, center[1] + lngOffset, intensity]);
  }
  return points;
};

const MapComponent = () => {
  const [location, setLocation] = useState(null);
  const [heatmapData, setHeatmapData] = useState([]);

  const handleAddUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newLocation = {
            name: 'You are here',
            location: [position.coords.latitude, position.coords.longitude],
          };
          setLocation(newLocation.location);
          
          // Generate random data points within 2.5 km radius
          const dataPoints = generateRandomPoints(newLocation.location, 100, 2500);
          setHeatmapData(dataPoints);
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
    <div>
      <button onClick={handleAddUserLocation}>Generate Heatmap Near Me</button>
      <MapContainer center={location || [23.01952, 72.5417984]} zoom={13} style={{ height: '100vh', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {location && <HeatmapLayer data={heatmapData} />}
      </MapContainer>
    </div>
  );
};

export default MapComponent;
