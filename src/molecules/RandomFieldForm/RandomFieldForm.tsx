import { ChangeEvent, useState } from 'react';
import { PredefinedFieldForm } from '../../atoms/PredefinedFieldForm/PredefinedFieldForm';
import { IRandomField, CustomRandomFieldForm } from '../../atoms/CustomRandomFieldForm/CustomRandomFieldForm';

interface IRandomFieldForm {
  predefinedSelection: string[];
  updatePredefinedSelection: (event: ChangeEvent<HTMLInputElement>) => void;
  confirmPredfinedSelection: () => void;
  onClickSelectAll: () => void;
}

const RandomFieldForm = ({
  predefinedSelection,
  updatePredefinedSelection,
  confirmPredfinedSelection,
  onClickSelectAll,
}: IRandomFieldForm) => {
  const [showCustomFields, setShowCustomFields] = useState<boolean>(false);
  const [showPredefinedFields, setShowPredifinedFields] = useState<boolean>(false);

  const displayCustomFields = () => {
    setShowCustomFields(true);
  };

  const hideCustomFields = () => {
    setShowCustomFields(false);
  };

  const displayPredefinedFields = () => {
    setShowPredifinedFields(true);
  };

  const onClickConfirm = () => {
    setShowPredifinedFields(false);
    confirmPredfinedSelection();
  };

  const updateNewFieldSelection = (selectedType: string, field: IRandomField) => {
    console.log(selectedType, field);
  };

  return (
    <>
      {showCustomFields && (
        <div>
          <CustomRandomFieldForm onHandleSelection={updateNewFieldSelection} />
          <button onClick={hideCustomFields}>Close</button>
        </div>
      )}
      {showPredefinedFields && (
        <div className="absolute left-0 top-0 h-full w-full backdrop-brightness-50">
          <PredefinedFieldForm
            predefinedSelection={predefinedSelection}
            onHandleSelection={updatePredefinedSelection}
            onHandleSelectAll={onClickSelectAll}
            onHandleConfirm={onClickConfirm}
          />
        </div>
      )}
      <button className="mr-4" onClick={displayCustomFields}>
        Add Custom Field
      </button>
      <button onClick={displayPredefinedFields}>Add Predefined Field</button>
    </>
  );
};

export { RandomFieldForm };
