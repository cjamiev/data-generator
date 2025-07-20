import { ChangeEvent, useEffect, useState } from 'react';
import { IFieldType } from '../../types/randomField';

interface IDisplayRandomFields {
  columns: IFieldType[];
  onHandleRemoveField: (selectedIndex: number) => void;
  onHandleColumnNameChange: (updatedName: string, selectedIndex: number) => void;
  onMoveUp: (index: number) => void;
  onMoveDown: (index: number) => void;
}

interface IFieldInput {
  name: string;
  index: number;
  onHandleColumnNameChange: (updatedName: string, index: number) => void;
}

const MOVE_UP = 'U';
const MOVE_DOWN = 'D';

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
  onMoveUp,
  onMoveDown,
}: IDisplayRandomFields) => {
  return (
    <div>
      <div className="mb-2 flex flex-row gap-x-2">
        <div className="w-20 text-lg">Reorder</div>
        <div className="w-52 text-lg">Column Name</div>
        <div className="w-52 text-lg">Type</div>
        <div className="w-fit text-lg">Options</div>
      </div>
      {columns.map((item: IFieldType, index: number) => {
        const isFirst = index === 0;
        const isLast = index === columns.length - 1;

        return (
          <div key={item.variableName} className="mb-2 flex flex-row gap-2">
            <div className="w-18 flex gap-2 font-sans">
              {!isFirst ? (
                <button className="w-fit" onClick={() => onMoveUp(index)}>
                  {MOVE_UP}
                </button>
              ) : (
                <div className="w-8 rounded bg-gray-500 text-center"> </div>
              )}
              {!isLast ? (
                <button className="w-fit" onClick={() => onMoveDown(index)}>
                  {MOVE_DOWN}
                </button>
              ) : (
                <div className="w-8 rounded bg-gray-500 text-center"> </div>
              )}
            </div>
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
