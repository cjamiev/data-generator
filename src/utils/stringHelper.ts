const ZERO = 0;
const ONE = 1;

const lowerCaseFirstLetter = (text: string) => {
  return text.charAt(ZERO).toLowerCase() + text.slice(ONE);
};

const capitalizeFirstLetter = (text: string) => {
  return text.charAt(ZERO).toUpperCase() + text.slice(ONE);
};

const capitalizeEachWord = (text: string) => {
  return text.toLocaleLowerCase().split(' ').map(word => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }).join(' ');
}

const formatMoney = (amount: number) => {
  const amountAsString = String(amount).split('')
  const length = amountAsString.length;

  if (length < 4) {
    return `$${amount}`
  }

  const amountAry = [];
  for (let i = 0; i < length; i++) {
    if (i !== 0 && i % 3 === 0) {
      amountAry.push(amountAsString[length - i - 1] + ',');
    }
    else {
      amountAry.push(amountAsString[length - i - 1]);
    }
  }

  return `$${amountAry.reverse().join('')}`;
}

export {
  lowerCaseFirstLetter,
  capitalizeFirstLetter,
  capitalizeEachWord,
  formatMoney
};
