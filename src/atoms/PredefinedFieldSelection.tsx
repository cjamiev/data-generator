import { ChangeEvent } from 'react';
import { PredefinedRandomLabel, PredefinedRandomValue } from '../types/randomField';

interface IPredefinedSelection {
  predefinedSelection: string[];
  onHandleSelection: (event: ChangeEvent<HTMLInputElement>) => void;
}

// TODO: Un/Select All
const PredefinedFieldSelection = ({ predefinedSelection, onHandleSelection }: IPredefinedSelection) => {
  return (
    <div className="h-fit w-fit rounded border border-gray-500 p-2">
      <div className="flex">
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
          className="mr-2 w-6"
          onChange={(event) => onHandleSelection(event)}
          type="checkbox"
          id={PredefinedRandomValue.LAST_NAME}
          value={PredefinedRandomValue.LAST_NAME}
          checked={predefinedSelection.some((item) => item === PredefinedRandomValue.LAST_NAME)}
        />
        <label className="w-32 pt-2" htmlFor={PredefinedRandomValue.LAST_NAME}>
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
      <div className="flex">
        <input
          className="mr-2 w-6"
          onChange={(event) => onHandleSelection(event)}
          type="checkbox"
          id={PredefinedRandomValue.STREET}
          value={PredefinedRandomValue.STREET}
          checked={predefinedSelection.some((item) => item === PredefinedRandomValue.STREET)}
        />
        <label className="w-32 pt-2" htmlFor={PredefinedRandomValue.STREET}>
          {PredefinedRandomLabel.STREET}
        </label>
        <input
          className="mr-2 w-6"
          onChange={(event) => onHandleSelection(event)}
          type="checkbox"
          id={PredefinedRandomValue.CITY}
          value={PredefinedRandomValue.CITY}
          checked={predefinedSelection.some((item) => item === PredefinedRandomValue.CITY)}
        />
        <label className="w-32 pt-2" htmlFor={PredefinedRandomValue.CITY}>
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
      <div className="flex">
        <input
          className="mr-2 w-6"
          onChange={(event) => onHandleSelection(event)}
          type="checkbox"
          id={PredefinedRandomValue.SSN}
          value={PredefinedRandomValue.SSN}
          checked={predefinedSelection.some((item) => item === PredefinedRandomValue.SSN)}
        />
        <label className="w-32 pt-2" htmlFor={PredefinedRandomValue.SSN}>
          {PredefinedRandomLabel.SSN}
        </label>
        <input
          className="mr-2 w-6"
          onChange={(event) => onHandleSelection(event)}
          type="checkbox"
          id={PredefinedRandomValue.CREDIT_CARD}
          value={PredefinedRandomValue.CREDIT_CARD}
          checked={predefinedSelection.some((item) => item === PredefinedRandomValue.CREDIT_CARD)}
        />
        <label className="w-32 pt-2" htmlFor={PredefinedRandomValue.CREDIT_CARD}>
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
    </div>
  );
};

export { PredefinedFieldSelection };
