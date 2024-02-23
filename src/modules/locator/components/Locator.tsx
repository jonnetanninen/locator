'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { LatLng } from 'leaflet';
import { fetchEntities, fetchLocations } from '../apiCalls';
import { Entity, EntityWithLocation, Location } from '../types';
import LocatorList from './LocatorList';
import LocatorListPlaceholder from './LocatorListPlaceholder';

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
    <div className="xl:py-3 flex justify-start items-center flex-col w-full max-w-screen-2xl h-screen">
      <h1 className="sr-only">Locator app</h1>
      <LocatorMap
        entities={entitiesWithCoordinates}
        userPosition={userPosition}
        setUserPosition={setUserPosition}
      />
      {userPosition ? (
        <LocatorList
          entities={entitiesWithCoordinates}
          userPosition={userPosition}
        />
      ) : (
        <LocatorListPlaceholder />
      )}
    </div>
  );
};

export default Locator;
