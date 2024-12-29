import { ChangeEvent, useState } from 'react';
import { PredefinedFieldSelection } from '../atoms/PredefinedFieldSelection';
import { IRandomField, CustomFieldSelection } from '../atoms/CustomFieldSelection';

const RandomFieldForm = () => {
  const [showCustomFields, setShowCustomFields] = useState<boolean>(false);
  const [showPredefinedFields, setShowPredifinedFields] = useState<boolean>(false);
  const [predefinedSelection, setPredifinedSelection] = useState<string[]>([]);

  const displayCustomFields = () => {
    setShowCustomFields(true);
  };

  const hideCustomFields = () => {
    setShowCustomFields(false);
  };

  const displayPredefinedFields = () => {
    setShowPredifinedFields(true);
  };

  const hidePredefinedFields = () => {
    setShowPredifinedFields(false);
  };

  const updatePredefinedSelection = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedValue = event.target.value;
    const matched = predefinedSelection.some((item) => item === selectedValue);
    const updatedSelection = matched
      ? predefinedSelection.filter((item) => item !== selectedValue)
      : predefinedSelection.concat([selectedValue]);
    setPredifinedSelection(updatedSelection);
  };

  const updateNewFieldSelection = (selectedType: string, field: IRandomField) => {
    console.log(selectedType, field);
  };

  return (
    <>
      <label>{predefinedSelection.join(',')}</label>
      {showCustomFields && (
        <div>
          <CustomFieldSelection onHandleSelection={updateNewFieldSelection} />
          <button onClick={hideCustomFields}>Close</button>
        </div>
      )}
      {showPredefinedFields && (
        <div>
          <PredefinedFieldSelection
            predefinedSelection={predefinedSelection}
            onHandleSelection={updatePredefinedSelection}
          />
          <button onClick={hidePredefinedFields}>Close</button>
        </div>
      )}
      <button onClick={displayCustomFields}>Add Custom Field</button>
      <button onClick={displayPredefinedFields}>Add Predefined Field</button>
    </>
  );
};

export { RandomFieldForm };
