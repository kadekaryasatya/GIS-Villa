import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import 'react-leaflet-markercluster/dist/styles.min.css';
import { IVilla } from '../../utils/data';
import L from 'leaflet';
import icon from './marker.png';
import VillaInfo from './VillaInfo';
import { Link } from 'react-router-dom';

export default function MapVilla(props: { data: IVilla }) {
  // Initialize state for the marker data

  const { data } = props;

  const locationIcon = L.icon({
    iconUrl: icon,
    iconSize: [50, 50],
    iconAnchor: [15, 30],
  });

  return (
    <div className=' h-[500px] '>
      <MapContainer center={[-8.6828693, 115.2004822]} zoom={13} style={{ height: '400px', width: '50%' }}>
        <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' attribution="Map data &copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors" />
        <MarkerClusterGroup>
          <Marker key={data.id} position={[data.lat, data.lng]} icon={locationIcon}>
            <Popup className=''>
              <Link to={`/villa/${data.id}`}>
                <VillaInfo data={data} />
              </Link>
            </Popup>
          </Marker>
        </MarkerClusterGroup>
      </MapContainer>
    </div>
  );
}
