import { ChangeEvent, useState } from 'react';
import { CustomFieldLabel, CustomFieldValue } from '../../types/randomField';

export interface IRandomField {
  variableName: string;
  options: string;
}
interface ICustomRandomFieldForm {
  onHandleConfirm: (selectedType: string, field: IRandomField) => void;
  onHandleCancel: () => void;
}

// Todo: Date Future vs Past
const CustomRandomFieldForm = ({ onHandleConfirm, onHandleCancel }: ICustomRandomFieldForm) => {
  const [selectedType, setSelectedType] = useState<string>(CustomFieldValue.DATE);
  const [columnName, setColumnName] = useState<string>('');
  const [options, setOptions] = useState<string>('');
  const [booleanWeight, setBooleanWeight] = useState<number>(50);
  const [dateModifier, setDateModifier] = useState<string>('year');
  const [dateCount, setDateCount] = useState<number>(1);

  const onHandleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setColumnName(event.target.value);
  };

  const onHandleBooleanWeightChange = (event: ChangeEvent<HTMLInputElement>) => {
    setBooleanWeight(Number(event.target.value));
  };

  const onHandleDateCountChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDateCount(Number(event.target.value));
  };

  const onHandleOptionsChange = (event: ChangeEvent<HTMLInputElement>) => {
    setOptions(event.target.value);
  };

  const submitNewField = () => {
    if (selectedType === CustomFieldValue.DATE) {
      onHandleConfirm(selectedType, { variableName: columnName, options: dateCount + ',' + dateModifier });
    }
    else if (selectedType === CustomFieldValue.BOOLEAN) {
      onHandleConfirm(selectedType, {
        variableName: columnName,
        options: String(booleanWeight),
      });
    } else {
      onHandleConfirm(selectedType, { variableName: columnName, options });
    }
  };

  const getShouldDisableConfirm = () => {
    const isValidName = Boolean(columnName);
    if (selectedType === CustomFieldValue.DATE || selectedType === CustomFieldValue.BOOLEAN) {
      return !isValidName;
    }
    if (selectedType === CustomFieldValue.CUSTOM_STATE || selectedType === CustomFieldValue.CUSTOM_STRING) {
      return !isValidName || !(options);
    }
  }

  const isConfirmDisabled = getShouldDisableConfirm();

  return (
    <div className="relative left-1/4 top-1/4 h-2/5 w-1/2 rounded border border-gray-500 bg-white p-4">
      <h2 className="mb-4 border-b-2 border-dashed border-sky-500 text-3xl">Specify Custom Field</h2>
      <button className="absolute right-0 top-0 h-fit w-fit border-none" onClick={onHandleCancel}>X</button>
      <div className="flex">
        <input
          onChange={() => setSelectedType(CustomFieldValue.DATE)}
          type="radio"
          name="new_custom_field"
          id={CustomFieldLabel.DATE}
          value={CustomFieldValue.DATE}
          checked={selectedType === CustomFieldValue.DATE}
        />
        <label className="ml-2 w-12" htmlFor={CustomFieldLabel.DATE}>
          {CustomFieldLabel.DATE}
        </label>
        <input
          onChange={() => setSelectedType(CustomFieldValue.BOOLEAN)}
          type="radio"
          name="new_custom_field"
          id={CustomFieldLabel.BOOLEAN}
          value={CustomFieldValue.BOOLEAN}
          checked={selectedType === CustomFieldValue.BOOLEAN}
        />
        <label className="ml-2 w-20" htmlFor={CustomFieldLabel.BOOLEAN}>
          {CustomFieldLabel.BOOLEAN}
        </label>
        <input
          onChange={() => setSelectedType(CustomFieldValue.CUSTOM_STATE)}
          type="radio"
          name="new_custom_field"
          id={CustomFieldLabel.CUSTOM_STATE}
          value={CustomFieldValue.CUSTOM_STATE}
          checked={selectedType === CustomFieldValue.CUSTOM_STATE}
        />
        <label className="ml-2 w-32" htmlFor={CustomFieldLabel.CUSTOM_STATE}>
          {CustomFieldLabel.CUSTOM_STATE}
        </label>
        <input
          onChange={() => setSelectedType(CustomFieldValue.CUSTOM_STRING)}
          type="radio"
          name="new_custom_field"
          id={CustomFieldLabel.CUSTOM_STRING}
          value={CustomFieldValue.CUSTOM_STRING}
          checked={selectedType === CustomFieldValue.CUSTOM_STRING}
        />
        <label className="ml-2 w-32" htmlFor={CustomFieldLabel.CUSTOM_STRING}>
          {CustomFieldLabel.CUSTOM_STRING}
        </label>
      </div>
      <div className="pb-2 pt-4">
        <label className="mr-12">Name</label>
        <input
          type="text"
          onChange={(event) => {
            onHandleNameChange(event);
          }}
          name="variable_name"
          placeholder='Enter Column Name'
          value={columnName}
        />
      </div>
      {selectedType === CustomFieldValue.DATE && (
        <div className="pb-4 pt-4">
          <div className="flex">
            <span className="mr-2">Select Modifier</span>
            <input
              onChange={() => setDateModifier('year')}
              type="radio"
              name="distance"
              id="year"
              value="year"
              checked={dateModifier === 'year'}
            />
            <label className="ml-2 mr-2 w-10" htmlFor="year">
              Year
            </label>
            <input
              onChange={() => setDateModifier('month')}
              type="radio"
              name="distance"
              id="month"
              value="month"
              checked={dateModifier === 'month'}
            />
            <label className="ml-2 mr-2 w-12" htmlFor="month">
              Month
            </label>
            <input
              onChange={() => setDateModifier('day')}
              type="radio"
              name="distance"
              id="day"
              value="day"
              checked={dateModifier === 'day'}
            />
            <label className="ml-2 mr-2 w-12" htmlFor="day">
              Day
            </label>
          </div>
          <div>
            <span className="mr-2">Select Count</span>
            <input
              type="range"
              id="date-count"
              name="date-count"
              min="1"
              max="100"
              value={dateCount}
              onChange={(event) => onHandleDateCountChange(event)}
            />
          </div>
          <label>
            Distance From Today:{dateCount} {dateModifier}{' '}
          </label>
        </div>
      )}
      {selectedType === CustomFieldValue.BOOLEAN && (
        <div className='flex flex-row'>
          <div className="pb-4 pt-4">
            <label className="mr-4">True Weight: {booleanWeight}%</label>
            <label className="mr-4">False Weight: {100 - booleanWeight}%</label>
            <input
              type="range"
              name="boolean-weight"
              min="1"
              max="99"
              onChange={(event) => {
                onHandleBooleanWeightChange(event);
              }}
              value={booleanWeight}
            />
          </div>
        </div>
      )}
      {selectedType === CustomFieldValue.CUSTOM_STATE && (
        <div className="pb-4 pt-4">
          <label className="mr-11">States</label>
          <input
            type="text"
            placeholder="state1, state2, state3"
            onChange={(event) => {
              onHandleOptionsChange(event);
            }}
            name="state-options"
            value={options}
          />
          <span className="mt-2 ml-2 text-gray-400">Add Comma Separated Values</span>
        </div>
      )}
      {selectedType === CustomFieldValue.CUSTOM_STRING && (
        <div className="pb-4 pt-4 relative">
          <label className="mr-14">Text </label>
          <input
            type="text"
            placeholder="#@&:^"
            onChange={(event) => {
              onHandleOptionsChange(event);
            }}
            name="text"
            value={options}
          />
          <div className="absolute bottom-4 right-32 w-32 text-wrap">
            <div className='text-gray-400'># - Digit</div>
            <div className='text-gray-400'>@ - Letter</div>
            <div className='text-gray-400'>& - Alphanumeric</div>
            <div className='text-gray-400'>: - time</div>
            <div className='text-gray-400'>^ - count</div>
          </div>
        </div>
      )}
      <div className="border-t-2 border-dashed border-sky-500 pt-4">
        <button className={isConfirmDisabled ? 'bg-gray-300 cursor-not-allowed' : ''} disabled={isConfirmDisabled} onClick={submitNewField}>Confirm</button>
      </div>
    </div>
  );
};

export { CustomRandomFieldForm };
