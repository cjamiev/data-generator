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
}

export interface IFieldType {
  variableName: string,
  randomType: PredefinedRandomLabel | CustomFieldLabel,
  userOptions: string,
  builtInOptions: string[],
  selectedBuiltInOptions: string,
  dataType: string[],
  selectedDataType: string,
  formType: string[],
  selectedFormType: string
}

export const fieldTypes = [
  {
    variableName: PredefinedRandomColumnName.ID,
    randomType: PredefinedRandomLabel.ID,
    userOptions: '',
    builtInOptions: [''],
    selectedBuiltInOptions: '',
    dataType: ['string'],
    selectedDataType: 'string',
    formType: ['text'],
    selectedFormType: 'text'
  },
  {
    variableName: PredefinedRandomColumnName.FIRST_NAME,
    randomType: PredefinedRandomLabel.FIRST_NAME,
    userOptions: '',
    builtInOptions: [''],
    selectedBuiltInOptions: '',
    dataType: ['string'],
    selectedDataType: 'string',
    formType: ['text'],
    selectedFormType: 'text'
  },
  {
    variableName: PredefinedRandomColumnName.LAST_NAME,
    randomType: PredefinedRandomLabel.LAST_NAME,
    userOptions: '',
    builtInOptions: [''],
    selectedBuiltInOptions: '',
    dataType: ['string'],
    selectedDataType: 'string',
    formType: ['text'],
    selectedFormType: 'text'
  },
  {
    variableName: PredefinedRandomColumnName.EMAIL,
    randomType: PredefinedRandomLabel.EMAIL,
    userOptions: '',
    builtInOptions: ['Name', 'Words'],
    selectedBuiltInOptions: 'Words',
    dataType: ['string'],
    selectedDataType: 'string',
    formType: ['text'],
    selectedFormType: 'text'
  },
  {
    variableName: PredefinedRandomColumnName.ZIP_CODE,
    randomType: PredefinedRandomLabel.ZIP_CODE,
    userOptions: '',
    builtInOptions: ['#####', '#########', '#####-####'],
    selectedBuiltInOptions: '#####',
    dataType: ['string', 'number'],
    selectedDataType: 'string',
    formType: ['text'],
    selectedFormType: 'text'
  },
  {
    variableName: PredefinedRandomColumnName.PHONE_NUMBER,
    randomType: PredefinedRandomLabel.PHONE_NUMBER,
    userOptions: '',
    builtInOptions: ['###-###-####', '##########'],
    selectedBuiltInOptions: '###-###-####',
    dataType: ['string', 'number'],
    selectedDataType: 'string',
    formType: ['text'],
    selectedFormType: 'text'
  },
  {
    variableName: PredefinedRandomColumnName.SSN,
    randomType: PredefinedRandomLabel.SSN,
    userOptions: '',
    builtInOptions: ['###-##-####', '#########'],
    selectedBuiltInOptions: '###-##-####',
    dataType: ['string', 'number'],
    selectedDataType: 'string',
    formType: ['text'],
    selectedFormType: 'text'
  },
  {
    variableName: PredefinedRandomColumnName.CREDIT_CARD,
    randomType: PredefinedRandomLabel.CREDIT_CARD,
    userOptions: '',
    builtInOptions: ['####-####-####-####', '################'],
    selectedBuiltInOptions: '####-####-####-####',
    dataType: ['string', 'number'],
    selectedDataType: 'string',
    formType: ['text'],
    selectedFormType: 'text'
  },
  {
    variableName: PredefinedRandomColumnName.UUID,
    randomType: PredefinedRandomLabel.UUID,
    userOptions: '',
    builtInOptions: ['&&&&&&&&-&&&&-&&&&-&&&&-&&&&&&&&&&&&', '&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&'],
    selectedBuiltInOptions: '&&&&&&&&-&&&&-&&&&-&&&&-&&&&&&&&&&&&',
    dataType: ['string'],
    selectedDataType: 'string',
    formType: ['text'],
    selectedFormType: 'text'
  },
  {
    variableName: PredefinedRandomColumnName.CITY,
    randomType: PredefinedRandomLabel.CITY,
    userOptions: '',
    builtInOptions: [''],
    selectedBuiltInOptions: '',
    dataType: ['string'],
    selectedDataType: 'string',
    formType: ['text'],
    selectedFormType: 'text'
  },
  {
    variableName: PredefinedRandomColumnName.STATE,
    randomType: PredefinedRandomLabel.STATE,
    userOptions: '',
    builtInOptions: [''],
    selectedBuiltInOptions: '',
    dataType: ['string'],
    selectedDataType: 'string',
    formType: ['text'],
    selectedFormType: 'text'
  },
  {
    variableName: PredefinedRandomColumnName.STREET,
    randomType: PredefinedRandomLabel.STREET,
    userOptions: '',
    builtInOptions: ['Street Only', 'Full Address'],
    selectedBuiltInOptions: 'Street Only',
    dataType: ['string'],
    selectedDataType: 'string',
    formType: ['text'],
    selectedFormType: 'text'
  },
  {
    variableName: PredefinedRandomColumnName.BIRTH_DATE,
    randomType: PredefinedRandomLabel.BIRTH_DATE,
    userOptions: '',
    builtInOptions: ['MM/DD/YYYY', 'MM/DD/YY', 'YYYY/MM/DD', 'MM-DD-YYYY', 'MM-DD-YY', 'YYYY-MM-DD'],
    selectedBuiltInOptions: 'MM/DD/YYYY',
    dataType: ['date', 'string'],
    selectedDataType: 'date',
    formType: ['text', 'date'],
    selectedFormType: 'text'
  },
  {
    variableName: CustomFieldLabel.DATE,
    randomType: CustomFieldLabel.DATE,
    userOptions: '',
    builtInOptions: ['MM/DD/YYYY', 'MM/DD/YY', 'YYYY/MM/DD', 'MM-DD-YYYY', 'MM-DD-YY', 'YYYY-MM-DD'],
    selectedBuiltInOptions: 'MM/DD/YYYY',
    dataType: ['date', 'string'],
    selectedDataType: 'date',
    formType: ['text', 'date'],
    selectedFormType: 'text'
  },
  {
    variableName: CustomFieldLabel.BOOLEAN,
    randomType: CustomFieldLabel.BOOLEAN,
    userOptions: 'On, Off',
    builtInOptions: [''],
    selectedBuiltInOptions: '',
    dataType: ['boolean', 'string'],
    selectedDataType: 'boolean',
    formType: ['radio'],
    selectedFormType: 'switch'
  },
  {
    variableName: CustomFieldLabel.CUSTOM_STATE,
    randomType: CustomFieldLabel.CUSTOM_STATE,
    userOptions: '',
    builtInOptions: [''],
    selectedBuiltInOptions: '',
    dataType: ['string'],
    selectedDataType: 'string',
    formType: ['checkbox', 'radio', 'select'],
    selectedFormType: 'checkbox'
  },
  {
    variableName: CustomFieldLabel.CUSTOM_STRING,
    randomType: CustomFieldLabel.CUSTOM_STRING,
    userOptions: '',
    builtInOptions: [''],
    selectedBuiltInOptions: '',
    dataType: ['string'],
    selectedDataType: 'string',
    formType: ['text'],
    selectedFormType: 'text'
  }
];
