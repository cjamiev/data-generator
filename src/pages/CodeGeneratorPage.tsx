import React, { useState } from 'react';
import { PageWrapper } from '../layout';
import { CodeFieldLabel, ICodeProp, CodeFieldValues } from '../types/codeField';
import { DisplayCodeFields } from '../molecules/DisplayCodeFields/DIsplayCodeFields';
import { CodeGeneratedSection } from '../molecules/CodeGeneratedSection';

/*
 * TODO: Refactor
 * - add react code display
 * - add copy ability
 * - add unit tests
 * - add ability to extend group for to dropdown, radio, checkbox
 * - add type: dropdown
 * - add prefilled label and variable name options
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
        subcodefield: [],
      },
    ]);

    setCodeFields(updatedCodeFields);
  };

  const onHandleConcatenate = (selectedIndex: number) => {
    const itemToUpdate = codeFields.find((_col, i) => i === selectedIndex);
    if (itemToUpdate) {
      const subindex = itemToUpdate.subcodefield.length + 1;
      const updatedItem = {
        ...itemToUpdate,
        subcodefield: itemToUpdate.subcodefield.concat([
          {
            label: itemToUpdate.label + subindex,
            variableName: itemToUpdate.variableName + subindex,
          },
        ]),
      };

      const updatedCodeFields = codeFields.map((item, index) => {
        if (selectedIndex === index) {
          return updatedItem;
        } else {
          return item;
        }
      });

      setCodeFields(updatedCodeFields);
    }
  };

  const onHandleColumnUpdateChange = (updatedLabel: string, updatedName: string, selectedIndex: number) => {
    const updatedCodeFields = codeFields.map((item, index) => {
      if (selectedIndex === index) {
        return { ...item, label: updatedLabel, variableName: updatedName };
      } else {
        return item;
      }
    });

    setCodeFields(updatedCodeFields);
  };

  const onHandleSubColumnUpdateChange = (
    updatedLabel: string,
    updatedName: string,
    selectedIndex: number,
    selectedSubIndex: number
  ) => {
    const updatedCodeFields = codeFields.map((item, index) => {
      if (selectedIndex === index) {
        const updatedConcantenation = item.subcodefield.map((subitem, subindex) => {
          if (selectedSubIndex === subindex) {
            return { ...subitem, label: updatedLabel, variableName: updatedName };
          } else {
            return subitem;
          }
        });

        return { ...item, subcodefield: updatedConcantenation };
      } else {
        return item;
      }
    });

    setCodeFields(updatedCodeFields);
  };

  const onHandleRemoveSubfield = (selectedIndex: number, selectedSubIndex: number) => {
    const updatedCodeFields = codeFields.map((item, index) => {
      if (selectedIndex === index) {
        const updatedSubCodeField = item.subcodefield.filter((_, i) => i !== selectedSubIndex);
        return { ...item, subcodefield: updatedSubCodeField };
      } else {
        return item;
      }
    });

    setCodeFields(updatedCodeFields);
  };

  const onHandleRemoveField = (selectedIndex: number) => {
    const updatedData = codeFields.filter((_, i) => i !== selectedIndex);
    setCodeFields(updatedData);
  };

  const onMoveDown = (selectedIndex: number) => {
    const itemToMoveDown = codeFields.find((_col, i) => i === selectedIndex);
    const itemToMoveUp = codeFields.find((_col, i) => i === selectedIndex + 1);

    if (itemToMoveDown && itemToMoveUp) {
      const updatedCodeFields = codeFields.map((col, i) => {
        if (i === selectedIndex + 1) {
          return itemToMoveDown;
        }
        if (i === selectedIndex) {
          return itemToMoveUp;
        } else {
          return col;
        }
      });

      setCodeFields(updatedCodeFields);
    }
  };

  const onMoveUp = (selectedIndex: number) => {
    const itemToMoveUp = codeFields.find((_col, i) => i === selectedIndex);
    const itemToMoveDown = codeFields.find((_col, i) => i === selectedIndex - 1);

    if (itemToMoveDown && itemToMoveUp) {
      const updatedCodeFields = codeFields.map((col, i) => {
        if (i === selectedIndex - 1) {
          return itemToMoveUp;
        }
        if (i === selectedIndex) {
          return itemToMoveDown;
        } else {
          return col;
        }
      });

      setCodeFields(updatedCodeFields);
    }
  };

  return (
    <PageWrapper>
      <>
        <h1 className="mb-4 text-6xl">Code Generator</h1>
        <div className="flex gap-2">
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
              onHandleSubColumnUpdateChange={onHandleSubColumnUpdateChange}
              onHandleConcatenate={onHandleConcatenate}
              onHandleRemoveSubfield={onHandleRemoveSubfield}
              onMoveUp={onMoveUp}
              onMoveDown={onMoveDown}
            />
          </div>
          <div className="flex-auto">
            <CodeGeneratedSection codeFields={codeFields} />
          </div>
        </div>
      </>
    </PageWrapper>
  );
};
