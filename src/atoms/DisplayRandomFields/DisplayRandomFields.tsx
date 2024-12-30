import React, { ChangeEvent, useState } from 'react';
import { IFieldType } from '../../types/randomField';

interface IDisplayRandomFields {
  columns: IFieldType[];
  onHandleRemoveField: (selectedIndex: number) => void;
  onHandleColumnNameChange: (event: ChangeEvent<HTMLInputElement>, selectedIndex: number) => void;
  onHandleColumnOptionsChange: (event: ChangeEvent<HTMLInputElement>, selectedIndex: number) => void;
  onHandleBuiltInOptionsChange: (event: ChangeEvent<HTMLSelectElement>, selectedIndex: number) => void;
  onHandleDataTypeChange: (event: ChangeEvent<HTMLSelectElement>, selectedIndex: number) => void;
  onHandleFormTypeChange: (event: ChangeEvent<HTMLSelectElement>, selectedIndex: number) => void;
}

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
            <input
              type="text"
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                onHandleColumnNameChange(event, index);
              }}
              value={item.variableName}
            />
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
