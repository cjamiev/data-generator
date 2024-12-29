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
  customStringGenerator
} from '../../utils/randomHelper';
import { IFieldType, RandomType } from '../../atoms/DisplayRandomFields/types';

const THREE_YEARS_IN_MONTHS = 36;

const getPIGeneratedValue = (col: IFieldType, index: number) => {
  if (col.randomType === RandomType.FIRST_NAME) {
    const firstname = generateFirstName();

    return firstname;
  }
  if (col.randomType === RandomType.LAST_NAME) {
    const lastname = generateLastName();

    return lastname;
  }
  if (col.randomType === RandomType.SSN) {
    const ssn = customStringGenerator(col.selectedBuiltInOptions, index);

    return ssn;
  }
  if (col.randomType === RandomType.CREDIT_CARD) {
    const ccnumber = customStringGenerator(col.selectedBuiltInOptions, index);

    return ccnumber;
  }
  if (col.randomType === RandomType.PHONE_NUMBER) {
    const phonenumber = customStringGenerator(col.selectedBuiltInOptions, index);

    return phonenumber;
  }
  if (col.randomType === RandomType.EMAIL) {
    const email = generateEmailAddress();
    return email;
  } else {
    return '';
  }
};

const getAddressGeneratedValue = (col: IFieldType, index: number) => {
  if (col.randomType === RandomType.STREET) {
    const street = generateStreetName();

    return street;
  }
  if (col.randomType === RandomType.CITY) {
    const city = generateCity();

    return city;
  }
  if (col.randomType === RandomType.STATE) {
    const state = generateState();

    return state;
  }
  if (col.randomType === RandomType.ZIP_CODE) {
    const zipCode = customStringGenerator(col.selectedBuiltInOptions, index);

    return zipCode;
  } else {
    return '';
  }
};

const getOtherGeneratedValue = (col: IFieldType, index: number) => {
  if (col.randomType === RandomType.UUID) {
    const uuid = customStringGenerator(col.selectedBuiltInOptions, index);

    return uuid;
  }
  if (col.randomType === RandomType.DATE) {
    const randomDate = generateDate(THREE_YEARS_IN_MONTHS, col.selectedBuiltInOptions);

    return randomDate;
  }

  if (col.randomType === RandomType.BOOLEAN) {
    const bool = generateBoolean();

    return bool ? 'true' : 'false';
  }
  if (col.randomType === RandomType.CUSTOM_STATE) {
    const states = col.userOptions.includes(',') ? col.userOptions.split(',') : col.userOptions.split('');
    const customStates = generateCustomState(states);

    return customStates;
  }
  if (col.randomType === RandomType.CUSTOM_STRING) {
    const customString = customStringGenerator(col.userOptions, index);

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
