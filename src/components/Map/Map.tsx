import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { IVilla, ListVilla } from '../../utils/data';

export default function Maps() {
  // Initialize state for the marker data
  const [markerData, setMarkerData] = useState<IVilla[]>([]);

  // Set the marker data when the component mounts
  useEffect(() => {
    setMarkerData(ListVilla);
  }, []);
  return (
    <>
      <p className='text-2xl font-semibold'>Search Villa Nearby</p>
      <div className='border-2 border-cyan-950 mt-2'>
        <MapContainer center={[51.505, -0.09]} zoom={3}>
          <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' attribution="Map data &copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors" />
          {markerData.map((marker: IVilla) => (
            <Marker key={marker.id} position={[marker.lat, marker.lng]}>
              <Popup>
                <p>{marker.name}</p>
                <p>{marker.location}</p>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </>
  );
}
