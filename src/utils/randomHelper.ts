const letters = 'abcdefghijklmnopqrstuvwxyz';

export const getRandomInt = (max: number): number => {
    return Math.floor(Math.random() * max);
};

export const getRandomDigit = (): number => {
    return getRandomInt(10);
};

export const getRandomLetter = (): string => {
    const letterIndex = getRandomInt(26);

    return letters[letterIndex];
};

export const getRandomAlphanumberic = (): string | number => {
    const randomIndex = getRandomInt(36);

    return randomIndex < 10 ? randomIndex : letters.charAt(getRandomInt(randomIndex - 10));
};

export const generateBoolean = (): boolean => {
    const randomValue = getRandomInt(1);

    return randomValue < 1;
};