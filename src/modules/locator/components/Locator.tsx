'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { getEntities, getLocations } from '../apiCalls';
import { Entity, EntityWithLocation, Location } from '../types';
import { LatLng } from 'leaflet';

const LocatorMap = dynamic(() => import('./LocatorMap'), { ssr: false });

export const Locator = () => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [entities, setEntities] = useState<Entity[]>([]);
  const [userPosition, setUserPosition] = useState<LatLng>();

  useEffect(() => {
    getLocations().then((data) => {
      const decryptedLocations: Location[] = JSON.parse(atob(data));
      setLocations(decryptedLocations);
    });
  }, []);

  useEffect(() => {
    getEntities(locations.map((location) => location.id)).then((data) => {
      setEntities(data);
    });
  }, [locations]);

  const entitiesWithCoordinates = entities.reduce((accumulator: EntityWithLocation[], current) => {
    const location = locations.find((location) => location.id === current.id);
    if (location) {
      return [...accumulator, { ...current, ...location }];
    }

    return accumulator;
  }, []);

  return (
    <div className="py-20 flex justify-center">
      <LocatorMap
        entities={entitiesWithCoordinates}
        userPosition={userPosition}
        setUserPosition={setUserPosition}
      />
    </div>
  );
};

export default Locator;
