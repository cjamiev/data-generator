import { FORMULA_TYPE, IFormulaMap } from '../../types/formula';
import { getRandomAlphanumberic, getRandomLetter } from './randomCharacterHelper';
import { getRandomDigit, getRandomInt } from './randomNumberHelper';

const ADD_ONE = 1;

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
  generateCustomState,
  customStringGenerator,
  formulaMapper
};
