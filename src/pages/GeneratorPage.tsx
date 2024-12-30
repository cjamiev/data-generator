import React, { ChangeEvent, useState } from 'react';
import { GeneratedSection } from '../molecules/GeneratedSection';
import { DisplayRandomFields } from '../atoms/DisplayRandomFields';
import { fieldTypes, IFieldType, PredefinedRandomLabel, PredefinedRandomValue, CustomFieldLabel } from '../types/randomField';
import { getCorrectGeneratedValue } from '../molecules/GeneratedSection/helper';
import { RandomFieldForm } from '../molecules/RandomFieldForm';
import { IRandomField } from '../atoms/CustomRandomFieldForm/CustomRandomFieldForm';
/*
 * TODO:
 * insert sql template, json, csv switch between formats, preview mode
 * Color Code, Time Stamp
 * Words, Fake Words, Password, Sentence
 * Money, Formula (compute from other columns/values), Geometric/Weighted Distributed Number
 * improve email generator, with the name
 * improve Custom format string generator
 */

const INDEX_ZERO = 0;
const INDEX_ONE = 1;
const INDEX_TWO = 2;
const ZERO = 0;
const DEFAULT_ROW_COUNT = 10;
const MIN_ROW_COUNT = 1;
const MAX_ROW_COUNT = 1000;

export const GeneratorPage = () => {
  const [data, setData] = useState<{ column: string; value: string }[][]>([]);
  const [rowCount, setRowCount] = useState<number>(DEFAULT_ROW_COUNT);
  const [columns, setColumns] = useState<IFieldType[]>([
    fieldTypes[INDEX_ZERO],
    fieldTypes[INDEX_ONE],
    fieldTypes[INDEX_TWO],
  ]);
  const [predefinedSelection, setPredifinedSelection] = useState<string[]>([
    PredefinedRandomValue.ID,
    PredefinedRandomValue.FIRST_NAME,
    PredefinedRandomValue.LAST_NAME,
  ]);

  const validate = () => {
    const errors = columns.map((item, index) => {
      if (item.variableName) {
        return '';
      } else {
        return 'Error missing name for entry' + index + ' ' + item.randomType;
      }
    });

    return errors.filter(Boolean);
  };

  const generateData = () => {
    const errors = validate();
    if (errors[INDEX_ZERO]) {
      console.error(errors);
      return;
    }
    const result: { column: string; value: string }[][] = [];
    for (let i = ZERO; i < rowCount; i++) {
      const currentRow = columns.map((col) => {
        const value = getCorrectGeneratedValue(col, i);

        return { column: col.variableName, value };
      });
      result.push(currentRow);
    }

    setData(result);
  };

  const deleteRowFromData = (rowIndex: number) => {
    const updatedData = data.filter((_, index) => index !== rowIndex);

    setData(updatedData);
  };

  const onHandleCountUpdate = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value: string = event.target.value;
    const valueAsNumber = Number(value);
    if (isNaN(valueAsNumber)) {
      return;
    } else if (valueAsNumber < MIN_ROW_COUNT) {
      setRowCount(MIN_ROW_COUNT);
    } else if (valueAsNumber > MAX_ROW_COUNT) {
      setRowCount(MAX_ROW_COUNT);
    } else {
      setRowCount(valueAsNumber);
    }
  };

  const onHandleRemoveField = (selectedIndex: number) => {
    const updatedData = columns.filter((_, i) => i !== selectedIndex);
    const matched = columns.find((_, i) => i === selectedIndex);
    setColumns(updatedData);

    const updatedSelection = predefinedSelection.filter((item) => item !== matched?.randomType);
    setPredifinedSelection(updatedSelection);
  };

  const onHandleColumnNameChange = (event: React.ChangeEvent<HTMLInputElement>, selectedIndex: number) => {
    const value = event.target.value;
    if (value) {
      const updatedColumns = columns.map((item, index) => {
        if (selectedIndex === index) {
          return { ...item, variableName: value };
        } else {
          return item;
        }
      });

      setColumns(updatedColumns);
    }
  };

  const onHandleColumnOptionsChange = (event: React.ChangeEvent<HTMLInputElement>, selectedIndex: number) => {
    const value = event.target.value;
    if (value) {
      const updatedColumns = columns.map((item, index) => {
        if (selectedIndex === index) {
          return { ...item, userOptions: value };
        } else {
          return item;
        }
      });

      setColumns(updatedColumns);
    }
  };

  const onHandleBuiltInOptionsChange = (event: React.ChangeEvent<HTMLSelectElement>, selectedIndex: number) => {
    const value = event.target.value;
    if (value) {
      const updatedColumns = columns.map((item, index) => {
        if (selectedIndex === index) {
          return { ...item, selectedBuiltInOptions: value };
        } else {
          return item;
        }
      });

      setColumns(updatedColumns);
    }
  };

  const onHandleDataTypeChange = (event: React.ChangeEvent<HTMLSelectElement>, selectedIndex: number) => {
    const value = event.target.value;
    if (value) {
      const updatedColumns = columns.map((item, index) => {
        if (selectedIndex === index) {
          return { ...item, selectedDataType: value };
        } else {
          return item;
        }
      });

      setColumns(updatedColumns);
    }
  };

  const onHandleFormTypeChange = (event: React.ChangeEvent<HTMLSelectElement>, selectedIndex: number) => {
    const value = event.target.value;
    if (value) {
      const updatedColumns = columns.map((item, index) => {
        if (selectedIndex === index) {
          return { ...item, selectedFormType: value };
        } else {
          return item;
        }
      });

      setColumns(updatedColumns);
    }
  };

  const updatePredefinedSelection = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedValue = event.target.value;
    const matched = predefinedSelection.some((item) => item === selectedValue);
    const updatedSelection = matched
      ? predefinedSelection.filter((item) => item !== selectedValue)
      : predefinedSelection.concat([selectedValue]);
    setPredifinedSelection(updatedSelection);
  };

  const confirmPredfinedSelection = () => {
    const columnFormedValues = predefinedSelection.map((item) => {
      const randomType = PredefinedRandomLabel[item as keyof typeof PredefinedRandomLabel];
      const newField = fieldTypes.find((i) => i.randomType === randomType);
      return newField as IFieldType;
    });
    setColumns(columnFormedValues);
  };

  const confirmCustomFieldSelection = (selectedType: string, field: IRandomField) => {
    const randomType = CustomFieldLabel[selectedType as keyof typeof CustomFieldLabel];
    const newField = fieldTypes.find((i) => i.randomType === randomType);
    const updatedNewField = {
      ...newField,
      variableName: field.variableName,
      userOptions: field.options
    } as IFieldType;
    setColumns(columns.concat([updatedNewField]));
  };

  const onClickSelectAll = () => {
    if (predefinedSelection.length === 13) {
      setPredifinedSelection([]);
    } else {
      setPredifinedSelection(Object.values(PredefinedRandomValue));
    }
  };

  const isGenerateDisabled = columns.length === 0;

  return (
    <div className="m-8">
      <DisplayRandomFields
        columns={columns}
        onHandleRemoveField={onHandleRemoveField}
        onHandleColumnNameChange={onHandleColumnNameChange}
        onHandleColumnOptionsChange={onHandleColumnOptionsChange}
        onHandleBuiltInOptionsChange={onHandleBuiltInOptionsChange}
        onHandleDataTypeChange={onHandleDataTypeChange}
        onHandleFormTypeChange={onHandleFormTypeChange}
      />
      <RandomFieldForm
        predefinedSelection={predefinedSelection}
        updatePredefinedSelection={updatePredefinedSelection}
        confirmPredfinedSelection={confirmPredfinedSelection}
        onClickSelectAll={onClickSelectAll}
        confirmCustomFieldSelection={confirmCustomFieldSelection}
      />
      <div>
        <button className={isGenerateDisabled ? 'cursor-not-allowed bg-gray-300' : ''} disabled={isGenerateDisabled} onClick={generateData}>Generate Data</button>
        <input type="text" onChange={onHandleCountUpdate} value={rowCount} />
      </div>
      <GeneratedSection data={data} deleteRow={deleteRowFromData} />
    </div>
  );
};
