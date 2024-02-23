import { EntityWithLocation } from '../types';

type Props = {
  entities: EntityWithLocation[];
};

  return (
    <div className="w-full max-w-screen-2xl gap-4 pt-4 h-80 overflow-y-scroll grid grid-cols-2">
      {entities.map((entity) => (
        <div
          key={entity.id}
          className="w-auto bg-gray-300 border-l-neutral-600 p-8 rounded-md flex gap-4"
        >
          <img
            src={entity.image}
            height=""
            width="80"
          />
          <div className="flex-1">
            <p>Name: {entity.name}</p>
            <p>Name: {entity.died}</p>
            <p>Name: {entity.diedLocation}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LocatorList;
