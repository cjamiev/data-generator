import { Word } from "../../models/storage";
import { IPasswordReadableOptions } from "../../types/password";
import { generateRandomContent } from "../random/randomContentHelper";
import { getRandomInt } from "../random/randomHelper";
import { ERROR_MESSAGE2 } from "./randomPasswordHelper";

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