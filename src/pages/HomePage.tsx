import { ChangeEvent, useEffect, useState } from 'react';
import { PageWrapper } from '../layout';
import { FORMULA_TYPE, IFormulaMap } from '../types/formula';
import { getRandomAlphanumberic, getRandomDigit, getRandomLetter } from '../utils/randomHelper';

// input (limit possibilities, unique?)Incrementer (increment by), Timestamp (toLocaleString format)

interface ICustomStringParConfig {
  type: FORMULA_TYPE,
  value: string,
  index: number,
  onHandleChange: (value: string, index: number) => void;
  onDelete: (index: number) => void;
}

const getInstructions = (type: FORMULA_TYPE) => {
  if (type === FORMULA_TYPE.FIXED) {
    return 'Enter Fixed Value';
  }
  if (type === FORMULA_TYPE.INCREMENT) {
    return 'Enter Starting Number';
  } else {
    return 'Enter Size'
  }
}

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
    return 'Letters'
  }
  if (type === FORMULA_TYPE.DIGIT) {
    return 'Digits'
  }
  if (type === FORMULA_TYPE.ALPHA) {
    return 'Alphanumeric'
  }
  else {
    return 'Space'
  }
}

const CustomStringPartConfig = ({ type, value, onHandleChange, onDelete, index }: ICustomStringParConfig) => {
  const [fieldValue, setFieldValue] = useState<string>('');

  useEffect(() => {
    if (value) {
      setFieldValue(value)
    }
  }, [value])
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
    <div className='border-2 border-gray-500 rounded p-2 mr-1 mb-1 flex flex-col'>
      {type !== FORMULA_TYPE.DATE ? <div>
        <input
          className={`rounded border-2 border-gray-500 pl-1 mr-2 ${type === FORMULA_TYPE.FIXED ? 'w-48' : 'w-24'}`}
          type="text"
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            onHandleValueChange(event);
          }}
          onBlur={submit}
          value={fieldValue}
        />
        <button className='w-fit h-fit self-end p-1' onClick={() => { onDelete(index) }}>X</button>
      </div> : null}
      {type !== FORMULA_TYPE.DATE ? <span className='text-gray-400'>{instructionText}</span> : <button className='w-fit h-fit self-end p-1' onClick={() => { onDelete(index) }}>X</button>}
      <span className='text-xl self-center'>{labelText}</span>
    </div>
  );
}

const getCorrectFunction = (type: FORMULA_TYPE) => {
  if (type === FORMULA_TYPE.LETTER) {
    return getRandomLetter;
  }
  if (type === FORMULA_TYPE.DIGIT) {
    return getRandomDigit;
  }
  else {
    return getRandomAlphanumberic;
  }
}

const getMultipleRandomValues = (type: FORMULA_TYPE, size: number) => {
  const func = getCorrectFunction(type);
  const section = [];
  for (let i = 0; i < size; i++) {
    section.push(func())
  }

  return section;
}

const getGeneratedValue = (fieldParams: IFormulaMap[], count: number) => {
  return fieldParams.map((field) => {
    if (field.type === FORMULA_TYPE.FIXED) {
      return field.value;
    }
    if (field.type === FORMULA_TYPE.INCREMENT) {
      return count + Number(field.value);
    }
    if (field.type === FORMULA_TYPE.DATE) {
      return new Date().toISOString();
    }
    if (field.type === FORMULA_TYPE.SPACE) {
      return ' ';
    }
    else {
      const values = getMultipleRandomValues(field.type, Number(field.value));

      return values.join('');
    }
  }).join('');
}

const CustomStringGenerator = () => {
  const [fieldParams, setFieldParams] = useState<IFormulaMap[]>([]);
  const generatedValue = fieldParams.length ? Array.from({ length: 5 }, (_x, index) => getGeneratedValue(fieldParams, index)) : [];

  const addField = (type: FORMULA_TYPE) => {
    const updatedFields = fieldParams.concat([{
      type,
      value: type === FORMULA_TYPE.FIXED ? '' : '1',
    }])

    setFieldParams(updatedFields);
  };

  const onDelete = (index: number) => {
    const updatedFields = fieldParams.filter((_fp, i) => i !== index);

    setFieldParams(updatedFields);
  };

  const onUpdate = (value: string, index: number) => {
    const selectedParam = fieldParams.find((_fp, i) => i === index);

    if (selectedParam) {
      const updatedParam = {
        ...selectedParam,
        value
      };

      const updatedFields = fieldParams.map((fp, i) => {
        if (i === index) {
          return updatedParam;
        }
        else {
          return fp;
        }
      });

      setFieldParams(updatedFields);
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
    <div>
      <div>
        <button className='w-fit mr-1' onClick={addFixedText}>Fixed Text</button>
        <button className='w-fit mr-1' onClick={addSpace}>Space</button>
        <button className='w-fit mr-1' onClick={addDigit}>Digit</button>
        <button className='w-fit mr-1' onClick={addLetter}>Letter</button>
        <button className='w-fit mr-1' onClick={addAlphaNumeric}>Alphanumeric</button>
        <button className='w-fit mr-1' onClick={addIncrement}>Increment</button>
        <button className='w-fit mr-1' onClick={addTimestamp}>Timestamp</button>
      </div>
      <div className='mt-4 flex flex-row flex-wrap'>
        {fieldParams.map((fp, index) => {
          return <CustomStringPartConfig key={index} type={fp.type} value={fp.value} onHandleChange={onUpdate} onDelete={onDelete} index={index} />
        })}
      </div>
      <div>{generatedValue.map((genValue, index) => {
        return (<div key={genValue + index}>
          <span className='font-bold'>Example {index + 1}: </span><span className='font-mono'>{genValue}</span>
        </div>)
      })}</div>
    </div>
  );
}

const HomePage = () => {
  return (<PageWrapper>
    <>
      <h1 className="mb-4 text-6xl">Home Page</h1>
      <CustomStringGenerator />
    </>
  </PageWrapper>)

};

export { HomePage };
