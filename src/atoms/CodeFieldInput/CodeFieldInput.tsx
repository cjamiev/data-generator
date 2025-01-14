import { ChangeEvent, useEffect, useState } from "react";

interface ICodeFieldInput {
  displayLabel: string;
  name: string;
  index: number;
  onHandleColumnUpdateChange: (updatedLabel: string, updatedName: string, index: number) => void;
}

export const CodeFieldInput = ({ displayLabel, name, index, onHandleColumnUpdateChange }: ICodeFieldInput) => {
  const [label, setLabel] = useState<string>('');
  const [variableName, setVariableName] = useState<string>('');

  useEffect(() => {
    if (displayLabel) {
      setLabel(displayLabel);
    }
  }, [displayLabel]);

  useEffect(() => {
    if (name) {
      setVariableName(name);
    }
  }, [name]);

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
      setLabel(label);
    }
  };

  const submitName = () => {
    if (variableName) {
      onHandleColumnUpdateChange(label, variableName, index);
    } else {
      setVariableName(name);
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