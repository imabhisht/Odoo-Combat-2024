import React, { useState, useRef, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvent } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const SetViewOnClick = ({ animateRef, setCenter }) => {
  const map = useMapEvent('click', (e) => {
    setCenter([e.latlng.lat, e.latlng.lng]);
    map.setView(e.latlng, map.getZoom(), {
      animate: animateRef.current || false,
    });
  });

  return null;
};

const CrimeLocation = () => {
  const [center, setCenter] = useState([20, 0]);
  const [data, setData] = useState([]);
  const animateRef = useRef(false);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLocation = {
            name: 'You are here',
            location: [position.coords.latitude, position.coords.longitude],
          };
          setCenter(userLocation.location);
          setData((prevData) => [...prevData, userLocation]);
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }, []);

  return (
    <>
      <MapContainer center={center} zoom={13} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <SetViewOnClick animateRef={animateRef} setCenter={setCenter} />
        
        {data.map((point, index) => (
          <Marker key={index} position={center}>
            <Popup>{point.name}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </>
  );
};

export default CrimeLocation;
