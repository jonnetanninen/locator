'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { LatLng } from 'leaflet';
import { fetchEntities, fetchLocations } from '../apiCalls';
import { Entity, EntityWithLocation, Location } from '../types';
import LocatorList from './LocatorList';

const LocatorMap = dynamic(() => import('./LocatorMap'), { ssr: false });

const Locator = () => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [entities, setEntities] = useState<Entity[]>([]);
  const [userPosition, setUserPosition] = useState<LatLng>();

  useEffect(() => {
    fetchLocations().then((data) => {
      const decryptedLocations: Location[] = JSON.parse(atob(data));
      setLocations(decryptedLocations);
    });
  }, []);

  useEffect(() => {
    fetchEntities(locations.map((location) => location.id)).then((data) => {
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
    <div className="py-20 flex justify-center items-center flex-col">
      <LocatorMap
        entities={entitiesWithCoordinates}
        userPosition={userPosition}
        setUserPosition={setUserPosition}
      />
      <LocatorList entities={entitiesWithCoordinates} />
    </div>
  );
};

export default Locator;
