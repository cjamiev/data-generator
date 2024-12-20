import { ChangeEvent, useState } from "react";
import { CustomFieldLabel } from "../types/randomField";

export interface ISwitchLabel { onLabel: string, offLabel: string };
export interface IRandomField { variableName: string, options: string };
interface IPredefinedSelection {
  onHandleSelection: (selectedType: string, field: IRandomField) => void;
}

const NewCustomField = ({ onHandleSelection }: IPredefinedSelection) => {
  const [selectedType, setSelectedType] = useState<string>(CustomFieldLabel.DATE)
  const [newFieldLabel, setNewFieldLabel] = useState<string>('')
  const [options, setOptions] = useState<string>('')
  const [switchLabels, setSwitchLabels] = useState<ISwitchLabel>({ onLabel: '', offLabel: '' })
  const [dateModifier, setDateModifier] = useState<string>('year');
  const [dateCount, setDateCount] = useState<number>(1);

  const onHandleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewFieldLabel(event.target.value)
  }

  const onHandleOnLabelChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSwitchLabels({ ...switchLabels, onLabel: event.target.value })
  }

  const onHandleOffLabelChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSwitchLabels({ ...switchLabels, offLabel: event.target.value })
  }

  const onHandleDateCountChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDateCount(Number(event.target.value))
  }

  const onHandleOptionsChange = (event: ChangeEvent<HTMLInputElement>) => {
    setOptions(event.target.value);
  }

  const submitNewField = () => {
    if (selectedType === CustomFieldLabel.DATE) {
      onHandleSelection(selectedType, { variableName: newFieldLabel, options: dateCount + ',' + dateModifier })
    }
    if (selectedType === CustomFieldLabel.BOOLEAN) {
      onHandleSelection(selectedType, { variableName: newFieldLabel, options: switchLabels.onLabel + ',' + switchLabels.offLabel })
    }
    else {
      onHandleSelection(selectedType, { variableName: newFieldLabel, options })
    }
  }

  return (
    <div className="p-2 border border-gray-500 rounded w-fit h-fit">
      <div className="flex">
        <input onChange={() => setSelectedType(CustomFieldLabel.DATE)} type="radio" name="new_custom_field" id={CustomFieldLabel.DATE} value={CustomFieldLabel.DATE} checked={selectedType === CustomFieldLabel.DATE} />
        <label className="ml-2 w-12" htmlFor={CustomFieldLabel.DATE}>{CustomFieldLabel.DATE}</label>
        <input onChange={() => setSelectedType(CustomFieldLabel.BOOLEAN)} type="radio" name="new_custom_field" id={CustomFieldLabel.BOOLEAN} value={CustomFieldLabel.BOOLEAN} checked={selectedType === CustomFieldLabel.BOOLEAN} />
        <label className="ml-2 w-20" htmlFor={CustomFieldLabel.BOOLEAN}>{CustomFieldLabel.BOOLEAN}</label>
        <input onChange={() => setSelectedType(CustomFieldLabel.CUSTOM_STATE)} type="radio" name="new_custom_field" id={CustomFieldLabel.CUSTOM_STATE} value={CustomFieldLabel.CUSTOM_STATE} checked={selectedType === CustomFieldLabel.CUSTOM_STATE} />
        <label className="ml-2 w-32" htmlFor={CustomFieldLabel.CUSTOM_STATE}>{CustomFieldLabel.CUSTOM_STATE}</label>
        <input onChange={() => setSelectedType(CustomFieldLabel.CUSTOM_STRING)} type="radio" name="new_custom_field" id={CustomFieldLabel.CUSTOM_STRING} value={CustomFieldLabel.CUSTOM_STRING} checked={selectedType === CustomFieldLabel.CUSTOM_STRING} />
        <label className="ml-2 w-32" htmlFor={CustomFieldLabel.CUSTOM_STRING}>{CustomFieldLabel.CUSTOM_STRING}</label>
      </div>
      <div className="pt-4 pb-4">
        <label className="mr-12">Name</label>
        <input type="text" onChange={(event) => { onHandleNameChange(event); }} name='variable_name' value={newFieldLabel} />
      </div>
      {selectedType === CustomFieldLabel.DATE &&
        <div className="pt-4 pb-4">
          <div className="flex">
            <span className='mr-2'>Select Modifier</span>
            <input onChange={() => setDateModifier('year')} type="radio" name="distance" id='year' value='year' checked={dateModifier === 'year'} />
            <label className="mr-2 ml-2 w-10" htmlFor='year'>Year</label>
            <input onChange={() => setDateModifier('month')} type="radio" name="distance" id='month' value='month' checked={dateModifier === 'month'} />
            <label className="mr-2 ml-2 w-12" htmlFor='month'>Month</label>
            <input onChange={() => setDateModifier('day')} type="radio" name="distance" id='day' value='day' checked={dateModifier === 'day'} />
            <label className="mr-2 ml-2 w-12" htmlFor='day'>Day</label>
          </div>
          <div>
            <span className='mr-2'>Select Count</span>
            <input type="range" id="date-count" name="date-count" min="1" max="100" onChange={(event) => onHandleDateCountChange(event)} />
          </div>
          <label>Distance From Today:{dateCount} {dateModifier} </label>
        </div>
      }
      {selectedType === CustomFieldLabel.BOOLEAN &&
        <div>
          <div className="pt-4 pb-4">
            <label className="mr-4">Label One</label>
            <input type="text" placeholder="On" onChange={(event) => { onHandleOnLabelChange(event); }} name='on-label' value={switchLabels.onLabel} />
          </div>
          <div className="pt-4 pb-4">
            <label className="mr-4">Label Two</label>
            <input type="text" placeholder="Off" onChange={(event) => { onHandleOffLabelChange(event); }} name='off-label' value={switchLabels.offLabel} />
          </div>
        </div>
      }
      {selectedType === CustomFieldLabel.CUSTOM_STATE && <div className="pt-4 pb-4">
        <label className="mr-11">States</label>
        <input type="text" placeholder="state1, state2, state3" onChange={(event) => { onHandleOptionsChange(event); }} name='state-options' value={options} />
        <div className='mt-2'>Add Comma Seperated Values</div>
      </div>}
      {selectedType === CustomFieldLabel.CUSTOM_STRING && <div className="pt-4 pb-4">
        <label className="mr-14">Text </label>
        <input type="text" placeholder="#@&:^" onChange={(event) => { onHandleOptionsChange(event); }} name='text' value={options} />
        <div className='mt-2'>Formula # - Digit, @ - Letter, & - Alphanumeric, : Current Date, ^ count</div>
      </div>}
      <button onClick={submitNewField}>Confirm</button>
    </div>
  )
}

export { NewCustomField }
