import { ChangeEvent, useEffect, useState } from 'react';
import { ICodeProp } from '../../types/codeField';

interface ICodeFieldInput {
  codeField: ICodeProp;
  index: number;
  onHandleColumnUpdateChange: (updatedLabel: string, updatedName: string, index: number) => void;
}

export const CodeFieldInput = ({ codeField, index, onHandleColumnUpdateChange }: ICodeFieldInput) => {
  const [label, setLabel] = useState<string>('');
  const [variableName, setVariableName] = useState<string>('');

  useEffect(() => {
    if (codeField.label) {
      setLabel(codeField.label);
    }
  }, [codeField.label]);

  useEffect(() => {
    if (codeField.variableName) {
      setVariableName(codeField.variableName);
    }
  }, [codeField.variableName]);

  const onHandleDisplayLabelChange = (event: ChangeEvent<HTMLInputElement>) => {
    setLabel(event.target.value);
  };

  const onHandleVariableNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setVariableName(event.target.value);
  };

  const submitLabel = () => {
    if (label) {
      onHandleColumnUpdateChange(label, variableName, index);
    } else {
      setLabel(codeField.label);
    }
  };

  const submitName = () => {
    if (variableName) {
      onHandleColumnUpdateChange(label, variableName, index);
    } else {
      setVariableName(codeField.variableName);
    }
  };

  return (
    <>
      <input
        className="w-32 rounded border-2 border-gray-500 pl-4"
        type="text"
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          onHandleDisplayLabelChange(event);
        }}
        onBlur={submitLabel}
        value={label}
      />
      <input
        className="w-32 rounded border-2 border-gray-500 pl-4"
        type="text"
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          onHandleVariableNameChange(event);
        }}
        onBlur={submitName}
        value={variableName}
      />
    </>
  );
};
