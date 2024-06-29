import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Mock crime report data
const crimeReports = [
    { user_id: '26', type: 'Theft', description: 'Phone stolen from park bench', location: { type: 'Point', coordinates: [45.4215, -75.6919] }, timestamp: '2023-01-15T10:30:00Z', media_url: 'https://example.com/image26.jpg', is_anonymous: false, created_at: '2023-01-15T10:30:00Z', updated_at: '2023-01-15T10:30:00Z' },
    { user_id: '27', type: 'Vandalism', description: 'Broken windows in public library', location: { type: 'Point', coordinates: [37.7749, -122.4194] }, timestamp: '2023-02-20T15:45:00Z', media_url: 'https://example.com/image27.jpg', is_anonymous: true, created_at: '2023-02-20T15:45:00Z', updated_at: '2023-02-20T15:45:00Z' },
    { user_id: '28', type: 'Assault', description: 'Street brawl near downtown', location: { type: 'Point', coordinates: [34.0522, -118.2437] }, timestamp: '2023-03-10T08:00:00Z', media_url: 'https://example.com/image28.jpg', is_anonymous: false, created_at: '2023-03-10T08:00:00Z', updated_at: '2023-03-10T08:00:00Z' },
    { user_id: '29', type: 'Robbery', description: 'Gas station armed robbery', location: { type: 'Point', coordinates: [40.7128, -74.006] }, timestamp: '2023-04-05T14:20:00Z', media_url: 'https://example.com/image29.jpg', is_anonymous: true, created_at: '2023-04-05T14:20:00Z', updated_at: '2023-04-05T14:20:00Z' },
    { user_id: '30', type: 'Burglary', description: 'Residential break-in during daytime', location: { type: 'Point', coordinates: [51.5074, -0.1278] }, timestamp: '2023-05-18T11:10:00Z', media_url: 'https://example.com/image30.jpg', is_anonymous: false, created_at: '2023-05-18T11:10:00Z', updated_at: '2023-05-18T11:10:00Z' },
    { user_id: '31', type: 'Theft', description: 'Shoplifting incident at mall', location: { type: 'Point', coordinates: [48.8566, 2.3522] }, timestamp: '2023-06-22T16:50:00Z', media_url: 'https://example.com/image31.jpg', is_anonymous: true, created_at: '2023-06-22T16:50:00Z', updated_at: '2023-06-22T16:50:00Z' },
    { user_id: '32', type: 'Vandalism', description: 'Graffiti on city walls', location: { type: 'Point', coordinates: [41.9028, 12.4964] }, timestamp: '2023-07-30T09:15:00Z', media_url: 'https://example.com/image32.jpg', is_anonymous: false, created_at: '2023-07-30T09:15:00Z', updated_at: '2023-07-30T09:15:00Z' },
    { user_id: '33', type: 'Assault', description: 'Assault outside nightclub', location: { type: 'Point', coordinates: [35.6895, 139.6917] }, timestamp: '2023-08-12T22:00:00Z', media_url: 'https://example.com/image33.jpg', is_anonymous: true, created_at: '2023-08-12T22:00:00Z', updated_at: '2023-08-12T22:00:00Z' },
    { user_id: '34', type: 'Robbery', description: 'Bank robbery with hostages', location: { type: 'Point', coordinates: [55.7558, 37.6173] }, timestamp: '2023-09-05T17:30:00Z', media_url: 'https://example.com/image34.jpg', is_anonymous: false, created_at: '2023-09-05T17:30:00Z', updated_at: '2023-09-05T17:30:00Z' },
    { user_id: '35', type: 'Burglary', description: 'Break-in at jewelry store', location: { type: 'Point', coordinates: [52.5200, 13.4050] }, timestamp: '2023-10-19T13:40:00Z', media_url: 'https://example.com/image35.jpg', is_anonymous: true, created_at: '2023-10-19T13:40:00Z', updated_at: '2023-10-19T13:40:00Z' },
    { user_id: '36', type: 'Theft', description: 'Theft of electronic devices', location: { type: 'Point', coordinates: [19.4326, -99.1332] }, timestamp: '2023-11-08T18:00:00Z', media_url: 'https://example.com/image36.jpg', is_anonymous: false, created_at: '2023-11-08T18:00:00Z', updated_at: '2023-11-08T18:00:00Z' },
    { user_id: '37', type: 'Vandalism', description: 'Public transportation bus vandalized', location: { type: 'Point', coordinates: [34.0522, -118.2437] }, timestamp: '2023-12-25T12:00:00Z', media_url: 'https://example.com/image37.jpg', is_anonymous: true, created_at: '2023-12-25T12:00:00Z', updated_at: '2023-12-25T12:00:00Z' },
    { user_id: '38', type: 'Assault', description: 'Street altercation between gangs', location: { type: 'Point', coordinates: [51.5074, -0.1278] }, timestamp: '2024-01-03T19:30:00Z', media_url: 'https://example.com/image38.jpg', is_anonymous: false, created_at: '2024-01-03T19:30:00Z', updated_at: '2024-01-03T19:30:00Z' },
    { user_id: '39', type: 'Robbery', description: 'Convenience store armed robbery', location: { type: 'Point', coordinates: [41.9028, 12.4964] }, timestamp: '2024-02-14T14:45:00Z', media_url: 'https://example.com/image39.jpg', is_anonymous: true, created_at: '2024-02-14T14:45:00Z', updated_at: '2024-02-14T14:45:00Z' },
    { user_id: '40', type: 'Burglary', description: 'Break-in at software company', location: { type: 'Point', coordinates: [35.6895, 139.6917] }, timestamp: '2024-03-20T11:20:00Z', media_url: 'https://example.com/image40.jpg', is_anonymous: false, created_at: '2024-03-20T11:20:00Z', updated_at: '2024-03-20T11:20:00Z' },
    { user_id: '41', type: 'Theft', description: 'Wallet stolen in busy market', location: { type: 'Point', coordinates: [55.7558, 37.6173] }, timestamp: '2024-04-18T16:00:00Z', media_url: 'https://example.com/image41.jpg', is_anonymous: true, created_at: '2024-04-18T16:00:00Z', updated_at: '2024-04-18T16:00:00Z' },
    { user_id: '42', type: 'Vandalism', description: 'Public park benches vandalized', location: { type: 'Point', coordinates: [52.5200, 13.4050] }, timestamp: '2024-05-10T09:00:00Z', media_url: 'https://example.com/image42.jpg', is_anonymous: false, created_at: '2024-05-10T09:00:00Z', updated_at: '2024-05-10T09:00:00Z' },
    { user_id: '43', type: 'Assault', description: 'Street fight involving weapons', location: { type: 'Point', coordinates: [19.4326, -99.1332] }, timestamp: '2024-06-28T17:30:00Z', media_url: 'https://example.com/image43.jpg', is_anonymous: true, created_at: '2024-06-28T17:30:00Z', updated_at: '2024-06-28T17:30:00Z' },
    { user_id: '44', type: 'Robbery', description: 'Armored truck robbery', location: { type: 'Point', coordinates: [37.7749, -122.4194] }, timestamp: '2024-07-22T13:15:00Z', media_url: 'https://example.com/image44.jpg', is_anonymous: false, created_at: '2024-07-22T13:15:00Z', updated_at: '2024-07-22T13:15:00Z' },
    { user_id: '45', type: 'Burglary', description: 'Break-in at art gallery', location: { type: 'Point', coordinates: [40.7128, -74.006] }, timestamp: '2024-08-30T10:45:00Z', media_url: 'https://example.com/image45.jpg', is_anonymous: true, created_at: '2024-08-30T10:45:00Z', updated_at: '2024-08-30T10:45:00Z' },
    { user_id: '46', type: 'Theft', description: 'Purse snatching incident', location: { type: 'Point', coordinates: [51.5074, -0.1278] }, timestamp: '2024-09-14T14:00:00Z', media_url: 'https://example.com/image46.jpg', is_anonymous: false, created_at: '2024-09-14T14:00:00Z', updated_at: '2024-09-14T14:00:00Z' },
    { user_id: '47', type: 'Vandalism', description: 'Street art defaced', location: { type: 'Point', coordinates: [48.8566, 2.3522] }, timestamp: '2024-10-08T08:30:00Z', media_url: 'https://example.com/image47.jpg', is_anonymous: true, created_at: '2024-10-08T08:30:00Z', updated_at: '2024-10-08T08:30:00Z' },
    { user_id: '48', type: 'Assault', description: 'Assault in shopping mall', location: { type: 'Point', coordinates: [41.9028, 12.4964] }, timestamp: '2024-11-05T12:20:00Z', media_url: 'https://example.com/image48.jpg', is_anonymous: false, created_at: '2024-11-05T12:20:00Z', updated_at: '2024-11-05T12:20:00Z' },
    { user_id: '49', type: 'Robbery', description: 'Jewelry shop armed robbery', location: { type: 'Point', coordinates: [35.6895, 139.6917] }, timestamp: '2024-12-02T15:00:00Z', media_url: 'https://example.com/image49.jpg', is_anonymous: true, created_at: '2024-12-02T15:00:00Z', updated_at: '2024-12-02T15:00:00Z' },
    { user_id: '50', type: 'Burglary', description: 'Break-in at technology company', location: { type: 'Point', coordinates: [34.0522, -118.2437] }, timestamp: '2025-01-10T18:45:00Z', media_url: 'https://example.com/image50.jpg', is_anonymous: false, created_at: '2025-01-10T18:45:00Z', updated_at: '2025-01-10T18:45:00Z' },
    // Continuing with more crime reports...
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
        report.location.coordinates.join(',').includes(filters.location);
      const matchesType = !filters.type || report.type === filters.type;

      // Convert filter dates to Date objects for comparison
      const filterDateFrom = filters.dateFrom ? new Date(filters.dateFrom) : null;
      const filterDateTo = filters.dateTo ? new Date(filters.dateTo) : null;
      const reportDate = new Date(report.timestamp);

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
          position={report.location.coordinates}
          icon={createIcon('red')}
        >
          <Popup>
            <strong>{report.type}</strong>
            <br />
            {report.description}
            <br />
            <img src={report.media_url} alt={report.type} style={{ width: '100px' }} />
            <br />
            Reported at: {new Date(report.timestamp).toLocaleString()}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default CrimeReport;
