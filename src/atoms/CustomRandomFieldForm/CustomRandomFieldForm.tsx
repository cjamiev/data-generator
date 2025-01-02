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
  const [isDateInFuture, setIsDateInFuture] = useState<boolean>(false);
  const [dateCount, setDateCount] = useState<number>(3);

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
      onHandleConfirm(selectedType, { variableName: columnName, options: dateCount + ',' + String(isDateInFuture) });
    } else if (selectedType === CustomFieldValue.BOOLEAN) {
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
      return !isValidName || !options;
    }
  };

  const isConfirmDisabled = getShouldDisableConfirm();

  return (
    <div className="relative left-1/4 top-1/4 h-2/5 w-1/2 rounded border border-gray-500 bg-white p-4">
      <h2 className="mb-4 border-b-2 border-dashed border-sky-500 text-3xl">Specify Custom Field</h2>
      <button className="absolute right-0 top-0 h-fit w-fit border-none" onClick={onHandleCancel}>
        X
      </button>
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
          className="w-48 rounded border-2 border-gray-500 p-4"
          type="text"
          onChange={(event) => {
            onHandleNameChange(event);
          }}
          name="variable_name"
          placeholder="Enter Column Name"
          value={columnName}
        />
      </div>
      {selectedType === CustomFieldValue.DATE && (
        <div className="pb-4 pt-4">
          <div className="flex">
            <span className="mr-2">Is Future Date?</span>
            <input
              onChange={() => setIsDateInFuture(!isDateInFuture)}
              type="checkbox"
              name="distance"
              id="year"
              value="year"
              checked={isDateInFuture}
            />
          </div>
          <div>
            <span className="mr-2">Select Count</span>
            <input
              type="range"
              id="date-count"
              name="date-count"
              min="3"
              max="80"
              value={dateCount}
              onChange={(event) => onHandleDateCountChange(event)}
            />
          </div>
          <label>
            Distance From Today:{dateCount} years
          </label>
        </div>
      )}
      {selectedType === CustomFieldValue.BOOLEAN && (
        <div className="flex flex-row">
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
            className="w-48 rounded border-2 border-gray-500 p-4"
            type="text"
            placeholder="state1, state2, state3"
            onChange={(event) => {
              onHandleOptionsChange(event);
            }}
            name="state-options"
            value={options}
          />
          <span className="ml-2 mt-2 text-gray-400">Add Comma Separated Values</span>
        </div>
      )}
      {selectedType === CustomFieldValue.CUSTOM_STRING && (
        <div className="pb-4 pt-4">
          <label className="mr-14">Text </label>
          <input
            className="w-48 rounded border-2 border-gray-500 p-4"
            type="text"
            placeholder="#@&:^"
            onChange={(event) => {
              onHandleOptionsChange(event);
            }}
            name="text"
            value={options}
          />
        </div>
      )}
      <div className="border-t-2 border-dashed border-sky-500 pt-4">
        <button
          className={isConfirmDisabled ? 'cursor-not-allowed bg-gray-300' : ''}
          disabled={isConfirmDisabled}
          onClick={submitNewField}>
          Confirm
        </button>
      </div>
    </div>
  );
};

export { CustomRandomFieldForm };
