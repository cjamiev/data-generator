import { generateRange, getRandomInt } from './randomNumberHelper';

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

const getNumberofDays = (monthIndex: number) => {
  if (
    monthIndex === INDEX_FOR_APRIL ||
    monthIndex === INDEX_FOR_JUNE ||
    monthIndex === INDEX_FOR_SEPTEMBER ||
    monthIndex === INDEX_FOR_NOVEMBER
  ) {
    return MAX_DAYS_OF_SOME_MONTHS;
  } else if (monthIndex === INDEX_FOR_FEBRUARY) {
    return MAX_DAYS_OF_FEBRUARY;
  } else {
    return MAX_DAYS_OF_MOST_MONTHS;
  }
};

const generateDate = (minYear: number, maxYear: number, format: string) => {
  const randomYear = generateRange(minYear, maxYear);
  const randomMonth = getRandomInt(NUMBER_OF_MONTHS) + ADD_ONE;
  const randomDay = getRandomInt(getNumberofDays(randomMonth)) + ADD_ONE;

  const separator = format.includes('-') ? '-' : '/';
  const isMonthFirst = format.slice(START_ZERO, SECOND_INDEX) === 'MM';

  const month = randomMonth > SINGLE_DIGIT ? randomMonth : '0' + randomMonth;
  const day = randomDay > SINGLE_DIGIT ? randomDay : '0' + randomDay;

  const randomDate = isMonthFirst
    ? `${month}${separator}${day}${separator}${randomYear}`
    : `${randomYear}${separator}${month}${separator}${day}`;

  return randomDate;
};

const generateTime = () => {
  const leadingHourDigit = getRandomInt(3); // 0 - 2
  const maxSecondDigit = leadingHourDigit === 2 ? 4 : 10; // 0-3, or 0-9
  const secondaryHourDigit = getRandomInt(maxSecondDigit);
  const leadingMinDigit = getRandomInt(6);
  const secondaryMinDigit = getRandomInt(10);
  const leadingSecondDigit = getRandomInt(6);
  const secondarySecondDigit = getRandomInt(10);

  return `${leadingHourDigit}${secondaryHourDigit}:${leadingMinDigit}${secondaryMinDigit}:${leadingSecondDigit}${secondarySecondDigit}`;
}

const convertTo12HourClock = (timeString: string) => {
  const hour = Number(timeString.slice(0, 2));
  const meridiem = hour > 11 ? 'pm' : 'am';
  const modifiedHour = hour > 12 ? hour % 12 : hour === 0 ? '12' : hour;

  return String(modifiedHour) + timeString.slice(2) + meridiem;
}

export {
  generateDate,
  generateTime,
  convertTo12HourClock
};
