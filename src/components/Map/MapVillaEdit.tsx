import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'react-leaflet-markercluster/dist/styles.min.css';
import { IVilla } from '../../utils/data';
import L from 'leaflet';
import icon from './marker.png';

import VillaInfo from './VillaInfo';
import { Link } from 'react-router-dom';
import 'leaflet-routing-machine';

export default function MapVillaEdit(props: { data: IVilla }) {
  const { data } = props;

  const locationIcon = L.icon({
    iconUrl: icon,
    iconSize: [50, 50],
    iconAnchor: [15, 30],
  });

  return (
    <div className='h-[400px]'>
      <MapContainer center={[-8.6828693, 115.2004822]} zoom={13} style={{ height: '400px', width: '100%' }}>
        <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' attribution="Map data &copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors" />
        <Marker key={data.id} position={[data.lat, data.lng]} icon={locationIcon}>
          <Popup className=''>
            <Link to={`/villa/${data.id}`}>
              <VillaInfo data={data} />
            </Link>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
