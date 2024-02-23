'use client';

import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css'; // Re-uses images from ~leaflet package
import 'leaflet-defaulticon-compatibility';
import L, { LatLng } from 'leaflet';
import { MapContainer, Marker, TileLayer, useMapEvents } from 'react-leaflet';
import { EntityWithLocation } from '../types';

type Props = {
  entities: EntityWithLocation[];
  userPosition?: LatLng;
  setUserPosition: (arg0: LatLng) => void;
};

const LocationFinder = ({ setUserPosition }: { setUserPosition: (arg0: LatLng) => void }) => {
  const map = useMapEvents({
    click(e) {
      setUserPosition(e.latlng);
    },
  });
  return null;
};

const entityIcon = new L.Icon({
  iconUrl:
    'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

export const LocatorMap = ({ entities, userPosition, setUserPosition }: Props) => {
  return (
    <div className="h-1/2 xl:h-2/3 w-full shadow-md mb-3">
      <MapContainer
        center={[20, 0]}
        zoom={2.3}
        minZoom={2.3}
        scrollWheelZoom={false}
        maxBounds={[
          [90, -180],
          [-90, 180],
        ]}
        className="h-full w-full rounded-md"
      >
        <LocationFinder setUserPosition={setUserPosition} />
        <TileLayer
          attribution="Google Maps"
          url="https://www.google.cn/maps/vt?lyrs=m@189&gl=cn&x={x}&y={y}&z={z}"
        />
        {userPosition && <Marker position={userPosition} />}
        {entities.map((x) => (
          <Marker
            position={[x.lat, x.long]}
            key={x.id}
            icon={entityIcon}
          />
        ))}
      </MapContainer>
    </div>
  );
};

export default LocatorMap;
