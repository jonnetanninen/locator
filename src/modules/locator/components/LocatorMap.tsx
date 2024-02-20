'use client';

import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css'; // Re-uses images from ~leaflet package
import 'leaflet-defaulticon-compatibility';
import { MapContainer, Marker, TileLayer, useMapEvents } from 'react-leaflet';
import { EntityWithLocation } from '../types';
import { useState } from 'react';
import { LatLng } from 'leaflet';

type Props = {
  entities: EntityWithLocation[];
};

const LocationFinder = ({ setUserPosition }: { setUserPosition: (arg0: LatLng) => void }) => {
  const map = useMapEvents({
    click(e) {
      setUserPosition(e.latlng);
    },
  });
  return null;
};

export const LocatorMap = ({ entities }: Props) => {
  const [userPosition, setUserPosition] = useState<LatLng>();

  return (
    <div className="h-200 flex-1 max-w-screen-2xl">
      <MapContainer
        center={[20, 0]}
        zoom={2.3}
        minZoom={2.3}
        scrollWheelZoom={false}
        maxBounds={[
          [180, -180],
          [-180, 180],
        ]}
        className="h-full"
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
          />
        ))}
      </MapContainer>
    </div>
  );
};

export default LocatorMap;
