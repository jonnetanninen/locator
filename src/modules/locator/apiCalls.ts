import axios from 'axios';
import { Entity } from './types';

export const getLocations = async (): Promise<string> => {
  const response = await axios.get('https://aseevia.github.io/star-wars-frontend/data/secret.json');
  return response.data.message;
};

export const getEntities = async (ids: number[]): Promise<Entity[]> => {
  const responses = await Promise.all(
    ids.map((id) => axios.get(`https://akabab.github.io/starwars-api/api/id/${id}.json`))
  );
  const entities = responses.map((res) => res.data);

  return entities;
};
