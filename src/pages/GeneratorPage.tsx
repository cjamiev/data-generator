import React, { ChangeEvent, useState } from 'react';
import { GeneratedSection } from '../molecules/GeneratedSection';
import { DisplayRandomFields } from '../atoms/DisplayRandomFields';
import { fieldTypes, IFieldType, PredefinedRandomLabel } from '../types/randomField';
import { getCorrectGeneratedValue } from '../molecules/GeneratedSection/helper';
import { RandomFieldForm } from '../molecules/RandomFieldForm';
import { IRandomField } from '../atoms/CustomRandomFieldForm/CustomRandomFieldForm';
import { PageWrapper } from '../layout';
import { scrollToTopOfPage, scrollToBottomOfPage } from '../utils/scroll';

/*
 * TODO: Refactor
 * Hi Priority Features
 * - Edit Column
 * Lo Priority Features
 * - Convert Input File to Fields
 * - Download Result, HTML
 * - Sort Column, Collapse Column
 * - Edit Row, Delete Row
 * - Custom String
 *   - input (limit possibilities, unique?)
 *   - Incrementer (increment by)
 *   - Timestamp (toLocaleString format)
 * - Improve email generator with the name
 * - Words, Fake Words, Sentence
 * - Geometric/Weighted Distributed Number
 * - Draggabled up and down
 * - Frequency: Never, Once, Daily, Weekly, Monthly, Yearly
 * - Height, Bloodtype, weight, shirt size, profession, race, title
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
    PredefinedRandomLabel.ID,
    PredefinedRandomLabel.FIRST_NAME,
    PredefinedRandomLabel.LAST_NAME,
  ]);

  const generateData = () => {
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
    if (!value) {
      setRowCount(0);
    } else if (isNaN(valueAsNumber)) {
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

  const onMoveDown = (selectedIndex: number) => {
    const itemToMoveDown = columns.find((_col, i) => i === selectedIndex);
    const itemToMoveUp = columns.find((_col, i) => i === selectedIndex + 1);

    if (itemToMoveDown && itemToMoveUp) {
      const updatedData = columns.map((col, i) => {
        if (i === selectedIndex + 1) {
          return itemToMoveDown;
        }
        if (i === selectedIndex) {
          return itemToMoveUp;
        } else {
          return col;
        }
      });

      setColumns(updatedData);
    }
  };

  const onMoveUp = (selectedIndex: number) => {
    const itemToMoveUp = columns.find((_col, i) => i === selectedIndex);
    const itemToMoveDown = columns.find((_col, i) => i === selectedIndex - 1);

    if (itemToMoveDown && itemToMoveUp) {
      const updatedData = columns.map((col, i) => {
        if (i === selectedIndex - 1) {
          return itemToMoveUp;
        }
        if (i === selectedIndex) {
          return itemToMoveDown;
        } else {
          return col;
        }
      });

      setColumns(updatedData);
    }
  };

  const onHandleColumnNameChange = (updatedName: string, selectedIndex: number) => {
    const updatedColumns = columns.map((item, index) => {
      if (selectedIndex === index) {
        return { ...item, variableName: updatedName };
      } else {
        return item;
      }
    });

    setColumns(updatedColumns);
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
      const newField = fieldTypes.find((i) => i.randomType === item);
      return newField as IFieldType;
    });
    setColumns(columnFormedValues);
  };

  const confirmCustomFieldSelection = (selectedType: string, field: IRandomField) => {
    const newField = fieldTypes.find((i) => i.randomType === selectedType);
    const updatedNewField = {
      ...newField,
      variableName: field.variableName,
      options: field.options,
    } as IFieldType;
    setColumns(columns.concat([updatedNewField]));
  };

  const onClickSelectAll = () => {
    if (predefinedSelection.length === 13) {
      setPredifinedSelection([]);
    } else {
      setPredifinedSelection(Object.values(PredefinedRandomLabel));
    }
  };

  const isGenerateDisabled = columns.length === 0;

  return (
    <PageWrapper hasFooter>
      <>
        <h1 className="mb-4 text-6xl">Data Generator</h1>
        <div className="flex gap-4">
          <div>
            <DisplayRandomFields
              columns={columns}
              onHandleRemoveField={onHandleRemoveField}
              onHandleColumnNameChange={onHandleColumnNameChange}
              onHandleColumnOptionsChange={onHandleColumnOptionsChange}
              onHandleBuiltInOptionsChange={onHandleBuiltInOptionsChange}
              onHandleDataTypeChange={onHandleDataTypeChange}
              onHandleFormTypeChange={onHandleFormTypeChange}
              onMoveUp={onMoveUp}
              onMoveDown={onMoveDown}
            />
            <RandomFieldForm
              currentLength={columns.length}
              predefinedSelection={predefinedSelection}
              updatePredefinedSelection={updatePredefinedSelection}
              confirmPredfinedSelection={confirmPredfinedSelection}
              onClickSelectAll={onClickSelectAll}
              confirmCustomFieldSelection={confirmCustomFieldSelection}
            />
          </div>
          <GeneratedSection data={data} deleteRow={deleteRowFromData} />
          <div className="fixed bottom-0 left-0 flex h-24 w-full border-t-2 border-dashed border-sky-500 bg-white pl-2 pr-2">
            <div className="m-2 inline-flex h-16 flex-col">
              <button
                className="h-2 w-32 pb-6 text-sm"
                onClick={scrollToTopOfPage}
                id="scroll-to-top"
                title="Go to top">
                Scroll Top
              </button>
              <button
                className="mt-1 h-2 w-32 pb-6 text-sm"
                onClick={scrollToBottomOfPage}
                id="scroll-to-bottom"
                title="Go to bottom">
                Scroll Down
              </button>
            </div>
            <div className="pt-4">
              <button
                className={`w-32 ${isGenerateDisabled ? 'cursor-not-allowed bg-gray-300' : ''}`}
                disabled={isGenerateDisabled}
                onClick={generateData}>
                Generate Data
              </button>
            </div>
            <div className="pt-8">
              <span className="ml-2 w-12"># Rows:</span>
              <input
                className="w-10 border-b-2 border-sky-500 text-center"
                type="text"
                onChange={onHandleCountUpdate}
                value={rowCount}
              />
            </div>
          </div>
        </div>
      </>
    </PageWrapper>
  );
};
