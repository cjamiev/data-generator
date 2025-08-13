import { FORMULA_TYPE, IFormulaMap } from '../../types/formula';

const letters = 'abcdefghijklmnopqrstuvwxyz';

const START_ZERO = 0;
const SECOND_INDEX = 2;

const ADD_ONE = 1;
const SINGLE_DIGIT = 9;

const NUMBER_OF_MONTHS = 12;
const MAX_DAYS_OF_MOST_MONTHS = 31;
const MAX_DAYS_OF_SOME_MONTHS = 30;
const MAX_DAYS_OF_FEBRUARY = 28;
const INDEX_FOR_FEBRUARY = 2;
const INDEX_FOR_APRIL = 4;
const INDEX_FOR_JUNE = 6;
const INDEX_FOR_SEPTEMBER = 9;
const INDEX_FOR_NOVEMBER = 11;
const today = new Date();

// Helper for weighted range only
const getDigitRange = (digitLength: number) => {
  const min = digitLength === 1 ? '0' : '1' + Array.from({ length: digitLength - 1 }, () => '0').join('');
  const max = Array.from({ length: digitLength }, () => '9').join('');

  return { min: Number(min), max: Number(max) }
}

const getRandomInt = (max: number) => {
  return Math.floor(Math.random() * max);
};

const getRandomDigit = (): number => {
  return getRandomInt(10);
};

const getRandomLetter = (): string => {
  const letterIndex = getRandomInt(26);

  return letters[letterIndex];
};

const getRandomAlphanumberic = (): string | number => {
  const randomIndex = getRandomInt(36);

  return randomIndex < 10 ? randomIndex : letters.charAt(getRandomInt(randomIndex - 10));
};

const generateBoolean = (booleanWeight: number): boolean => {
  const weight = isNaN(booleanWeight) ? 50 : booleanWeight;
  const randomTwoState = getRandomInt(100);

  return weight > randomTwoState;
};

const generateRange = (min: number, max: number) => {
  return getRandomInt(max - min + 1) + min;
};

const generateWeightedRangeValue = (min: number, max: number) => {
  const minDigitLength = String(min).length;
  const maxDigitLength = String(max).length;

  if (maxDigitLength === minDigitLength) {
    return generateRange(min, max);
  }

  const digitLength = generateRange(minDigitLength, maxDigitLength);
  const range = getDigitRange(digitLength)

  if (digitLength > minDigitLength && digitLength < maxDigitLength) {
    return generateRange(range.min, range.max);
  }

  if (digitLength === minDigitLength) {
    return generateRange(min, range.max);
  }

  if (digitLength === maxDigitLength) {
    return generateRange(range.min, max);
  }

  // should never but resolves typescript
  return 0;
}

// Delete this one
const customStringGenerator = (input: string, index: number) => {
  const content = input.split('');
  const result = content.map((item) => {
    if (item === '#') {
      return getRandomDigit();
    }
    if (item === '@') {
      return getRandomLetter();
    }
    if (item === '&') {
      return getRandomAlphanumberic();
    }
    if (item === ':') {
      const now = new Date();
      return now.getMonth() + ADD_ONE + '-' + now.getDate() + '-' + now.getFullYear();
    }
    if (item === '^') {
      return index + ADD_ONE;
    } else {
      return item;
    }
  });

  return result.join('');
};

const getNumberofDays = (numberOfMonth: number) => {
  if (
    numberOfMonth === INDEX_FOR_APRIL ||
    numberOfMonth === INDEX_FOR_JUNE ||
    numberOfMonth === INDEX_FOR_SEPTEMBER ||
    numberOfMonth === INDEX_FOR_NOVEMBER
  ) {
    return MAX_DAYS_OF_SOME_MONTHS;
  } else if (numberOfMonth === INDEX_FOR_FEBRUARY) {
    return MAX_DAYS_OF_FEBRUARY;
  } else {
    return MAX_DAYS_OF_MOST_MONTHS;
  }
};

const generateDate = (isFuture: boolean, yearDistance: number, format: string) => {
  const randomYear = getRandomInt(yearDistance) + ADD_ONE;
  const randomMonth = getRandomInt(NUMBER_OF_MONTHS) + ADD_ONE;
  const randomDay = getRandomInt(getNumberofDays(randomMonth)) + ADD_ONE;

  const separator = format.includes('-') ? '-' : '/';
  const isMonthFirst = format.slice(START_ZERO, SECOND_INDEX) === 'MM';

  const year = isFuture ? today.getFullYear() + randomYear : today.getFullYear() - randomYear;
  const month = randomMonth > SINGLE_DIGIT ? randomMonth : '0' + randomMonth;
  const day = randomDay > SINGLE_DIGIT ? randomDay : '0' + randomDay;

  const randomDate = isMonthFirst
    ? `${month}${separator}${day}${separator}${year}`
    : `${year}${separator}${month}${separator}${day}`;

  return randomDate;
};

const generateTime = () => {
  const leadingHourDigit = getRandomInt(3);
  const maxSecondDigit = leadingHourDigit === 2 ? 4 : 9;
  const secondaryHourDigit = getRandomInt(maxSecondDigit);
  const leadingMinDigit = getRandomInt(7);
  const secondaryMinDigit = getRandomInt(9);
  const leadingSecondDigit = getRandomInt(7);
  const secondarySecondDigit = getRandomInt(9);

  return `${leadingHourDigit}${secondaryHourDigit}:${leadingMinDigit}${secondaryMinDigit}:${leadingSecondDigit}${secondarySecondDigit}`;
}

const generateCustomState = (states: string[]) => {
  const randomValue = getRandomInt(states.length);

  return states[randomValue];
};

const getCorrectFunction = (type: FORMULA_TYPE) => {
  if (type === FORMULA_TYPE.LETTER) {
    return getRandomLetter;
  }
  if (type === FORMULA_TYPE.DIGIT) {
    return getRandomDigit;
  }
  else {
    return getRandomAlphanumberic;
  }
}

const getMultipleRandomValues = (type: FORMULA_TYPE, size: number) => {
  const func = getCorrectFunction(type);
  const section = [];
  for (let i = 0; i < size; i++) {
    section.push(func())
  }

  return section;
}

const formulaMapper = (input: IFormulaMap[], index: number) => {
  return input.map((field) => {
    if (field.type === FORMULA_TYPE.FIXED) {
      return field.value;
    }
    if (field.type === FORMULA_TYPE.INCREMENT) {
      return index + Number(field.value);
    }
    if (field.type === FORMULA_TYPE.DATE) {
      return new Date().toISOString().slice(0, 19);
    }
    if (field.type === FORMULA_TYPE.SPACE) {
      return ' ';
    }
    else {
      const values = getMultipleRandomValues(field.type, Number(field.value));

      return values.join('');
    }
  }).join('');
}

export {
  getRandomInt,
  getRandomDigit,
  getRandomLetter,
  getRandomAlphanumberic,
  generateBoolean,
  generateDate,
  generateTime,
  generateCustomState,
  generateRange,
  generateWeightedRangeValue,
  customStringGenerator,
  formulaMapper
};
