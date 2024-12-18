const letters = 'abcdefghijklmnopqrstuvwxyz';

const START_ZERO = 0;
const ADD_ONE = 1;
const SECOND_INDEX = 2;

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

const generateBoolean = (): boolean => {
    const randomTwoState = getRandomInt(1);

    return randomTwoState < 1;
};

const generateRange = (min: number, max: number) => {
    return getRandomInt(max - min) + min;
};

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

const generateDate = (yearsFromThisYear: number, format: string) => {
    const randomYear = getRandomInt(yearsFromThisYear) + ADD_ONE;
    const randomMonth = getRandomInt(NUMBER_OF_MONTHS) + ADD_ONE;
    const randomDay = getRandomInt(getNumberofDays(randomMonth)) + ADD_ONE;

    const separator = format.includes('-') ? '-' : '/';
    const isMonthFirst = format.slice(START_ZERO, SECOND_INDEX) === 'MM';

    const year = today.getFullYear() - randomYear;
    const month = randomMonth > SINGLE_DIGIT ? randomMonth : '0' + randomMonth;
    const day = randomDay > SINGLE_DIGIT ? randomDay : '0' + randomDay;

    const randomDate = isMonthFirst
        ? `${month}${separator}${day}${separator}${year}`
        : `${year}${separator}${month}${separator}${day}`;

    return randomDate;
};

const generateCustomState = (states: string[]) => {
    const randomValue = getRandomInt(states.length);

    return states[randomValue];
};

export {
    getRandomInt,
    getRandomDigit,
    getRandomLetter,
    getRandomAlphanumberic,
    generateBoolean,
    generateDate,
    generateCustomState,
    generateRange,
    customStringGenerator
};
