import { ChangeEvent, useEffect, useState } from 'react';
import { FORMULA_TYPE, IFormulaMap } from '../../../types/formula';
import { getRandomAlphanumberic, getRandomDigit, getRandomLetter } from '../../../utils/random/randomHelper';

const MOVE_LEFT = '<-';
const MOVE_RIGHT = '->';

interface ICustomStringParConfig {
  type: FORMULA_TYPE;
  value: string;
  index: number;
  onHandleChange: (value: string, index: number) => void;
  onDelete: (index: number) => void;
  isFirst: boolean;
  isLast: boolean;
  onMoveLeft: (index: number) => void;
  onMoveRight: (index: number) => void;
}

const getInstructions = (type: FORMULA_TYPE) => {
  if (type === FORMULA_TYPE.FIXED) {
    return 'Enter Fixed Value';
  }
  if (type === FORMULA_TYPE.INCREMENT) {
    return 'Enter Starting Number';
  } else {
    return 'Enter Size';
  }
};

const getLabelText = (type: FORMULA_TYPE) => {
  if (type === FORMULA_TYPE.FIXED) {
    return 'Fixed Value';
  }
  if (type === FORMULA_TYPE.INCREMENT) {
    return 'Count';
  }
  if (type === FORMULA_TYPE.DATE) {
    return 'Timestamp';
  }
  if (type === FORMULA_TYPE.LETTER) {
    return 'Letters';
  }
  if (type === FORMULA_TYPE.DIGIT) {
    return 'Digits';
  }
  if (type === FORMULA_TYPE.ALPHA) {
    return 'Alphanumeric';
  } else {
    return 'Space';
  }
};

const CustomStringPartConfig = ({
  type,
  value,
  onHandleChange,
  onDelete,
  index,
  isFirst,
  isLast,
  onMoveLeft,
  onMoveRight,
}: ICustomStringParConfig) => {
  const [fieldValue, setFieldValue] = useState<string>('');

  useEffect(() => {
    if (value) {
      setFieldValue(value);
    }
  }, [value]);

  const onHandleValueChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedValue = event.target.value;

    if (selectedValue.length > 99) {
      return;
    }
    const isValidNumber = !isNaN(Number(selectedValue));
    const isSizeField = type === FORMULA_TYPE.ALPHA || type === FORMULA_TYPE.LETTER || type === FORMULA_TYPE.DIGIT;

    if (isSizeField && isValidNumber) {
      setFieldValue(selectedValue);
    } else if (isSizeField && !isValidNumber) {
      return;
    } else {
      setFieldValue(selectedValue);
    }
  };

  const submit = () => {
    if (fieldValue && fieldValue !== value) {
      onHandleChange(fieldValue, index);
    } else {
      setFieldValue(value);
    }
  };

  const labelText = getLabelText(type);
  const instructionText = getInstructions(type);

  return (
    <div className="mb-1 flex basis-1/6 flex-col rounded border-2 border-gray-500 p-2">
      {type !== FORMULA_TYPE.DATE ? (
        <div>
          <input
            className={`mr-2 rounded border-2 border-gray-500 pl-1 ${type === FORMULA_TYPE.FIXED ? 'w-48' : 'w-24'}`}
            type="text"
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              onHandleValueChange(event);
            }}
            onBlur={submit}
            value={fieldValue}
          />
          <button
            className="h-fit w-fit self-end p-1"
            onClick={() => {
              onDelete(index);
            }}>
            X
          </button>
        </div>
      ) : null}
      {type !== FORMULA_TYPE.DATE ? (
        <span className="text-gray-400">{instructionText}</span>
      ) : (
        <button
          className="h-fit w-fit self-end p-1"
          onClick={() => {
            onDelete(index);
          }}>
          X
        </button>
      )}
      <div className="flex w-1/2 self-center font-sans">
        {!isFirst ? <button onClick={() => onMoveLeft(index)}>{MOVE_LEFT}</button> : null}
        {!isLast ? <button onClick={() => onMoveRight(index)}>{MOVE_RIGHT}</button> : null}
      </div>

      <span className="self-center text-xl">{labelText}</span>
    </div>
  );
};

const getCorrectFunction = (type: FORMULA_TYPE) => {
  if (type === FORMULA_TYPE.LETTER) {
    return getRandomLetter;
  }
  if (type === FORMULA_TYPE.DIGIT) {
    return getRandomDigit;
  } else {
    return getRandomAlphanumberic;
  }
};

const getMultipleRandomValues = (type: FORMULA_TYPE, size: number) => {
  const func = getCorrectFunction(type);
  const section = [];
  for (let i = 0; i < size; i++) {
    section.push(func());
  }

  return section;
};

const getGeneratedValue = (fieldParams: IFormulaMap[], count: number) => {
  return fieldParams
    .map((field) => {
      if (field.type === FORMULA_TYPE.FIXED) {
        return field.value;
      }
      if (field.type === FORMULA_TYPE.INCREMENT) {
        return count + Number(field.value);
      }
      if (field.type === FORMULA_TYPE.DATE) {
        return new Date().toISOString().slice(0, 19);
      }
      if (field.type === FORMULA_TYPE.SPACE) {
        return ' ';
      } else {
        const values = getMultipleRandomValues(field.type, Number(field.value));

        return values.join('');
      }
    })
    .join('');
};

interface ICustomStringForm {
  fieldParams: IFormulaMap[];
  onUpdateFields: (updatedFields: IFormulaMap[]) => void;
}

const CustomStringForm = ({ fieldParams, onUpdateFields }: ICustomStringForm) => {
  const generatedValue = fieldParams.length
    ? Array.from({ length: 3 }, (_x, index) => getGeneratedValue(fieldParams, index))
    : [];

  const addField = (type: FORMULA_TYPE) => {
    const updatedFields = fieldParams.concat([
      {
        type,
        value: type === FORMULA_TYPE.FIXED ? '' : '1',
      },
    ]);

    onUpdateFields(updatedFields);
  };

  const onDelete = (index: number) => {
    const updatedFields = fieldParams.filter((_fp, i) => i !== index);

    onUpdateFields(updatedFields);
  };

  const onUpdate = (value: string, index: number) => {
    const selectedParam = fieldParams.find((_fp, i) => i === index);

    if (selectedParam) {
      const updatedParam = {
        ...selectedParam,
        value,
      };

      const updatedFields = fieldParams.map((fp, i) => {
        if (i === index) {
          return updatedParam;
        } else {
          return fp;
        }
      });

      onUpdateFields(updatedFields);
    }
  };

  const onMoveLeft = (index: number) => {
    const itemToMoveLeft = fieldParams.find((_fp, i) => i === index);
    const itemToMoveRight = fieldParams.find((_fp, i) => i === index - 1);

    if (itemToMoveLeft && itemToMoveRight) {
      const updatedFields = fieldParams.map((fp, i) => {
        if (i === index - 1) {
          return itemToMoveLeft;
        }
        if (i === index) {
          return itemToMoveRight;
        } else {
          return fp;
        }
      });

      onUpdateFields(updatedFields);
    }
  };

  const onMoveRight = (index: number) => {
    const itemToMoveRight = fieldParams.find((_fp, i) => i === index);
    const itemToMoveLeft = fieldParams.find((_fp, i) => i === index + 1);

    if (itemToMoveLeft && itemToMoveRight) {
      const updatedFields = fieldParams.map((fp, i) => {
        if (i === index + 1) {
          return itemToMoveRight;
        }
        if (i === index) {
          return itemToMoveLeft;
        } else {
          return fp;
        }
      });

      onUpdateFields(updatedFields);
    }
  };

  const addFixedText = () => addField(FORMULA_TYPE.FIXED);
  const addSpace = () => addField(FORMULA_TYPE.SPACE);
  const addDigit = () => addField(FORMULA_TYPE.DIGIT);
  const addLetter = () => addField(FORMULA_TYPE.LETTER);
  const addAlphaNumeric = () => addField(FORMULA_TYPE.ALPHA);
  const addIncrement = () => addField(FORMULA_TYPE.INCREMENT);
  const addTimestamp = () => addField(FORMULA_TYPE.DATE);

  return (
    <div className="flex h-fit w-fit flex-col">
      <div className="flex gap-2">
        {generatedValue.map((genValue, index) => {
          return (
            <div key={genValue + index}>
              <span className="font-bold">Sample {index + 1}: </span>
              <span className="font-mono">{genValue}</span>
            </div>
          );
        })}
      </div>
      <div>
        <button className="mr-1 w-fit" onClick={addFixedText}>
          Fixed Text
        </button>
        <button className="mr-1 w-fit" onClick={addSpace}>
          Space
        </button>
        <button className="mr-1 w-fit" onClick={addDigit}>
          Digit
        </button>
        <button className="mr-1 w-fit" onClick={addLetter}>
          Letter
        </button>
        <button className="mr-1 w-fit" onClick={addAlphaNumeric}>
          Alphanumeric
        </button>
        <button className="mr-1 w-fit" onClick={addIncrement}>
          Increment
        </button>
        <button className="mr-1 w-fit" onClick={addTimestamp}>
          Timestamp
        </button>
      </div>
      <div className="mt-4 flex max-h-80 flex-row flex-wrap gap-2 overflow-auto">
        {fieldParams.map((fp, index) => {
          return (
            <CustomStringPartConfig
              key={index}
              type={fp.type}
              value={fp.value}
              onHandleChange={onUpdate}
              onDelete={onDelete}
              index={index}
              isFirst={index === 0}
              isLast={index === fieldParams.length - 1}
              onMoveLeft={onMoveLeft}
              onMoveRight={onMoveRight}
            />
          );
        })}
      </div>
    </div>
  );
};

export { CustomStringForm };
