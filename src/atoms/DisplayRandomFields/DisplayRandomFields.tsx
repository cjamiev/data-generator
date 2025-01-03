import React, { ChangeEvent, useEffect, useState } from 'react';
import { IFieldType } from '../../types/randomField';

interface IDisplayRandomFields {
  columns: IFieldType[];
  onHandleRemoveField: (selectedIndex: number) => void;
  onHandleColumnNameChange: (updatedName: string, selectedIndex: number) => void;
  onHandleColumnOptionsChange: (event: ChangeEvent<HTMLInputElement>, selectedIndex: number) => void;
  onHandleBuiltInOptionsChange: (event: ChangeEvent<HTMLSelectElement>, selectedIndex: number) => void;
  onHandleDataTypeChange: (event: ChangeEvent<HTMLSelectElement>, selectedIndex: number) => void;
  onHandleFormTypeChange: (event: ChangeEvent<HTMLSelectElement>, selectedIndex: number) => void;
}

interface IFieldInput {
  name: string;
  index: number;
  onHandleColumnNameChange: (updatedName: string, index: number) => void;
}

const FieldInput = ({ name, index, onHandleColumnNameChange }: IFieldInput) => {
  const [variableName, setVariableName] = useState<string>('');

  useEffect(() => {
    if (name) {
      setVariableName(name);
    }
  }, [name]);

  const onHandleVariableNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setVariableName(event.target.value);
  };

  const submit = () => {
    if (variableName) {
      onHandleColumnNameChange(variableName, index);
    } else {
      setVariableName(name);
    }
  };

  return (
    <input
      className="rounded border-2 border-gray-500 pl-4"
      type="text"
      onChange={(event: ChangeEvent<HTMLInputElement>) => {
        onHandleVariableNameChange(event);
      }}
      onBlur={submit}
      value={variableName}
    />
  );
};

export const DisplayRandomFields = ({
  columns,
  onHandleRemoveField,
  onHandleColumnNameChange,
}: IDisplayRandomFields) => {
  return (
    <div>
      <div className="mb-2 flex flex-row gap-x-2">
        <div className="w-48 text-lg">Column Name</div>
        <div className="ml-2 w-52 text-lg">Type</div>
        <div className="w-fit text-lg">Options</div>
      </div>
      {columns.map((item: IFieldType, index: number) => {
        return (
          <div key={item.variableName} className="mb-2 flex flex-row gap-2">
            <FieldInput name={item.variableName} onHandleColumnNameChange={onHandleColumnNameChange} index={index} />
            <span className="w-52 rounded border-2 border-dashed border-sky-500 pl-4 pt-3">{item.randomType}</span>
            <button
              className="w-fit"
              onClick={() => {
                onHandleRemoveField(index);
              }}>
              X
            </button>
          </div>
        );
      })}
    </div>
  );
};
