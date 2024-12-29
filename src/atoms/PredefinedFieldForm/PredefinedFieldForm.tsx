import { ChangeEvent } from 'react';
import { PredefinedRandomLabel, PredefinedRandomValue } from '../../types/randomField';

interface IPredefinedSelection {
  predefinedSelection: string[];
  onHandleSelection: (event: ChangeEvent<HTMLInputElement>) => void;
  onHandleSelectAll: () => void;
  onHandleConfirm: () => void;
}

// TODO: Un/Select All
const PredefinedFieldForm = ({
  predefinedSelection,
  onHandleSelection,
  onHandleSelectAll,
  onHandleConfirm,
}: IPredefinedSelection) => {
  return (
    <div className="relative left-1/4 top-1/4 h-2/5 w-1/2 rounded border border-gray-500 bg-white p-4">
      <h2 className="mb-4 border-b-2 border-dashed border-sky-500 text-3xl">Select Predefined Fields</h2>
      <button className="absolute right-0 top-0 h-fit w-fit border-none" onClick={onHandleConfirm}>
        X
      </button>
      <div className="mb-8 flex">
        <input
          className="mr-2 w-6"
          onChange={(event) => onHandleSelection(event)}
          type="checkbox"
          id={PredefinedRandomValue.FIRST_NAME}
          value={PredefinedRandomValue.FIRST_NAME}
          checked={predefinedSelection.some((item) => item === PredefinedRandomValue.FIRST_NAME)}
        />
        <label className="w-32 pt-2" htmlFor={PredefinedRandomValue.FIRST_NAME}>
          {PredefinedRandomLabel.FIRST_NAME}
        </label>
        <input
          className="w-6"
          onChange={(event) => onHandleSelection(event)}
          type="checkbox"
          id={PredefinedRandomValue.LAST_NAME}
          value={PredefinedRandomValue.LAST_NAME}
          checked={predefinedSelection.some((item) => item === PredefinedRandomValue.LAST_NAME)}
        />
        <label className="w-32 pl-2 pt-2" htmlFor={PredefinedRandomValue.LAST_NAME}>
          {PredefinedRandomLabel.LAST_NAME}
        </label>
        <input
          className="mr-2 w-6"
          onChange={(event) => onHandleSelection(event)}
          type="checkbox"
          id={PredefinedRandomValue.EMAIL}
          value={PredefinedRandomValue.EMAIL}
          checked={predefinedSelection.some((item) => item === PredefinedRandomValue.EMAIL)}
        />
        <label className="w-32 pt-2" htmlFor={PredefinedRandomValue.EMAIL}>
          {PredefinedRandomLabel.EMAIL}
        </label>
        <input
          className="mr-2 w-6"
          onChange={(event) => onHandleSelection(event)}
          type="checkbox"
          id={PredefinedRandomValue.PHONE_NUMBER}
          value={PredefinedRandomValue.PHONE_NUMBER}
          checked={predefinedSelection.some((item) => item === PredefinedRandomValue.PHONE_NUMBER)}
        />
        <label className="w-32 pt-2" htmlFor={PredefinedRandomValue.PHONE_NUMBER}>
          {PredefinedRandomLabel.PHONE_NUMBER}
        </label>
        <input
          className="mr-2 w-6"
          onChange={(event) => onHandleSelection(event)}
          type="checkbox"
          id={PredefinedRandomValue.BIRTH_DATE}
          value={PredefinedRandomValue.BIRTH_DATE}
          checked={predefinedSelection.some((item) => item === PredefinedRandomValue.BIRTH_DATE)}
        />
        <label className="w-32 pt-2" htmlFor={PredefinedRandomValue.BIRTH_DATE}>
          {PredefinedRandomLabel.BIRTH_DATE}
        </label>
      </div>
      <div className="mb-8 flex">
        <input
          className="w-6"
          onChange={(event) => onHandleSelection(event)}
          type="checkbox"
          id={PredefinedRandomValue.STREET}
          value={PredefinedRandomValue.STREET}
          checked={predefinedSelection.some((item) => item === PredefinedRandomValue.STREET)}
        />
        <label className="w-32 pl-2 pt-2" htmlFor={PredefinedRandomValue.STREET}>
          {PredefinedRandomLabel.STREET}
        </label>
        <input
          className="w-6"
          onChange={(event) => onHandleSelection(event)}
          type="checkbox"
          id={PredefinedRandomValue.CITY}
          value={PredefinedRandomValue.CITY}
          checked={predefinedSelection.some((item) => item === PredefinedRandomValue.CITY)}
        />
        <label className="w-32 pl-2 pt-2" htmlFor={PredefinedRandomValue.CITY}>
          {PredefinedRandomLabel.CITY}
        </label>
        <input
          className="mr-2 w-6"
          onChange={(event) => onHandleSelection(event)}
          type="checkbox"
          id={PredefinedRandomValue.STATE}
          value={PredefinedRandomValue.STATE}
          checked={predefinedSelection.some((item) => item === PredefinedRandomValue.STATE)}
        />
        <label className="w-32 pt-2" htmlFor={PredefinedRandomValue.STATE}>
          {PredefinedRandomLabel.STATE}
        </label>
        <input
          className="mr-2 w-6"
          onChange={(event) => onHandleSelection(event)}
          type="checkbox"
          id={PredefinedRandomValue.ZIP_CODE}
          value={PredefinedRandomValue.ZIP_CODE}
          checked={predefinedSelection.some((item) => item === PredefinedRandomValue.ZIP_CODE)}
        />
        <label className="w-32 pt-2" htmlFor={PredefinedRandomValue.ZIP_CODE}>
          {PredefinedRandomLabel.ZIP_CODE}
        </label>
      </div>
      <div className="mb-8 flex">
        <input
          className="w-6"
          onChange={(event) => onHandleSelection(event)}
          type="checkbox"
          id={PredefinedRandomValue.SSN}
          value={PredefinedRandomValue.SSN}
          checked={predefinedSelection.some((item) => item === PredefinedRandomValue.SSN)}
        />
        <label className="w-32 pl-2 pt-2" htmlFor={PredefinedRandomValue.SSN}>
          {PredefinedRandomLabel.SSN}
        </label>
        <input
          className="w-6"
          onChange={(event) => onHandleSelection(event)}
          type="checkbox"
          id={PredefinedRandomValue.CREDIT_CARD}
          value={PredefinedRandomValue.CREDIT_CARD}
          checked={predefinedSelection.some((item) => item === PredefinedRandomValue.CREDIT_CARD)}
        />
        <label className="w-32 pl-2 pt-2" htmlFor={PredefinedRandomValue.CREDIT_CARD}>
          {PredefinedRandomLabel.CREDIT_CARD}
        </label>
        <input
          className="mr-2 w-6"
          onChange={(event) => onHandleSelection(event)}
          type="checkbox"
          id={PredefinedRandomValue.ID}
          value={PredefinedRandomValue.ID}
          checked={predefinedSelection.some((item) => item === PredefinedRandomValue.ID)}
        />
        <label className="w-32 pt-2" htmlFor={PredefinedRandomValue.ID}>
          {PredefinedRandomLabel.ID}
        </label>
        <input
          className="mr-2 w-6"
          onChange={(event) => onHandleSelection(event)}
          type="checkbox"
          id={PredefinedRandomValue.UUID}
          value={PredefinedRandomValue.UUID}
          checked={predefinedSelection.some((item) => item === PredefinedRandomValue.UUID)}
        />
        <label className="w-32 pt-2" htmlFor={PredefinedRandomValue.UUID}>
          {PredefinedRandomLabel.UUID}
        </label>
      </div>
      <div className="border-t-2 border-dashed border-sky-500 pt-4">
        <button className="mr-4" onClick={onHandleSelectAll}>
          {predefinedSelection.length === 13 ? 'Unselect All' : 'Select All'}
        </button>
        <button onClick={onHandleConfirm}>Confirm</button>
      </div>
    </div>
  );
};

export { PredefinedFieldForm };
