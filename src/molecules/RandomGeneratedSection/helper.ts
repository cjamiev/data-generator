import {
  generateFirstName,
  generateLastName,
  generateEmailAddress,
  generateStreetName,
  generateCity,
  generateState,
} from '../../utils/randomContentHelper';
import {
  generateDate,
  generateBoolean,
  generateCustomState,
  customStringGenerator,
  generateTime,
  generateWeightedRangeValue,
  generateRange,
  formulaMapper
} from '../../utils/randomHelper';
import { IFieldType, PredefinedRandomLabel, CustomFieldLabel } from '../../types/randomField';
import { formatMoney } from '../../utils/stringHelper';
import { IFormulaMap } from '../../types/formula';

const EIGHTY_YEARS_AGO = 80;

const getPIGeneratedValue = (col: IFieldType, index: number) => {
  if (col.randomType === PredefinedRandomLabel.FIRST_NAME) {
    const firstname = generateFirstName();

    return firstname;
  }
  if (col.randomType === PredefinedRandomLabel.LAST_NAME) {
    const lastname = generateLastName();

    return lastname;
  }
  if (col.randomType === PredefinedRandomLabel.SSN) {
    const ssn = customStringGenerator(col.options, index);

    return ssn;
  }
  if (col.randomType === PredefinedRandomLabel.CREDIT_CARD) {
    const ccnumber = customStringGenerator(col.options, index);

    return ccnumber;
  }
  if (col.randomType === PredefinedRandomLabel.PHONE_NUMBER) {
    const phonenumber = customStringGenerator(col.options, index);

    return phonenumber;
  }
  if (col.randomType === PredefinedRandomLabel.EMAIL) {
    const email = generateEmailAddress();
    return email;
  }
  if (col.randomType === PredefinedRandomLabel.BIRTH_DATE) {
    const randomDate = generateDate(false, EIGHTY_YEARS_AGO, col.options);

    return randomDate;
  } else {
    return '';
  }
};

const getAddressGeneratedValue = (col: IFieldType, index: number) => {
  if (col.randomType === PredefinedRandomLabel.STREET) {
    const street = generateStreetName();

    return street;
  }
  if (col.randomType === PredefinedRandomLabel.CITY) {
    const city = generateCity();

    return city;
  }
  if (col.randomType === PredefinedRandomLabel.STATE) {
    const state = generateState();

    return state;
  }
  if (col.randomType === PredefinedRandomLabel.ZIP_CODE) {
    const zipCode = customStringGenerator(col.options, index);

    return zipCode;
  } else {
    return '';
  }
};

const getOtherGeneratedValue = (col: IFieldType, index: number) => {
  if (col.randomType === PredefinedRandomLabel.ID) {
    const id = customStringGenerator('^', index);

    return id;
  }
  if (col.randomType === PredefinedRandomLabel.UUID) {
    const uuid = customStringGenerator(col.options, index);

    return uuid;
  }
  if (col.randomType === CustomFieldLabel.DATE) {
    const [dateCount, futureFlag, format] = col.options.split(',');
    const isFuture = futureFlag === 'true';
    const randomDate = generateDate(isFuture, Number(dateCount), format);
    const randomTime = format.includes('HH:MM:SS') ? generateTime() : '';

    return randomDate + ' ' + randomTime;
  }
  if (col.randomType === CustomFieldLabel.RANGE) {
    const [minAmount, maxAmount, weightedFlag, moneyFlag] = col.options.split(',');
    const isWeightedRange = weightedFlag === 'true';
    const isMoneyFormat = moneyFlag === 'true';
    const rangeValue = isWeightedRange
      ? generateWeightedRangeValue(Number(minAmount), Number(maxAmount))
      : generateRange(Number(minAmount), Number(maxAmount));
    const formattedRangeValue = isMoneyFormat ? formatMoney(rangeValue) : String(rangeValue);

    return formattedRangeValue;
  }
  if (col.randomType === CustomFieldLabel.BOOLEAN) {
    const bool = generateBoolean(Number(col.options));

    return bool ? 'true' : 'false';
  }
  if (col.randomType === CustomFieldLabel.CUSTOM_STATE) {
    const states = col.options.includes(',') ? col.options.split(',') : col.options.split('');
    const customStates = generateCustomState(states);

    return customStates;
  }
  if (col.randomType === CustomFieldLabel.CUSTOM_STRING) {
    const input = JSON.parse(col.options) as IFormulaMap[];
    const customString = formulaMapper(input, index);

    return customString;
  } else {
    return '';
  }
};

const getCorrectGeneratedValue = (col: IFieldType, index: number) => {
  const piValue = getPIGeneratedValue(col, index);
  if (piValue) {
    return piValue;
  }

  const addressValue = getAddressGeneratedValue(col, index);
  if (addressValue) {
    return addressValue;
  }

  const otherValue = getOtherGeneratedValue(col, index);
  if (otherValue) {
    return otherValue;
  } else {
    return 'UNKOWN TYPE';
  }
};

export { getCorrectGeneratedValue };
