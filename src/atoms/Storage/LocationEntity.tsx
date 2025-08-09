import { SetStateAction, useState } from 'react';
import useStorageContent from '../../hooks/useStorageContent';
import { useAppDispatch } from '../../store';
import { addLocation, deleteLocation } from '../../store/location/locationSlice';
import { Location } from '../../models/storage';
import { capitalizeEachWord } from '../../utils/stringHelper';

const placeHolderBatchContent = 'code;state;city1,city2,city3\ncode2;state2;city1,city2,city3\ncode3;state3;city1,city2,city3';
// Making sure no extra spaces and each word gets capitilzed correctly
const formatCities = (cities: string) => {
  return cities.split(',').map(i => capitalizeEachWord(i.trim())).join(',');
}

const LocationEntity = () => {
  const { locations } = useStorageContent();
  const dispatch = useAppDispatch();
  const [isBatchMode, setIsBatchMode] = useState(true);
  const [batchContent, setBatchContent] = useState('');
  const [newLocationCode, setNewLocationCode] = useState('');
  const [newLocationState, setNewLocationState] = useState('');
  const [newLocationCities, setNewLocationCities] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [alertMsg, setAlertMsg] = useState('');

  const onChange = (e: { target: { value: SetStateAction<string>; name: SetStateAction<string>; }; }) => {
    if (e.target.name === 'locationcode') {
      setNewLocationCode(e.target.value);
    } else if (e.target.name === 'locationstate') {
      setNewLocationState(e.target.value);
    } else {
      setNewLocationCities(e.target.value);
    }
  }

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (!isBatchMode) {
      if (!newLocationCode) {
        return;
      }
      const newLocation: Location = { code: newLocationCode.toLocaleUpperCase(), state: capitalizeEachWord(newLocationState), cities: formatCities(newLocationCities) };
      const hasDuplicate = locations.some(l => l.code === newLocation.code);
      if (!hasDuplicate) {
        dispatch(addLocation(newLocation));
        setNewLocationCode('')
        setNewLocationState('')
        setNewLocationCities('')
        setErrorMsg('');
        setAlertMsg('Successfully Added ' + newLocation.code);
        setTimeout(() => { setAlertMsg('') }, 5000);
      } else {
        setErrorMsg('Error: Duplicate record found');
      }
    }
    else {
      let hasDuplicateError = false;
      let hasMissingDataError = false;
      const batchLines = batchContent.split('\n');
      batchLines.forEach(line => {
        const [newLocationCode = '', newLocationState = '', newLocationCities = ''] = line.split(';');
        const newLocation: Location = { code: newLocationCode.toLocaleUpperCase(), state: capitalizeEachWord(newLocationState), cities: formatCities(newLocationCities) };
        const hasDuplicate = locations.some(l => l.code === newLocation.code);
        if (!newLocationCode) {
          hasMissingDataError = true;
        }
        else if (hasDuplicate) {
          hasDuplicateError = true;
        } else {
          dispatch(addLocation(newLocation));
        }
      });
      if (hasDuplicateError) {
        setErrorMsg('Error: Duplicate record found');
      }
      else if (hasMissingDataError) {
        setErrorMsg('Error: Missing id');
      } else {
        setAlertMsg('Successfully Added in batch');
        setTimeout(() => { setAlertMsg('') }, 5000);
      }
      setBatchContent('');
    }
  }

  const handleDelete = (locationCode: string) => {
    dispatch(deleteLocation(locationCode));
    setAlertMsg('Successfully Deleted ' + locationCode);
    setTimeout(() => { setAlertMsg('') }, 5000);
  }

  const handleBatchModeChange = () => { setIsBatchMode(!isBatchMode); }

  const handleBatchContentChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setBatchContent(e.target.value);
  }


  return (
    <div>
      <div className='relative '>
        <h2 className="mb-4 text-4xl">Location: State and Cities</h2>
        {errorMsg ? <span className='absolute top-0 left-108 p-2 bg-red-500 text-white border rounded border-red-600'>{errorMsg}</span> : null}
        {alertMsg ? <span className='absolute top-0 left-108 p-2 bg-green-500 text-white border rounded border-green-600'>{alertMsg}</span> : null}
      </div>
      <div className='flex'>
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left rtl:text-right">
            <thead className="text-xs uppercase bg-white text-black">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Code
                </th>
                <th scope="col" className="px-6 py-3">
                  State
                </th>
                <th scope="col" className="px-6 py-3">
                  Cities
                </th>
                <th scope="col" className="px-6 py-3">
                  Delete
                </th>
              </tr>
            </thead>
            <tbody>
              {locations.map(e => {
                return <tr key={e.code} className="bg-white border-b border-gray-700">
                  <td scope="row" className="px-6 py-4">
                    {e.code}
                  </td>
                  <td scope="row" className="px-6 py-4">
                    {e.state}
                  </td>
                  <td scope="row" className="px-6 py-4 max-w-xl overflow-auto">
                    {e.cities}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button className='w-fit h-fit border-none' onClick={() => handleDelete(e.code)}>X</button>
                  </td>
                </tr>
              })}
            </tbody>
          </table>
        </div>

        <div>
          <form className='relative rounded border border-gray-500 flex flex-col p-4 ml-4'>
            <div>
              <label>Is String Batch Format? <input className='ml-2' type='checkbox' checked={isBatchMode} onClick={handleBatchModeChange} /></label>
            </div>
            {isBatchMode
              ? <div className='mt-2 mb-2'>
                <textarea
                  className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-fit p-2.5 dark:placeholder-gray-400 text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  name="batch-content"
                  value={batchContent}
                  onChange={handleBatchContentChange}
                  rows={12}
                  cols={28}
                  placeholder={placeHolderBatchContent}
                />
              </div>
              : <>
                <div className='flex mb-2'>
                  <label htmlFor="locationcode" className="block mr-2 text-sm font-medium text-black place-content-center">Code:</label>
                  <input type="text" id='locationcode' name="locationcode" value={newLocationCode} onChange={onChange} className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-fit p-2.5 dark:placeholder-gray-400 text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="IL" required />
                </div>
                <div className='flex mb-2'>
                  <label htmlFor="locationstate" className="block mr-2 text-sm font-medium text-black place-content-center">State:</label>
                  <input type="text" id='locationstate' name="locationstate" value={newLocationState} onChange={onChange} className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-fit p-2.5 dark:placeholder-gray-400 text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Illinois" required />
                </div>
                <div className='flex mb-2'>
                  <label htmlFor="locationcities" className="block mr-2 text-sm font-medium text-black place-content-center">Cities:</label>
                  <input type="text" id='locationcities' name="locationcities" value={newLocationCities} onChange={onChange} className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-fit p-2.5 dark:placeholder-gray-400 text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Chicago, Springfield, Urbana" required />
                </div></>}
            <button className='m-auto' onClick={handleSubmit}>Add Location</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export { LocationEntity };
