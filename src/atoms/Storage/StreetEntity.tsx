import { SetStateAction, useState } from 'react';
import useStorageContent from '../../hooks/useStorageContent';
import { useAppDispatch } from '../../store';
import { addStreet, deleteStreet } from '../../store/street/streetSlice';
import { Street } from '../../models/storage';
import { capitalizeEachWord } from '../../utils/stringHelper';

const placeHolderBatchContent = 'street\nstreet2\nstreet3';

const StreetEntity = () => {
  const { streets } = useStorageContent();
  const dispatch = useAppDispatch();
  const [isBatchMode, setIsBatchMode] = useState(true);
  const [batchContent, setBatchContent] = useState('');
  const [newStreetId, setNewStreetId] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [alertMsg, setAlertMsg] = useState('');

  const onChange = (e: { target: { value: SetStateAction<string>; }; }) => {
    setNewStreetId(e.target.value);
  }

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (!isBatchMode) {
      if (!newStreetId) {
        return;
      }

      const newStreet: Street = { id: capitalizeEachWord(newStreetId) };
      const hasDuplicate = streets.some(s => s.id === newStreet.id);
      if (!hasDuplicate) {
        dispatch(addStreet(newStreet));
        setNewStreetId('');
        setErrorMsg('');
        setAlertMsg('Successfully Added ' + newStreet.id);
        setTimeout(() => { setAlertMsg('') }, 5000);
      } else {
        setErrorMsg('Error: Duplicate record found');
      }
    } else {
      let hasDuplicateError = false;
      let hasMissingDataError = false;
      const batchLines = batchContent.split('\n');
      batchLines.forEach(newStreetId => {
        const newStreet: Street = { id: newStreetId };
        const hasDuplicate = streets.some(e => e.id === newStreet.id);
        if (!newStreetId) {
          hasMissingDataError = true;
        }
        else if (hasDuplicate) {
          hasDuplicateError = true;
        } else {
          dispatch(addStreet(newStreet));
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

  const handleDelete = (streetId: string) => {
    dispatch(deleteStreet(streetId));
    setAlertMsg('Successfully Deleted ' + streetId);
    setTimeout(() => { setAlertMsg('') }, 5000);
  }

  const handleBatchModeChange = () => { setIsBatchMode(!isBatchMode); }

  const handleBatchContentChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setBatchContent(e.target.value);
  }

  return (
    <div>
      <div className='relative '>
        <h2 className="mb-4 text-4xl">Street Addresses</h2>
        {errorMsg ? <span className='absolute top-0 left-72 p-2 bg-red-500 text-white border rounded border-red-600'>{errorMsg}</span> : null}
        {alertMsg ? <span className='absolute top-0 left-72 p-2 bg-green-500 text-white border rounded border-green-600'>{alertMsg}</span> : null}
      </div>
      <div className='flex'>
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left rtl:text-right">
            <thead className="text-xs uppercase bg-white text-black">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Address
                </th>
                <th scope="col" className="px-6 py-3">
                  Delete
                </th>
              </tr>
            </thead>
            <tbody>
              {streets.map(e => {
                return <tr key={e.id} className="bg-white border-b border-gray-700">
                  <td scope="row" className="px-6 py-4">
                    {e.id}
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
              :
              <div className='flex mb-2'>
                <label htmlFor="streetid" className="block mr-2 text-sm font-medium text-black place-content-center">Address:</label>
                <input type="text" id='streetid' name="streetid" value={newStreetId} onChange={onChange} className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-fit p-2.5 dark:placeholder-gray-400 text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Main St." required />
              </div>}
            <button className='m-auto' onClick={handleSubmit}>Add Street Address</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export { StreetEntity };
