export enum PredefinedRandomColumnName {
  FIRST_NAME = 'first_name',
  LAST_NAME = 'last_name',
  EMAIL = 'email',
  CITY = 'city',
  STATE = 'state',
  STREET = 'street',
  ZIP_CODE = 'zip_code',
  SSN = 'ssn',
  PHONE_NUMBER = 'phone_number',
  CREDIT_CARD = 'credit_card',
  ID = 'id',
  UUID = 'uuid',
  BIRTH_DATE = 'birth_date',
};

export enum PredefinedRandomLabel {
  FIRST_NAME = 'First Name',
  LAST_NAME = 'Last Name',
  EMAIL = 'Email',
  CITY = 'City',
  STATE = 'State',
  STREET = 'Street',
  ZIP_CODE = 'Zip Code',
  SSN = 'SSN',
  PHONE_NUMBER = 'Phone Number',
  CREDIT_CARD = 'Credit Card',
  ID = 'ID',
  UUID = 'UUID',
  BIRTH_DATE = 'Birth Date',
};

export enum CustomFieldLabel {
  CUSTOM_STRING = 'Custom String',
  CUSTOM_STATE = 'Custom State',
  DATE = 'Date',
  BOOLEAN = 'Boolean',
  RANGE = 'Range'
}

export interface IFieldType {
  variableName: string,
  randomType: PredefinedRandomLabel | CustomFieldLabel,
  options: string,
}

export const fieldTypes = [
  {
    variableName: PredefinedRandomColumnName.ID,
    randomType: PredefinedRandomLabel.ID,
    options: '',
  },
  {
    variableName: PredefinedRandomColumnName.FIRST_NAME,
    randomType: PredefinedRandomLabel.FIRST_NAME,
    options: '',
  },
  {
    variableName: PredefinedRandomColumnName.LAST_NAME,
    randomType: PredefinedRandomLabel.LAST_NAME,
    options: '',
  },
  {
    variableName: PredefinedRandomColumnName.EMAIL,
    randomType: PredefinedRandomLabel.EMAIL,
    options: '',
  },
  {
    variableName: PredefinedRandomColumnName.ZIP_CODE,
    randomType: PredefinedRandomLabel.ZIP_CODE,
    options: '#####',
  },
  {
    variableName: PredefinedRandomColumnName.PHONE_NUMBER,
    randomType: PredefinedRandomLabel.PHONE_NUMBER,
    options: '###-###-####',
  },
  {
    variableName: PredefinedRandomColumnName.SSN,
    randomType: PredefinedRandomLabel.SSN,
    options: '###-##-####',
  },
  {
    variableName: PredefinedRandomColumnName.CREDIT_CARD,
    randomType: PredefinedRandomLabel.CREDIT_CARD,
    options: '####-####-####-####',
  },
  {
    variableName: PredefinedRandomColumnName.UUID,
    randomType: PredefinedRandomLabel.UUID,
    options: '&&&&&&&&-&&&&-&&&&-&&&&-&&&&&&&&&&&&',
  },
  {
    variableName: PredefinedRandomColumnName.CITY,
    randomType: PredefinedRandomLabel.CITY,
    options: '',
  },
  {
    variableName: PredefinedRandomColumnName.STATE,
    randomType: PredefinedRandomLabel.STATE,
    options: '',
  },
  {
    variableName: PredefinedRandomColumnName.STREET,
    randomType: PredefinedRandomLabel.STREET,
    options: '',
  },
  {
    variableName: PredefinedRandomColumnName.BIRTH_DATE,
    randomType: PredefinedRandomLabel.BIRTH_DATE,
    options: 'MM/DD/YYYY',
  },
  {
    variableName: CustomFieldLabel.DATE,
    randomType: CustomFieldLabel.DATE,
    options: '',
  },
  {
    variableName: CustomFieldLabel.RANGE,
    randomType: CustomFieldLabel.RANGE,
    options: '',
  },
  {
    variableName: CustomFieldLabel.BOOLEAN,
    randomType: CustomFieldLabel.BOOLEAN,
    options: 'On, Off',
  },
  {
    variableName: CustomFieldLabel.CUSTOM_STATE,
    randomType: CustomFieldLabel.CUSTOM_STATE,
    options: '',
  },
  {
    variableName: CustomFieldLabel.CUSTOM_STRING,
    randomType: CustomFieldLabel.CUSTOM_STRING,
    options: '',
  }
];
