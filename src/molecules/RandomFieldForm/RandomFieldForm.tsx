import { ChangeEvent, useState } from 'react';
import { PredefinedFieldForm } from '../../atoms/PredefinedFieldForm/PredefinedFieldForm';
import { IRandomField, CustomRandomFieldForm } from '../../atoms/CustomRandomFieldForm/CustomRandomFieldForm';

interface IRandomFieldForm {
  predefinedSelection: string[];
  updatePredefinedSelection: (event: ChangeEvent<HTMLInputElement>) => void;
  confirmPredfinedSelection: () => void;
  onClickSelectAll: () => void;
  confirmCustomFieldSelection: (selectedType: string, field: IRandomField) => void;
}

const RandomFieldForm = ({
  predefinedSelection,
  updatePredefinedSelection,
  confirmPredfinedSelection,
  onClickSelectAll,
  confirmCustomFieldSelection,
}: IRandomFieldForm) => {
  const [showCustomFields, setShowCustomFields] = useState<boolean>(false);
  const [showPredefinedFields, setShowPredifinedFields] = useState<boolean>(false);

  const displayCustomFields = () => {
    setShowCustomFields(true);
  };

  const displayPredefinedFields = () => {
    setShowPredifinedFields(true);
  };

  const onClickConfirmForPredefinedFields = () => {
    setShowPredifinedFields(false);
    confirmPredfinedSelection();
  };

  const onClickConfirmForCustomField = (selectedType: string, field: IRandomField) => {
    setShowCustomFields(false);
    confirmCustomFieldSelection(selectedType, field);
  };

  const cancelNewFieldSelection = () => {
    setShowCustomFields(false);
  }

  return (
    <>
      {showCustomFields && (
        <div className="absolute left-0 top-0 h-full w-full backdrop-brightness-50 z-10">
          <CustomRandomFieldForm
            onHandleConfirm={onClickConfirmForCustomField}
            onHandleCancel={cancelNewFieldSelection}
          />
        </div>
      )}
      {showPredefinedFields && (
        <div className="absolute left-0 top-0 h-full w-full backdrop-brightness-50 z-10">
          <PredefinedFieldForm
            predefinedSelection={predefinedSelection}
            onHandleSelection={updatePredefinedSelection}
            onHandleSelectAll={onClickSelectAll}
            onHandleConfirm={onClickConfirmForPredefinedFields}
          />
        </div>
      )}
      <button className="mr-4" onClick={displayCustomFields}>
        + Field
      </button>
      <button onClick={displayPredefinedFields}>+ Predefined Field</button>
    </>
  );
};

export { RandomFieldForm };
