import React, { ChangeEvent } from 'react';
import { copyToClipboard } from '../../utils/copy';
import { getReactCode } from './exportHelper';
import { IFieldType, RandomType } from './types';

const AMOUNT_TWO = 2;

interface IDisplayRandomFields {
  columns: IFieldType[];
  onHandleAddField: (randomType: RandomType) => void;
  onHandleRemoveField: (selectedIndex: number) => void;
  onHandleColumnNameChange: (event: ChangeEvent<HTMLInputElement>, selectedIndex: number) => void;
  onHandleColumnOptionsChange: (event: ChangeEvent<HTMLInputElement>, selectedIndex: number) => void;
  onHandleBuiltInOptionsChange: (event: ChangeEvent<HTMLSelectElement>, selectedIndex: number) => void;
  onHandleDataTypeChange: (event: ChangeEvent<HTMLSelectElement>, selectedIndex: number) => void;
  onHandleFormTypeChange: (event: ChangeEvent<HTMLSelectElement>, selectedIndex: number) => void;
}

export const DisplayRandomFields = ({
  columns,
  onHandleAddField,
  onHandleRemoveField,
  onHandleColumnNameChange,
  onHandleColumnOptionsChange,
  onHandleBuiltInOptionsChange,
  onHandleDataTypeChange,
  onHandleFormTypeChange,
}: IDisplayRandomFields) => {
  return (
    <div className="flex flex-row">
      <div className="mr-8 flex flex-col gap-2">
        {Object.keys(RandomType)
          .filter(
            (item: string) =>
              !columns.some((element: IFieldType) => element.randomType === RandomType[item as keyof typeof RandomType])
          )
          .map((type: string) => {
            return (
              <button
                key={type}
                onClick={() => {
                  onHandleAddField(RandomType[type as keyof typeof RandomType]);
                }}>
                {RandomType[type as keyof typeof RandomType]}
              </button>
            );
          })}
      </div>
      <div>
        {columns.map((item: IFieldType, index: number) => {
          return (
            <div key={item.randomType} className="mb-2 flex flex-row gap-2">
              <input
                type="text"
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                  onHandleColumnNameChange(event, index);
                }}
                value={item.variableName}
              />
              <input
                type="text"
                disabled={item.randomType !== RandomType.CUSTOM_STATE && item.randomType !== RandomType.CUSTOM_STRING}
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                  onHandleColumnOptionsChange(event, index);
                }}
                value={item.userOptions}
              />
              <span>{item.randomType}</span>
              <select
                disabled={item.builtInOptions.length < AMOUNT_TWO}
                onChange={(event: ChangeEvent<HTMLSelectElement>) => onHandleBuiltInOptionsChange(event, index)}>
                {item.builtInOptions.map((op: string) => {
                  return (
                    <option key={op} value={op}>
                      {op}
                    </option>
                  );
                })}
              </select>
              <select
                disabled={item.dataType.length < AMOUNT_TWO}
                onChange={(event: ChangeEvent<HTMLSelectElement>) => onHandleDataTypeChange(event, index)}>
                {item.dataType.map((op: string) => {
                  return (
                    <option key={op} value={op}>
                      {op}
                    </option>
                  );
                })}
              </select>
              <select
                disabled={item.formType.length < AMOUNT_TWO}
                onChange={(event: ChangeEvent<HTMLSelectElement>) => onHandleFormTypeChange(event, index)}>
                {item.formType.map((op: string) => {
                  return (
                    <option key={op} value={op}>
                      {op}
                    </option>
                  );
                })}
              </select>
              {columns.length >= AMOUNT_TWO && (
                <button
                  onClick={() => {
                    onHandleRemoveField(index);
                  }}>
                  Delete
                </button>
              )}
              <button onClick={() => copyToClipboard(getReactCode(item))}>Code</button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
