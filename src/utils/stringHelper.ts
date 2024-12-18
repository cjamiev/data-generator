const ZERO = 0;
const ONE = 1;

const lowerCaseFirstLetter = (text: string) => {
  return text.charAt(ZERO).toLowerCase() + text.slice(ONE);
};

const capitalizeFirstLetter = (text: string) => {
  return text.charAt(ZERO).toUpperCase() + text.slice(ONE);
};

export {
  lowerCaseFirstLetter,
  capitalizeFirstLetter
};
