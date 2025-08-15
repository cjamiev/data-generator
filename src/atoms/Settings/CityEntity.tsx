import { useState } from 'react';
import useStorageContent from '../../hooks/useStorageContent';
import { useAppDispatch } from '../../store';
import { addCity, deleteCity } from '../../store/city/citySlice';
import { City } from '../../models/storage';
import { capitalizeEachWord } from '../../utils/stringHelper';

const placeHolderBatchContent = 'city;statecode1,statecode2\ncity2;statecode1,statecode2';
// Making sure no extra spaces and each state abbreviation gets capitilzed
const formatOrigin = (states: string) => {
  return states.split(',').map(i => i.trim().toLocaleUpperCase()).join(',');
}

const CityEntity = () => {
  const { cities } = useStorageContent();
  const dispatch = useAppDispatch();
  const [isBatchMode, setIsBatchMode] = useState(true);
  const [batchContent, setBatchContent] = useState('');
  const [newCityId, setnNewCityId] = useState('');
  const [newCityOrigin, setNewCityOrigin] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [alertMsg, setAlertMsg] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === 'cityid') {
      setnNewCityId(e.target.value);
    } else {
      setNewCityOrigin(e.target.value);
    }
  }

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (!isBatchMode) {
      if (!newCityId) {
        return;
      }
      const newCity: City = { id: capitalizeEachWord(newCityId), origin: formatOrigin(newCityOrigin) };
      const hasDuplicate = cities.some(l => l.id === newCity.id);
      if (!hasDuplicate) {
        dispatch(addCity(newCity));
        setnNewCityId('');
        setNewCityOrigin('');
        setErrorMsg('');
        setAlertMsg('Successfully Added ' + newCity.id);
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
        const [newCityId = '', newCityOrigin = ''] = line.split(';');
        const newCity: City = { id: capitalizeEachWord(newCityId), origin: formatOrigin(newCityOrigin) };
        const hasDuplicate = cities.some(l => l.id === newCity.id);
        if (!newCityId) {
          hasMissingDataError = true;
        }
        else if (hasDuplicate) {
          hasDuplicateError = true;
        } else {
          dispatch(addCity(newCity));
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

  const handleDelete = (cityCode: string) => {
    dispatch(deleteCity(cityCode));
    setAlertMsg('Successfully Deleted ' + cityCode);
    setTimeout(() => { setAlertMsg('') }, 5000);
  }

  const handleBatchModeChange = () => { setIsBatchMode(!isBatchMode); }

  const handleBatchContentChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setBatchContent(e.target.value);
  }


  return (
    <div>
      <div className='relative '>
        <h2 className="mb-4 text-4xl">Cities</h2>
        {errorMsg ? <span className='absolute top-0 left-108 p-2 bg-red-500 text-white border rounded border-red-600'>{errorMsg}</span> : null}
        {alertMsg ? <span className='absolute top-0 left-108 p-2 bg-green-500 text-white border rounded border-green-600'>{alertMsg}</span> : null}
      </div>
      <div className='flex'>
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left rtl:text-right">
            <thead className="text-xs uppercase bg-white text-black">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Id
                </th>
                <th scope="col" className="px-6 py-3">
                  Origin
                </th>
                <th scope="col" className="px-6 py-3">
                  Delete
                </th>
              </tr>
            </thead>
            <tbody>
              {cities.map(e => {
                return <tr key={e.id} className="bg-white border-b border-gray-700">
                  <td scope="row" className="px-6 py-4">
                    {e.id}
                  </td>
                  <td scope="row" className="px-6 py-4">
                    {e.origin}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button className='w-fit h-fit border-none' onClick={() => handleDelete(e.id)}>X</button>
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
                  <label htmlFor="cityid" className="block mr-2 text-sm font-medium text-black place-content-center">City:</label>
                  <input type="text" id='cityid' name="cityid" value={newCityId} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-fit p-2.5 dark:placeholder-gray-400 text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Chicago" required />
                </div>
                <div className='flex mb-2'>
                  <label htmlFor="citieorigin" className="block mr-2 text-sm font-medium text-black place-content-center">State:</label>
                  <input type="text" id='citieorigin' name="citieorigin" value={newCityOrigin} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-fit p-2.5 dark:placeholder-gray-400 text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="IL" required />
                </div>
              </>}
            <button className='m-auto' onClick={handleSubmit}>Add City</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export { CityEntity };
