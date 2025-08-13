import {
  getRandomInt
} from './randomHelper';
import { streets, cities, states, streetEnding } from '../../mocks/address';
import { firstNames, lastNames, emailhosts } from '../../mocks/names';
import { everything } from '../../mocks/words';

const START_ZERO = 0;
const ADD_ONE = 1;

const RANDOM_MAX_FOUR = 4;
const RANDOM_NONZERO_MAX = 9;
const RANDOM_MAX_TEN = 10;

const generateRandomContent = (content: string[]) => {
  const randomContentIndex = getRandomInt(content.length);
  return content[randomContentIndex];
};

const generateFirstName = () => {
  const randomNameIndex = getRandomInt(firstNames.length);
  return firstNames[randomNameIndex];
};

const generateLastName = () => {
  const randomNameIndex = getRandomInt(lastNames.length);
  return lastNames[randomNameIndex];
};

const generateEmailAddress = () => {
  const emailIndex = getRandomInt(emailhosts.length);
  const wordIndex = getRandomInt(everything.length);
  const wordIndex2 = getRandomInt(everything.length);
  const emailEnding = emailhosts[emailIndex];

  return (
    everything[wordIndex].toLocaleLowerCase() + '.' + everything[wordIndex2].toLocaleLowerCase() + '@' + emailEnding
  );
};

const generateStreetName = () => {
  const numberOfDigits = getRandomInt(RANDOM_MAX_FOUR) + ADD_ONE;
  const randomStreetIndex = getRandomInt(streets.length);
  const randomStreetEndingIndex = getRandomInt(streetEnding.length);

  let addressNumber = '';
  for (let i = START_ZERO; i < numberOfDigits; i++) {
    const newDigit = i === START_ZERO ? getRandomInt(RANDOM_NONZERO_MAX) + ADD_ONE : getRandomInt(RANDOM_MAX_TEN);
    addressNumber += newDigit;
  }

  return addressNumber + ' ' + streets[randomStreetIndex] + streetEnding[randomStreetEndingIndex];
};

const generateCity = () => {
  const randomCityIndex = getRandomInt(cities.length);


  return cities[randomCityIndex];
};

const generateState = () => {
  const randomStateIndex = getRandomInt(states.length);

  return states[randomStateIndex];
};

export {
  generateRandomContent,
  generateFirstName,
  generateLastName,
  generateEmailAddress,
  generateStreetName,
  generateCity,
  generateState,
};
