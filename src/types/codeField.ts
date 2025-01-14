export enum CodeFieldLabel {
  BUTTON = 'Button',
  TEXT = 'Text',
  RADIO = 'Radio',
  CHECKBOX = 'Checkbox'
};

export interface ISubcodeProp {
  label: string;
  variableName: string;
}

export interface ICodeProp {
  type: CodeFieldLabel,
  label: string;
  variableName: string;
  subcodefield: ISubcodeProp[];
};

export const CodeFieldValues = Object.values(CodeFieldLabel);