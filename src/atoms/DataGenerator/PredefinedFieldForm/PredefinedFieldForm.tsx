import { ChangeEvent } from 'react';
import { PredefinedRandomLabel } from '../../../types/randomField';

interface IPredefinedSelection {
  predefinedSelection: string[];
  onHandleSelection: (event: ChangeEvent<HTMLInputElement>) => void;
  onHandleSelectAll: () => void;
  onHandleConfirm: () => void;
}

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
          id={PredefinedRandomLabel.FIRST_NAME}
          value={PredefinedRandomLabel.FIRST_NAME}
          checked={predefinedSelection.some((item) => item === PredefinedRandomLabel.FIRST_NAME)}
        />
        <label className="w-32 pt-2" htmlFor={PredefinedRandomLabel.FIRST_NAME}>
          {PredefinedRandomLabel.FIRST_NAME}
        </label>
        <input
          className="w-6"
          onChange={(event) => onHandleSelection(event)}
          type="checkbox"
          id={PredefinedRandomLabel.LAST_NAME}
          value={PredefinedRandomLabel.LAST_NAME}
          checked={predefinedSelection.some((item) => item === PredefinedRandomLabel.LAST_NAME)}
        />
        <label className="w-32 pl-2 pt-2" htmlFor={PredefinedRandomLabel.LAST_NAME}>
          {PredefinedRandomLabel.LAST_NAME}
        </label>
        <input
          className="mr-2 w-6"
          onChange={(event) => onHandleSelection(event)}
          type="checkbox"
          id={PredefinedRandomLabel.EMAIL}
          value={PredefinedRandomLabel.EMAIL}
          checked={predefinedSelection.some((item) => item === PredefinedRandomLabel.EMAIL)}
        />
        <label className="w-32 pt-2" htmlFor={PredefinedRandomLabel.EMAIL}>
          {PredefinedRandomLabel.EMAIL}
        </label>
        <input
          className="mr-2 w-6"
          onChange={(event) => onHandleSelection(event)}
          type="checkbox"
          id={PredefinedRandomLabel.PHONE_NUMBER}
          value={PredefinedRandomLabel.PHONE_NUMBER}
          checked={predefinedSelection.some((item) => item === PredefinedRandomLabel.PHONE_NUMBER)}
        />
        <label className="w-32 pt-2" htmlFor={PredefinedRandomLabel.PHONE_NUMBER}>
          {PredefinedRandomLabel.PHONE_NUMBER}
        </label>
        <input
          className="mr-2 w-6"
          onChange={(event) => onHandleSelection(event)}
          type="checkbox"
          id={PredefinedRandomLabel.BIRTH_DATE}
          value={PredefinedRandomLabel.BIRTH_DATE}
          checked={predefinedSelection.some((item) => item === PredefinedRandomLabel.BIRTH_DATE)}
        />
        <label className="w-32 pt-2" htmlFor={PredefinedRandomLabel.BIRTH_DATE}>
          {PredefinedRandomLabel.BIRTH_DATE}
        </label>
      </div>
      <div className="mb-8 flex">
        <input
          className="w-6"
          onChange={(event) => onHandleSelection(event)}
          type="checkbox"
          id={PredefinedRandomLabel.STREET}
          value={PredefinedRandomLabel.STREET}
          checked={predefinedSelection.some((item) => item === PredefinedRandomLabel.STREET)}
        />
        <label className="w-32 pl-2 pt-2" htmlFor={PredefinedRandomLabel.STREET}>
          {PredefinedRandomLabel.STREET}
        </label>
        <input
          className="w-6"
          onChange={(event) => onHandleSelection(event)}
          type="checkbox"
          id={PredefinedRandomLabel.CITY}
          value={PredefinedRandomLabel.CITY}
          checked={predefinedSelection.some((item) => item === PredefinedRandomLabel.CITY)}
        />
        <label className="w-32 pl-2 pt-2" htmlFor={PredefinedRandomLabel.CITY}>
          {PredefinedRandomLabel.CITY}
        </label>
        <input
          className="mr-2 w-6"
          onChange={(event) => onHandleSelection(event)}
          type="checkbox"
          id={PredefinedRandomLabel.STATE}
          value={PredefinedRandomLabel.STATE}
          checked={predefinedSelection.some((item) => item === PredefinedRandomLabel.STATE)}
        />
        <label className="w-32 pt-2" htmlFor={PredefinedRandomLabel.STATE}>
          {PredefinedRandomLabel.STATE}
        </label>
        <input
          className="mr-2 w-6"
          onChange={(event) => onHandleSelection(event)}
          type="checkbox"
          id={PredefinedRandomLabel.ZIP_CODE}
          value={PredefinedRandomLabel.ZIP_CODE}
          checked={predefinedSelection.some((item) => item === PredefinedRandomLabel.ZIP_CODE)}
        />
        <label className="w-32 pt-2" htmlFor={PredefinedRandomLabel.ZIP_CODE}>
          {PredefinedRandomLabel.ZIP_CODE}
        </label>
      </div>
      <div className="mb-8 flex">
        <input
          className="w-6"
          onChange={(event) => onHandleSelection(event)}
          type="checkbox"
          id={PredefinedRandomLabel.SSN}
          value={PredefinedRandomLabel.SSN}
          checked={predefinedSelection.some((item) => item === PredefinedRandomLabel.SSN)}
        />
        <label className="w-32 pl-2 pt-2" htmlFor={PredefinedRandomLabel.SSN}>
          {PredefinedRandomLabel.SSN}
        </label>
        <input
          className="w-6"
          onChange={(event) => onHandleSelection(event)}
          type="checkbox"
          id={PredefinedRandomLabel.CREDIT_CARD}
          value={PredefinedRandomLabel.CREDIT_CARD}
          checked={predefinedSelection.some((item) => item === PredefinedRandomLabel.CREDIT_CARD)}
        />
        <label className="w-32 pl-2 pt-2" htmlFor={PredefinedRandomLabel.CREDIT_CARD}>
          {PredefinedRandomLabel.CREDIT_CARD}
        </label>
        <input
          className="mr-2 w-6"
          onChange={(event) => onHandleSelection(event)}
          type="checkbox"
          id={PredefinedRandomLabel.ID}
          value={PredefinedRandomLabel.ID}
          checked={predefinedSelection.some((item) => item === PredefinedRandomLabel.ID)}
        />
        <label className="w-32 pt-2" htmlFor={PredefinedRandomLabel.ID}>
          {PredefinedRandomLabel.ID}
        </label>
        <input
          className="mr-2 w-6"
          onChange={(event) => onHandleSelection(event)}
          type="checkbox"
          id={PredefinedRandomLabel.UUID}
          value={PredefinedRandomLabel.UUID}
          checked={predefinedSelection.some((item) => item === PredefinedRandomLabel.UUID)}
        />
        <label className="w-32 pt-2" htmlFor={PredefinedRandomLabel.UUID}>
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
