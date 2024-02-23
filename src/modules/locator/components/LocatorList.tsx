import { LatLng } from 'leaflet';
import Image from 'next/image';
import { EntityWithLocation } from '../types';
import { calcDistance, sortEntitiesByDistance } from '../helpers';

type Props = {
  entities: EntityWithLocation[];
  userPosition: LatLng;
};

const LocatorList = ({ entities, userPosition }: Props) => {
  const entitiesWithDistance = entities
    .map((entity) => ({
      ...entity,
      distance: Math.round(
        calcDistance(userPosition.lat, userPosition.lng, entity.lat, entity.long)
      ),
    }))
    .sort(sortEntitiesByDistance);

  return (
    <ol className="w-full gap-3 h-1/2 xl:h-1/3 overflow-y-scroll grid grid-cols-1 md:grid-cols-2">
      {entitiesWithDistance.map((entity) => (
        <li
          aria-label="List of locations"
          key={entity.id}
          className="bg-stone-100 p-8 rounded-md flex gap-x-6 text-stone-800 shadow-md flex-wrap"
        >
          <div className="w-20">
            <Image
              alt=""
              // Using tailwind to set height and width cause console warning because of known bug: https://github.com/vercel/next.js/issues/56025
              className="w-auto h-24"
              // Height and width needs to be provided here for next/image to avoid layout shift with external images
              height={96}
              width={71}
              src={entity.image}
              aria-hidden
            />
          </div>

          <div className="flex justify-between flex-1 flex-col lg:flex-row gap-3 w-">
            <div className="flex flex-col">
              <h2 className="text-lg font-bold">{entity.name}</h2>
              <span className="capitalize">Species: {entity.species}</span>
              <span>Height: {entity.height} m</span>
              <span>Weight: {entity.mass} kg</span>
            </div>
            {entity.distance && (
              <div className="flex justify-end">
                <Image
                  alt=""
                  // Height and width needs to be provided here for next/image to avoid layout shift with external images
                  height={24}
                  width={15}
                  // Using tailwind to set height and width cause console warning because of known bug: https://github.com/vercel/next.js/issues/56025
                  className="h-6 w-auto mr-2"
                  src="https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png"
                  aria-hidden
                />
                Distance: {entity.distance} km
              </div>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
};

export default LocatorList;
