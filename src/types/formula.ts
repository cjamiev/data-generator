export enum FORMULA_TYPE {
  ALPHA = 'ALPHA',
  DIGIT = 'DIGIT',
  LETTER = 'LETTER',
  DATE = 'DATE',
  INCREMENT = 'INCREMENT',
  FIXED = 'FIXED',
  SPACE = 'SPACE'
}

export interface IFormulaMap {
  type: FORMULA_TYPE;
  value: string;
}