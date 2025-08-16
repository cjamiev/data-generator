export const getRandomInt = (max: number) => {
  return Math.floor(Math.random() * max);
};

export const generateBoolean = (booleanWeight?: number): boolean => {
  const weight = booleanWeight ? booleanWeight : 50;
  const randomTwoState = getRandomInt(100);

  return weight > randomTwoState;
};

export const getRandomDigit = (): number => {
  return getRandomInt(10);
};

export const generateRange = (min: number, max: number) => {
  return getRandomInt(max - min + 1) + min;
};

const getDigitRange = (digitLength: number) => {
  const min = digitLength === 1 ? '0' : '1' + Array.from({ length: digitLength - 1 }, () => '0').join('');
  const max = Array.from({ length: digitLength }, () => '9').join('');

  return { min: Number(min), max: Number(max) }
}

const getAbsoluteMinAndMax = (initialMin: number, initialMax: number) => {
  if (initialMin <= 0 && initialMax <= 0) {
    // Flip min and max if they are both negative
    return { absMin: Math.abs(initialMax), absMax: Math.abs(initialMin), isMinNegative: true, isMaxNegative: true };
  }
  else if (initialMin <= 0 && initialMax > 0) {
    return { absMin: Math.abs(initialMin), absMax: initialMax, isMinNegative: true, isMaxNegative: false };
  } else {
    return { absMin: initialMin, absMax: initialMax, isMinNegative: false, isMaxNegative: false };
  }
}

const getMinAndMaxWithCorrectSign = (initialMin: number, initialMax: number) => {
  const { absMin, absMax, isMinNegative, isMaxNegative } = getAbsoluteMinAndMax(initialMin, initialMax);
  const isMixedSign = isMinNegative && !isMaxNegative;
  if (!isMixedSign) {
    return { min: absMin, max: absMax, isNegative: isMinNegative }
  }

  const minDigitLength = String(absMin).length;
  const maxDigitLength = String(absMax).length;
  const digitLength = generateRange(0, minDigitLength + maxDigitLength - 1);

  if (digitLength > minDigitLength) {
    return { min: 0, max: absMax, isNegative: false }
  } else {
    return { min: 0, max: absMin, isNegative: true }
  }
}

const getRangeValue = (min: number, max: number) => {
  const minDigitLength = String(min).length;
  const maxDigitLength = String(max).length;

  if (maxDigitLength === minDigitLength) {
    return generateRange(min, max);
  }

  const digitLength = generateRange(minDigitLength, maxDigitLength);
  const range = getDigitRange(digitLength);

  if (digitLength > minDigitLength && digitLength < maxDigitLength) {
    return generateRange(range.min, range.max);
  }

  if (digitLength === minDigitLength) {
    return generateRange(min, range.max);
  }

  if (digitLength === maxDigitLength) {
    return generateRange(range.min, max);
  }

  return 0;
}

export const generateWeightedRangeValue = (initialMin: number, initialMax: number) => {
  const { min, max, isNegative } = getMinAndMaxWithCorrectSign(initialMin, initialMax);
  const result = getRangeValue(min, max);

  return isNegative ? -result : result;
}