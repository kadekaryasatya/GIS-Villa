import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import icon from './marker.png';
import L from 'leaflet';

const MapComponent: React.FC<{ onLocationSelected: (lat: number, lng: number) => void }> = ({ onLocationSelected }) => {
  const [position, setPosition] = useState<[number, number] | null>(null);

  const locationIcon = L.icon({
    iconUrl: icon,
    iconSize: [50, 50],
    iconAnchor: [15, 30],
  });

  const AddMarkerToMap = () => {
    useMapEvents({
      click: (e) => {
        const { lat, lng } = e.latlng;
        setPosition([lat, lng]);
        onLocationSelected(lat, lng);
      },
    });

    if (position) {
      return <Marker position={position} icon={locationIcon} />;
    }

    return null;
  };

  return (
    <MapContainer center={[-8.6828693, 115.2004822]} zoom={13} style={{ height: '400px', width: '100%' }}>
      <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
      <AddMarkerToMap />
    </MapContainer>
  );
};

export default MapComponent;
