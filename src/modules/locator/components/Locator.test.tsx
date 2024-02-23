import { render, screen } from '@testing-library/react';
import L from 'leaflet';
import LocatorList from './LocatorList';

const mockEntities = [
  {
    id: 4,
    name: 'Darth Vader',
    height: 2.03,
    mass: 120,
    gender: 'male',
    homeworld: 'tatooine',
    wiki: 'http://starwars.wikia.com/wiki/Anakin_Skywalker',
    image: 'https://vignette.wikia.nocookie.net/fr.starwars/images/3/32/Dark_Vador.jpg',
    born: -41,
    died: 4,
    diedLocation: 'death star ii, endor system',
    species: 'human',
    hairColor: 'blond',
    eyeColor: 'blue, yellow (dark side)',
    skinColor: 'light, later pale',
    cybernetics: 'Cybernetic right arm; later prosthetic arms and legs, and a life-support system',
    affiliations: ['501st Legion', 'Sith', 'Galactic Empire', 'Imperial High Command'],
    masters: [
      'Qui-Gon Jinn (informal Jedi Master)',
      'Obi-Wan Kenobi (Jedi Master)',
      'Darth Sidious (Sith Master)',
      'Yoda (Force spirit teacher)',
    ],
    apprentices: ['Ahsoka Tano (Padawan)', 'Inquisitorius'],
    formerAffiliations: ['Jedi Order', 'Jedi High Council', 'Galactic Republic'],
    lat: 11,
    long: 11,
  },
  {
    id: 5,
    name: 'Definitely Not Darth Vader',
    height: 2.03,
    mass: 120,
    gender: 'male',
    homeworld: 'tatooine',
    wiki: 'http://starwars.wikia.com/wiki/Anakin_Skywalker',
    image: 'https://vignette.wikia.nocookie.net/fr.starwars/images/3/32/Dark_Vador.jpg',
    born: -41,
    died: 4,
    diedLocation: 'death star ii, endor system',
    species: 'human',
    hairColor: 'blond',
    eyeColor: 'blue, yellow (dark side)',
    skinColor: 'light, later pale',
    cybernetics: 'Cybernetic right arm; later prosthetic arms and legs, and a life-support system',
    affiliations: ['501st Legion', 'Sith', 'Galactic Empire', 'Imperial High Command'],
    masters: [
      'Qui-Gon Jinn (informal Jedi Master)',
      'Obi-Wan Kenobi (Jedi Master)',
      'Darth Sidious (Sith Master)',
      'Yoda (Force spirit teacher)',
    ],
    apprentices: ['Ahsoka Tano (Padawan)', 'Inquisitorius'],
    formerAffiliations: ['Jedi Order', 'Jedi High Council', 'Galactic Republic'],
    lat: 11,
    long: 11,
  },
];

// TODO: Write more and better tests with proper user interaction
describe('Locator', () => {
  // Very simple and slightly stupid test to test if location list renders with provided entities
  it('will render locations in LocatorList', () => {
    render(
      <LocatorList
        entities={mockEntities}
        userPosition={L.latLng([10, 10])}
      />
    );

    expect(screen.getByText('Darth Vader')).toBeDefined();
    expect(screen.getByText('Definitely Not Darth Vader')).toBeDefined();
  });
});
