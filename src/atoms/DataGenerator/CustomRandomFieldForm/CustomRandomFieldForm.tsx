import { ChangeEvent, useState } from 'react';
import { CustomFieldLabel } from '../../../types/randomField';
import { dateFormats } from '../../../types/date';
import { CustomStringForm } from '../CustomStringForm';
import { IFormulaMap } from '../../../types/formula';

export interface IRandomField {
  variableName: string;
  options: string;
}
interface ICustomRandomFieldForm {
  onHandleConfirm: (selectedType: string, field: IRandomField) => void;
  onHandleCancel: () => void;
  currentLength: number;
}

const CustomRandomFieldForm = ({ onHandleConfirm, onHandleCancel, currentLength }: ICustomRandomFieldForm) => {
  const [fieldParams, setFieldParams] = useState<IFormulaMap[]>([]);
  const [selectedType, setSelectedType] = useState<string>(CustomFieldLabel.CUSTOM_STRING);
  const [columnName, setColumnName] = useState<string>(`field${currentLength}`);
  const [options, setOptions] = useState<string>('');
  const [booleanWeight, setBooleanWeight] = useState<number>(50);
  const [isDateInFuture, setIsDateInFuture] = useState<boolean>(false);
  const [dateCount, setDateCount] = useState<number>(3);
  const [format, setFormat] = useState(dateFormats[0]);
  const [minAmount, setMinAmount] = useState<number>(0);
  const [maxAmount, setMaxAmount] = useState<number>(1000);
  const [isWeightedRange, setIsWeightedRange] = useState<boolean>(false);
  const [isMoneyFormat, setIsMoneyFormat] = useState<boolean>(false);
  const hasRangeError = minAmount > maxAmount;

  const onHandleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setColumnName(event.target.value);
  };

  const onHandleBooleanWeightChange = (event: ChangeEvent<HTMLInputElement>) => {
    setBooleanWeight(Number(event.target.value));
  };

  const onHandleDateCountChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDateCount(Number(event.target.value));
  };

  const onHandleFormatChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setFormat(event.target.value);
  };

  const onHandleMinChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value: string = event.target.value;
    const valueAsNumber = Number(value);
    if (!value) {
      setMinAmount(0);
    } else if (isNaN(valueAsNumber)) {
      return;
    } else {
      setMinAmount(valueAsNumber);
    }
  };

  const onHandleMaxChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value: string = event.target.value;
    const valueAsNumber = Number(value);
    if (!value) {
      setMaxAmount(0);
    } else if (isNaN(valueAsNumber)) {
      return;
    } else {
      setMaxAmount(valueAsNumber);
    }
  };

  const onHandleOptionsChange = (event: ChangeEvent<HTMLInputElement>) => {
    setOptions(event.target.value);
  };

  const submitNewField = () => {
    if (selectedType === CustomFieldLabel.CUSTOM_STRING) {
      onHandleConfirm(selectedType, {
        variableName: columnName,
        options: JSON.stringify(fieldParams),
      });
    } else if (selectedType === CustomFieldLabel.DATE) {
      onHandleConfirm(selectedType, {
        variableName: columnName,
        options: dateCount + ',' + String(isDateInFuture) + ',' + format,
      });
    } else if (selectedType === CustomFieldLabel.BOOLEAN) {
      onHandleConfirm(selectedType, {
        variableName: columnName,
        options: String(booleanWeight),
      });
    } else if (selectedType === CustomFieldLabel.RANGE) {
      onHandleConfirm(selectedType, {
        variableName: columnName,
        options: minAmount + ',' + maxAmount + ',' + String(isWeightedRange) + ',' + String(isMoneyFormat),
      });
    } else {
      onHandleConfirm(selectedType, { variableName: columnName, options });
    }
  };

  const getShouldDisableConfirm = () => {
    const isValidName = Boolean(columnName);
    if (selectedType === CustomFieldLabel.CUSTOM_STRING) {
      return !fieldParams.length;
    }
    if (selectedType === CustomFieldLabel.DATE || selectedType === CustomFieldLabel.BOOLEAN) {
      return !isValidName;
    }
    if (selectedType === CustomFieldLabel.CUSTOM_STATE) {
      return !isValidName || !options;
    }
    if (selectedType === CustomFieldLabel.RANGE) {
      return !isValidName || hasRangeError;
    }
  };

  const isConfirmDisabled = getShouldDisableConfirm();

  return (
    <div className="relative left-10 top-12 h-5/6 w-5/6 rounded border border-gray-500 bg-white">
      <div className="mb-4 border-b-2 border-dashed border-sky-500 p-4">
        <h2 className="text-3xl">Specify Custom Field</h2>
        <button className="absolute right-0 top-0 h-fit w-fit border-none" onClick={onHandleCancel}>
          X
        </button>
      </div>
      <div className="p-4">
        <div className="flex">
          <input
            onChange={() => setSelectedType(CustomFieldLabel.CUSTOM_STRING)}
            type="radio"
            name="new_custom_field"
            id={CustomFieldLabel.CUSTOM_STRING}
            value={CustomFieldLabel.CUSTOM_STRING}
            checked={selectedType === CustomFieldLabel.CUSTOM_STRING}
          />
          <label className="ml-2 w-32" htmlFor={CustomFieldLabel.CUSTOM_STRING}>
            {CustomFieldLabel.CUSTOM_STRING}
          </label>
          <input
            onChange={() => setSelectedType(CustomFieldLabel.DATE)}
            type="radio"
            name="new_custom_field"
            id={CustomFieldLabel.DATE}
            value={CustomFieldLabel.DATE}
            checked={selectedType === CustomFieldLabel.DATE}
          />
          <label className="ml-2 w-12" htmlFor={CustomFieldLabel.DATE}>
            {CustomFieldLabel.DATE}
          </label>
          <input
            onChange={() => setSelectedType(CustomFieldLabel.BOOLEAN)}
            type="radio"
            name="new_custom_field"
            id={CustomFieldLabel.BOOLEAN}
            value={CustomFieldLabel.BOOLEAN}
            checked={selectedType === CustomFieldLabel.BOOLEAN}
          />
          <label className="ml-2 w-20" htmlFor={CustomFieldLabel.BOOLEAN}>
            {CustomFieldLabel.BOOLEAN}
          </label>
          <input
            onChange={() => setSelectedType(CustomFieldLabel.RANGE)}
            type="radio"
            name="new_custom_field"
            id={CustomFieldLabel.RANGE}
            value={CustomFieldLabel.RANGE}
            checked={selectedType === CustomFieldLabel.RANGE}
          />
          <label className="ml-2 w-20" htmlFor={CustomFieldLabel.RANGE}>
            {CustomFieldLabel.RANGE}
          </label>
          <input
            onChange={() => setSelectedType(CustomFieldLabel.CUSTOM_STATE)}
            type="radio"
            name="new_custom_field"
            id={CustomFieldLabel.CUSTOM_STATE}
            value={CustomFieldLabel.CUSTOM_STATE}
            checked={selectedType === CustomFieldLabel.CUSTOM_STATE}
          />
          <label className="ml-2 w-32" htmlFor={CustomFieldLabel.CUSTOM_STATE}>
            {CustomFieldLabel.CUSTOM_STATE}
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
        {selectedType === CustomFieldLabel.DATE && (
          <div className="flex pb-4 pt-4">
            <div>
              <div className="flex">
                <label htmlFor="future-year" className="mr-2 font-bold">
                  Is Future Date?
                </label>
                <input
                  onChange={() => setIsDateInFuture(!isDateInFuture)}
                  type="checkbox"
                  name="future-year"
                  id="future-year"
                  value="future-year"
                  checked={isDateInFuture}
                />
              </div>
              <div>
                <span className="mr-2 font-bold">Select Count</span>
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
              <label className="font-bold">
                Distance From Today:<span className="font-medium"> {dateCount} years</span>
              </label>
            </div>
            <div className="ml-2 flex flex-col">
              <span className="font-bold">Select Date Format</span>
              <select
                className="w-64 rounded border-2 border-gray-500"
                onChange={(event) => {
                  onHandleFormatChange(event);
                }}>
                {dateFormats.map((format) => {
                  return (
                    <option key={format} value={format}>
                      {format}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
        )}
        {selectedType === CustomFieldLabel.BOOLEAN && (
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
        {selectedType === CustomFieldLabel.CUSTOM_STATE && (
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
          </div>
        )}
        {selectedType === CustomFieldLabel.CUSTOM_STRING && (
          <div className="pb-2 pt-2">
            <CustomStringForm
              fieldParams={fieldParams}
              onUpdateFields={(updatedFields) => setFieldParams(updatedFields)}
            />
          </div>
        )}
        {selectedType === CustomFieldLabel.RANGE && (
          <div>
            <label className="mr-5">Min Value</label>
            <input
              className="w-48 rounded border-2 border-gray-500 p-4"
              type="text"
              onChange={(event) => {
                onHandleMinChange(event);
              }}
              value={minAmount}
            />
            <label className="ml-2 mr-2">Max Value</label>
            <input
              className="w-48 rounded border-2 border-gray-500 p-4"
              type="text"
              onChange={(event) => {
                onHandleMaxChange(event);
              }}
              value={maxAmount}
            />
            {hasRangeError && <div className="text-red-800">Max must be larger than Min</div>}
            <div className="mt-2 flex flex-col">
              <div>
                <label htmlFor="is-weighted-range" className="mr-2 font-bold">
                  Is Number of Digits Equally Weighted
                </label>
                <input
                  onChange={() => setIsWeightedRange(!isWeightedRange)}
                  type="checkbox"
                  name="is-weighted-range"
                  id="is-weighted-range"
                  value="is-weighted-range"
                  checked={isWeightedRange}
                />
              </div>
              <div>
                <label htmlFor="is-money-format" className="mr-2 font-bold">
                  Money Formatted
                </label>
                <input
                  onChange={() => setIsMoneyFormat(!isMoneyFormat)}
                  type="checkbox"
                  name="is-money-format"
                  id="is-money-format"
                  value="is-money-format"
                  checked={isMoneyFormat}
                />
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="absolute bottom-4 w-full border-t-2 border-dashed border-sky-500 p-4">
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
