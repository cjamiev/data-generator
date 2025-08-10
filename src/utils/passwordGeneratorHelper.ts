import { Word } from "../models/storage";
import { IPasswordOptions, IPasswordReadableOptions } from "../types/password";
import { generateRandomContent } from "./randomContentHelper";
import { getRandomInt } from "./randomHelper";

const LOWERCASED_LETTERS = 'abcdefghijklmnopqrstuvwxyz';
const UPPERCASED_LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const NUMBERS = '0123456789';
export const ERROR_MESSAGE = 'NOT ENOUGH CHARACTERS TO WORK WITH!';
export const ERROR_MESSAGE2 = 'NOT ENOUGH WORD TYPES FOR THE SELECTED NUMBER OF WORDS';

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

const getDistinctIndicies = (typeSize: number, wordSize: number) => {
  const foundIndicies: number[] = [];
  let loopCounter = 0;
  while (foundIndicies.length < wordSize && loopCounter < 100) {
    const newIndex = getRandomInt(typeSize);
    if (!foundIndicies.some(i => i === newIndex)) {
      foundIndicies.push(newIndex);
    }
    loopCounter++;
  }

  if (loopCounter > 99) {
    console.error('Max Loop Counter Hit');
  }

  return foundIndicies;
}

const getWordSegment = (words: Word[], wordTypes: string[], numberOfWords: number) => {
  const indicies = getDistinctIndicies(wordTypes.length, numberOfWords);
  const passwordsegments: string[] = [];
  for (let wCount = 0; wCount < numberOfWords; wCount++) {
    const currentType = wordTypes[indicies[wCount]];
    const wordsegments = generateRandomContent(words.filter(w => w.type === currentType).map(w => w.id));
    passwordsegments.push(wordsegments);
  }
  return passwordsegments.join('').replace(/\s+/g, '');
}

const getDateSegment = (shouldIncludeDate: boolean) => {
  if (!shouldIncludeDate) {
    return '';
  }
  const now = new Date();
  const month = now.getMonth() + 1;
  const fullyear = now.getFullYear().toString();
  const monthsegment = month < 10 ? '0' + month : month.toString();
  const yearsegment = fullyear.substring(2, 4);

  return monthsegment + yearsegment;
}

export const generateReadablePassword = (words: Word[], wordTypes: string[], passwordReadableOptions: IPasswordReadableOptions) => {
  if (passwordReadableOptions.numberOfWords > wordTypes.length) {
    return ERROR_MESSAGE2;
  }

  const symbolsegment = passwordReadableOptions.shouldIncludeSymbol ? '!' : '';
  const password = getWordSegment(words, wordTypes, passwordReadableOptions.numberOfWords)
    + symbolsegment
    + getDateSegment(passwordReadableOptions.shouldIncludeDate);

  return password;
}