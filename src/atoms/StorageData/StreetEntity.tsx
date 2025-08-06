import { SetStateAction, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store';
import { loadStreets, addStreet, deleteStreet, selectStreets, selectIsLoading } from '../../store/street/streetSlice';
import { Street } from '../../models/storage';
import { capitalizeEachWord } from '../../utils/contentMapper';

const StreetEntity = () => {
  const [newStreetId, setNewStreetId] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const dispatch = useAppDispatch();
  const streets = useAppSelector(selectStreets);
  const isLoadingStreets = useAppSelector(selectIsLoading);

  useEffect(() => {
    if (isLoadingStreets) {
      dispatch(loadStreets());
    }
  }, [isLoadingStreets, dispatch]);

  const onChange = (e: { target: { value: SetStateAction<string>; }; }) => {
    setNewStreetId(e.target.value);
  }

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (!newStreetId) {
      return;
    }

    const newStreet: Street = { id: capitalizeEachWord(newStreetId) };
    const hasDuplicate = streets.some(s => s.id === newStreet.id);
    if (!hasDuplicate) {
      dispatch(addStreet(newStreet));
      setErrorMsg('');
    } else {
      setErrorMsg('Error: Duplicate record found');
    }
  }

  const handleDelete = (streetId: string) => {
    dispatch(deleteStreet(streetId));
  }

  return (
    <div>
      <h2 className="mb-4 text-4xl">Street Addresses</h2>
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
          <form className='rounded border border-gray-500 flex flex-col p-4 ml-4'>
            <div className='flex mb-2'>
              <label htmlFor="streetid" className="block mr-2 text-sm font-medium text-black place-content-center">Address:</label>
              <input type="text" id='streetid' name="streetid" onChange={onChange} className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-fit p-2.5 dark:placeholder-gray-400 text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Main St." required />
            </div>
            <button className='m-auto' onClick={handleSubmit}>Add Street Address</button>
            {errorMsg ? <span className='text-red-500'>{errorMsg}</span> : null}
          </form>
        </div>
      </div>
    </div>
  );
};

export { StreetEntity };
