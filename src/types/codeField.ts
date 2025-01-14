export enum CodeFieldLabel {
  BUTTON = 'Button',
  TEXT = 'Text',
  RADIO = 'Radio',
  CHECKBOX = 'Checkbox'
};

export interface ICodeProp {
  type: CodeFieldLabel,
  label: string;
  variableName: string;
};

export const CodeFieldValues = Object.values(CodeFieldLabel);