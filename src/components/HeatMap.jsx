import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import { HeatmapLayer } from 'leaflet-heatmap';
import 'leaflet/dist/leaflet.css';

const HeatMap = ({ data }) => {
  const heatmapOptions = {
    radius: 25,
    maxOpacity: 0.8,
    scaleRadius: true,
    useLocalExtrema: true,
    latField: 'lat',
    lngField: 'lng',
    valueField: 'value',
  };

  return (
    <MapContainer center={[20, 0]} zoom={2} style={{ height: '100vh', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      <HeatmapLayer
        points={data}
        options={heatmapOptions}
      />
    </MapContainer>
  );
};

export default HeatMap;
