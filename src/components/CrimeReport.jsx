import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Mock crime report data
const crimeReports = [
  {
    "id": "7be552e5-307b-4d85-9a59-24d5dbbede23",
    "user_id": null,
    "type": "steal",
    "description": "Someone Stole my Android Phone",
    "event_time": "2024-06-29T07:58:15.553Z",
    "media_url": null,
    "is_anonymous": true,
    "created_at": "2024-06-29T08:03:07.445Z",
    "updated_at": "2024-06-29T08:03:07.445Z",
    "title": "Phone Stealing",
    "lat": "23.208027778",   // Convert to number
    "long": "72.63613888899999"  // Convert to number
  },
  {
    "id": "e2455786-981e-48e9-8e23-514e45f727ae",
    "user_id": "667fa17e00143f700eb0",
    "type": "steal",
    "description": "Someone Stole my Android Phone",
    "event_time": "2024-06-29T07:58:15.553Z",
    "media_url": null,
    "is_anonymous": false,
    "created_at": "2024-06-29T08:04:45.661Z",
    "updated_at": "2024-06-29T08:04:45.661Z",
    "title": "Phone Stealing",
    "lat": "23.208027778",   // Convert to number
    "long": "72.63613888899999"  // Convert to number
  },
  {
    "id": "f7f8b1e3-1b76-47b3-8724-9ff3b6b26e8e",
    "user_id": null,
    "type": "vandalism",
    "description": "Someone vandalized my car",
    "event_time": "2024-06-29T08:10:20.123Z",
    "media_url": null,
    "is_anonymous": true,
    "created_at": "2024-06-29T08:15:35.567Z",
    "updated_at": "2024-06-29T08:15:35.567Z",
    "title": "Car Vandalism",
    "lat": "23.205678234",   // Convert to number
    "long": "72.639823456"   // Convert to number
  },
  {
    "id": "c1a5b9df-3c6b-4cbf-8a60-7af84b28a4b1",
    "user_id": "567fa17e00143f700eb1",
    "type": "assault",
    "description": "Someone assaulted me",
    "event_time": "2024-06-29T08:12:30.789Z",
    "media_url": null,
    "is_anonymous": false,
    "created_at": "2024-06-29T08:18:45.321Z",
    "updated_at": "2024-06-29T08:18:45.321Z",
    "title": "Physical Assault",
    "lat": "23.210978123",   // Convert to number
    "long": "72.631267890"   // Convert to number
  },
  {
    "id": "ab1f9d2e-7a98-4b3d-b234-7b5c37c9d6f4",
    "user_id": null,
    "type": "theft",
    "description": "My bicycle was stolen",
    "event_time": "2024-06-29T08:20:45.543Z",
    "media_url": null,
    "is_anonymous": true,
    "created_at": "2024-06-29T08:25:55.789Z",
    "updated_at": "2024-06-29T08:25:55.789Z",
    "title": "Bicycle Theft",
    "lat": "23.207123789",   // Convert to number
    "long": "72.640123456"   // Convert to number
  },
  {
    "id": "d3e8b7f1-9d8e-487a-937b-8eaf1c8e3b45",
    "user_id": "467fa17e00143f700eb2",
    "type": "robbery",
    "description": "I was robbed at knifepoint",
    "event_time": "2024-06-29T08:25:50.987Z",
    "media_url": null,
    "is_anonymous": false,
    "created_at": "2024-06-29T08:30:12.654Z",
    "updated_at": "2024-06-29T08:30:12.654Z",
    "title": "Robbery",
    "lat": "23.209456123",   // Convert to number
    "long": "72.635678912"   // Convert to number
  }
];

const CrimeReport = ({ filters }) => {
  const createIcon = (color) => {
    return L.divIcon({
      className: 'custom-icon',
      html: `<div style="background-color: ${color}; width: 12px; height: 12px; border-radius: 50%;"></div>`,
    });
  };

  const filterReports = () => {
    return crimeReports.filter((report) => {
      const matchesLocation =
        !filters.location ||
        `${report.lat},${report.long}`.includes(filters.location);
        const matchesType = !filters.type || report.type.toLowerCase() === filters.type.toLowerCase();
  
      // Convert filter dates to Date objects for comparison
      const filterDateFrom = filters.dateFrom ? new Date(filters.dateFrom) : null;
      const filterDateTo = filters.dateTo ? new Date(filters.dateTo) : null;
      const reportDate = new Date(report.event_time);

      // Date comparisons
      const matchesDateFrom = !filterDateFrom || reportDate >= filterDateFrom;
      const matchesDateTo = !filterDateTo || reportDate <= filterDateTo;

      return matchesLocation && matchesType && matchesDateFrom && matchesDateTo;
    });
  };

  const filteredReports = filterReports();

  return (
    <MapContainer center={[20, 0]} zoom={2} style={{ height: '100vh', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />

      {filteredReports.map((report, index) => (
        <Marker
          key={index}
          position={[parseFloat(report.lat), parseFloat(report.long)]} // Convert strings to numbers
          icon={createIcon('red')}
        >
          <Popup>
            <strong>{report.type}</strong>
            <br />
            {report.description}
            <br />
            <img src={report.media_url} alt={report.type} style={{ width: '100px' }} />
            <br />
            Reported at: {new Date(report.event_time).toLocaleString()}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default CrimeReport;
