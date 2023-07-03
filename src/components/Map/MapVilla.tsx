import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'react-leaflet-markercluster/dist/styles.min.css';
import { IVilla } from '../../utils/data';
import L from 'leaflet';
import icon from './marker.png';
import directionIcon from './marker1.png';

import VillaInfo from './VillaInfo';
import { Link } from 'react-router-dom';
import 'leaflet-routing-machine';

export default function MapVilla(props: { data: IVilla }) {
  const { data } = props;

  const locationIcon = L.icon({
    iconUrl: icon,
    iconSize: [50, 50],
    iconAnchor: [15, 30],
  });

  const directionMarkerIcon = L.icon({
    iconUrl: directionIcon,
    iconSize: [50, 50],
    iconAnchor: [25, 50],
  });

  const [position, setPosition] = useState<[number, number] | null>(null);

  const handleMapClick = (e: L.LeafletMouseEvent) => {
    const { lat, lng } = e.latlng;
    setPosition([lat, lng]);
    onLocationSelected(lat, lng);
  };

  const AddMarkerToMap = () => {
    useMapEvents({
      click: (e) => handleMapClick(e),
    });

    if (position) {
      return <Marker position={position} icon={locationIcon} />;
    }

    return null;
  };

  return (
    <div className='h-[500px]'>
      <MapContainer center={[-8.6828693, 115.2004822]} zoom={13} style={{ height: '450px', width: '100%' }}>
        <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' attribution="Map data &copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors" />
        <Marker key={data.id} position={[data.lat, data.lng]} icon={locationIcon}>
          <Popup className=''>
            <Link to={`/villa/${data.id}`}>
              <VillaInfo data={data} />
            </Link>
          </Popup>
        </Marker>
        <AddMarkerToMap />
      </MapContainer>
    </div>
  );
}
