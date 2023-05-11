import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { IVilla, ListVilla } from '../../utils/data';
import L from 'leaflet';
import icon from './marker.png';
import VillaInfo from './VillaInfo';
import { Link } from 'react-router-dom';
import { getVillaList } from '../../utils/api';

export default function Maps() {
  // Initialize state for the marker data
  const [markerData, setMarkerData] = useState<IVilla[]>([]);

  const [villaList, setVillaList] = useState<Array<IVilla>>([]);

  useEffect(() => {
    async function fetchData() {
      const records = await getVillaList();
      setVillaList(records);
    }
    fetchData();
  }, []);

  const locationIcon = L.icon({
    iconUrl: icon,
    iconSize: [50, 50],
    iconAnchor: [15, 30],
  });

  // Set the marker data when the component mounts
  useEffect(() => {
    setMarkerData(villaList);
  }, [villaList]);
  return (
    <>
      <div className=''>
        <MapContainer center={[-8.6828693, 115.2004822]} zoom={13}>
          <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' attribution="Map data &copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors" />
          {markerData.map((villa: IVilla) => (
            <Marker key={villa.id} position={[villa.lat, villa.lng]} icon={locationIcon}>
              <Popup>
                <Link to={`/villa/${villa.id}`}>
                  <VillaInfo data={villa} />
                </Link>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </>
  );
}
