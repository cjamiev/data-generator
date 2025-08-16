import { LETTERS, SPECIAL_CHARACTERS } from '../../constants/characters';
import { getRandomInt } from './randomNumberHelper';

export const getRandomLetter = (): string => {
  const letterIndex = getRandomInt(26);

  return LETTERS[letterIndex];
};

export const getRandomAlphanumberic = (): string => {
  const randomIndex = getRandomInt(36);

  return randomIndex < 10 ? String(randomIndex) : LETTERS.charAt(getRandomInt(26));
};

export const getRandomCharacter = (): string => {
  const randomIndex = getRandomInt(64);

  if (randomIndex < 10) {
    return String(randomIndex);
  } else if (randomIndex > 9 && randomIndex < 36) {
    return LETTERS.charAt(getRandomInt(26));
  } else {
    return SPECIAL_CHARACTERS.charAt(getRandomInt(28));
  }
};