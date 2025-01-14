import React, { useState } from 'react';
import { PageWrapper } from '../layout';
import { CodeFieldLabel, ICodeProp, CodeFieldValues } from '../types/codeField';
import { DisplayCodeFields } from '../molecules/DisplayCodeFields/DIsplayCodeFields';
import { CodeGeneratedSection } from '../molecules/CodeGeneratedSection';

/*
 * TODO: Refactor
 * - add ability to extend group for to button, radio, checkbox
 * - add type: dropdown
 * - add prefilled label and variable name options
 * - add react code display
 * - add copy ability
 * - add unit tests
 */

export const CodeGeneratorPage = () => {
  const [codeFields, setCodeFields] = useState<ICodeProp[]>([]);

  const onHandleCodeField = (selectedValue: CodeFieldLabel) => {
    const count = codeFields.filter((cf) => cf.type === selectedValue).length + 1;
    const label = `${selectedValue}${count}`;
    const updatedCodeFields = codeFields.concat([
      {
        type: selectedValue,
        label,
        variableName: label.toLocaleLowerCase(),
      },
    ]);

    setCodeFields(updatedCodeFields);
  };

  const onHandleColumnUpdateChange = (updatedLabel: string, updatedName: string, selectedIndex: number) => {
    const updatedColumns = codeFields.map((item, index) => {
      if (selectedIndex === index) {
        return { ...item, label: updatedLabel, variableName: updatedName };
      } else {
        return item;
      }
    });

    setCodeFields(updatedColumns);
  };

  const onHandleRemoveField = (selectedIndex: number) => {
    const updatedData = codeFields.filter((_, i) => i !== selectedIndex);
    setCodeFields(updatedData);
  };

  const onMoveDown = (selectedIndex: number) => {
    const itemToMoveDown = codeFields.find((_col, i) => i === selectedIndex);
    const itemToMoveUp = codeFields.find((_col, i) => i === selectedIndex + 1);

    if (itemToMoveDown && itemToMoveUp) {
      const updatedData = codeFields.map((col, i) => {
        if (i === selectedIndex + 1) {
          return itemToMoveDown;
        }
        if (i === selectedIndex) {
          return itemToMoveUp;
        } else {
          return col;
        }
      });

      setCodeFields(updatedData);
    }
  };

  const onMoveUp = (selectedIndex: number) => {
    const itemToMoveUp = codeFields.find((_col, i) => i === selectedIndex);
    const itemToMoveDown = codeFields.find((_col, i) => i === selectedIndex - 1);

    if (itemToMoveDown && itemToMoveUp) {
      const updatedData = codeFields.map((col, i) => {
        if (i === selectedIndex - 1) {
          return itemToMoveUp;
        }
        if (i === selectedIndex) {
          return itemToMoveDown;
        } else {
          return col;
        }
      });

      setCodeFields(updatedData);
    }
  };

  return (
    <PageWrapper>
      <>
        <h1 className="mb-4 text-6xl">Code Generator</h1>
        <div className="flex gap-4">
          <div>
            <div className="mb-4">
              <div className="mb-4 text-2xl">Select Form Fields</div>
              {CodeFieldValues.map((cValue) => {
                return (
                  <button key={cValue} className="mr-2 w-24" onClick={() => onHandleCodeField(cValue)}>
                    {cValue}
                  </button>
                );
              })}
            </div>
            <DisplayCodeFields
              codeFields={codeFields}
              onHandleRemoveField={onHandleRemoveField}
              onHandleColumnUpdateChange={onHandleColumnUpdateChange}
              onMoveUp={onMoveUp}
              onMoveDown={onMoveDown}
            />
          </div>
          <div>
            <CodeGeneratedSection codeFields={codeFields} />
          </div>
        </div>
      </>
    </PageWrapper>
  );
};
