'use client';

import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css'; // Re-uses images from ~leaflet package
import 'leaflet-defaulticon-compatibility';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { locations } from '../locations';

export const LocatorMap = () => {
  return (
    <div className="h-200 flex-1 max-w-screen-2xl">
      <MapContainer
        center={[0, 0]}
        zoom={2}
        scrollWheelZoom={false}
        className="h-full"
      >
        <TileLayer
          attribution="Google Maps"
          url="https://www.google.cn/maps/vt?lyrs=m@189&gl=cn&x={x}&y={y}&z={z}"
        />
        {locations.map((x) => (
          <Marker
            position={[x.lat, x.long]}
            key={x.id}
          >
            <Popup>Entity id: {x.id}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};
