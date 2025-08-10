import { IPasswordOptions } from "../types/password";
import { generateRandomContent } from "./randomContentHelper";

const LOWERCASED_LETTERS = 'abcdefghijklmnopqrstuvwxyz';
const UPPERCASED_LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const NUMBERS = '0123456789';
export const ERROR_MESSAGE = 'NOT ENOUGH CHARACTERS TO WORK WITH!';

interface IGetCharactersProp {
  shouldIncludeNumbers: boolean;
  shouldIncludeLowercasedLetters: boolean;
  shouldIncludeUppercasedLetters: boolean;
  specialCharacters: string[];
}

const getNumbers = (shouldIncludeNumbers: boolean) => {
  return shouldIncludeNumbers ? NUMBERS.split('') : [];
};

const getLowercasedLetters = (shouldIncludeLowercasedLetters: boolean) => {
  return shouldIncludeLowercasedLetters ? LOWERCASED_LETTERS.split('') : [];
};

const getUppercasedLetters = (shouldIncludeUppercasedLetters: boolean) => {
  return shouldIncludeUppercasedLetters ? UPPERCASED_LETTERS.split('') : [];
};

const getAllCharacters = ({
  shouldIncludeNumbers,
  shouldIncludeLowercasedLetters,
  shouldIncludeUppercasedLetters,
  specialCharacters,
}: IGetCharactersProp) => {
  const numList = getNumbers(shouldIncludeNumbers);
  const lowerLetterList = getLowercasedLetters(shouldIncludeLowercasedLetters);
  const upperLetterList = getUppercasedLetters(shouldIncludeUppercasedLetters);

  return [...upperLetterList, ...lowerLetterList, ...numList, ...specialCharacters];
};

const getCharacterWithCheck = ({
  oneCharacterBack,
  twoCharactersBack,
  shouldAllowSequence,
  shouldAllowTripleRepeat,
  allPossibilities,
}: {
  oneCharacterBack: string;
  twoCharactersBack: string;
  shouldAllowSequence: boolean;
  shouldAllowTripleRepeat: boolean;
  allPossibilities: string[];
}) => {
  const size = allPossibilities.length;
  const index = Math.floor(Math.random() * size);
  const currentChar = allPossibilities[index];

  const isInSequence =
    !shouldAllowSequence &&
    index > 1 &&
    allPossibilities[index - 1] === oneCharacterBack &&
    allPossibilities[index - 2] === twoCharactersBack;
  const isTripleRepeat =
    !shouldAllowTripleRepeat && currentChar === oneCharacterBack && currentChar === twoCharactersBack;

  if (isInSequence || isTripleRepeat) {
    return ''; // Not valid character
  }

  return currentChar;
};

const getNextCharacter = ({
  oneCharacterBack,
  twoCharactersBack,
  shouldAllowSequence,
  shouldAllowTripleRepeat,
  allPossibilities,
}: {
  oneCharacterBack: string;
  twoCharactersBack: string;
  shouldAllowSequence: boolean;
  shouldAllowTripleRepeat: boolean;
  allPossibilities: string[];
}) => {
  const size = allPossibilities.length;
  if (shouldAllowSequence && shouldAllowTripleRepeat) {
    const index = Math.floor(Math.random() * size);
    const currentChar = allPossibilities[index];

    return currentChar;
  }

  let foundChar = '';
  let loopCounter = 0;
  while (!foundChar && loopCounter < 100) {
    foundChar = getCharacterWithCheck({
      oneCharacterBack,
      twoCharactersBack,
      shouldAllowSequence,
      shouldAllowTripleRepeat,
      allPossibilities,
    });

    loopCounter++;
  }

  if (loopCounter > 99) {
    console.error('Max Loop Counter Hit');
  }

  return foundChar;
};

export const generatePassword = (passwordOptions: IPasswordOptions) => {
  const {
    passwordLength,
    shouldIncludeNumbers,
    shouldIncludeLowercasedLetters,
    shouldIncludeUppercasedLetters,
    shouldAllowSequence,
    shouldAllowTripleRepeat,
    specialCharacters
  } = passwordOptions;
  const allPossibilities = getAllCharacters({
    shouldIncludeNumbers,
    shouldIncludeLowercasedLetters,
    shouldIncludeUppercasedLetters,
    specialCharacters: specialCharacters.split(''),
  });

  if (allPossibilities.length === 0) {
    return ERROR_MESSAGE;
  }

  const generated: string[] = [];
  for (let i = 0; i < passwordLength; i++) {
    const oneCharacterBack = i > 0 ? generated[i - 1] : '';
    const twoCharactersBack = i > 1 ? generated[i - 2] : '';
    const currentChar = getNextCharacter({
      oneCharacterBack,
      twoCharactersBack,
      shouldAllowSequence,
      shouldAllowTripleRepeat,
      allPossibilities,
    });

    generated.push(currentChar);
  }

  return generated.join('');
};

export const generateReadablePassword = (words: string[], numberOfWords: number) => {
  const password: string[] = [];
  for (let wCount = 0; wCount < numberOfWords; wCount++) {
    password.push(generateRandomContent(words.filter(w => !password.some(i => i === w))));
  }

  return password.join('').replace(/\s+/g, '');
}