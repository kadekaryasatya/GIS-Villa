import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'react-leaflet-markercluster/dist/styles.min.css';
import { IVilla } from '../../utils/data';
import L from 'leaflet';
import icon from './marker.png';
import directionIcon from './marker1.png';
import VillaInfo from './VillaInfo';
import { Link } from 'react-router-dom';
import 'leaflet-routing-machine';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import { useState } from 'react';

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

  function ClickEvent() {
    const [position, setPosition] = useState<[number, number] | null>(null);

    const handleMapClick = (e: L.LeafletMouseEvent, map: L.Map) => {
      const { lat, lng } = e.latlng;
      setPosition([lat, lng]);
      const villaMarker = L.marker([data.lat, data.lng], { icon: locationIcon });
      const destination = L.latLng(lat, lng);
      L.Routing.control({
        waypoints: [villaMarker.getLatLng(), destination],
        routeWhileDragging: true,
      }).addTo(map);
    };

    const map = useMapEvents({
      click: (e) => handleMapClick(e, map),
    });

    if (position) {
      return <Marker position={position} icon={directionMarkerIcon} />;
    }

    return null;
  }

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
        <ClickEvent />
      </MapContainer>
    </div>
  );
}
