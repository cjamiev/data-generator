import { SetStateAction, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store';
import { loadRandoms, addRandom, deleteRandom, selectRandoms, selectIsLoading } from '../../store/random/randomSlice';
import { Random } from '../../models/storage';

const RandomEntity = () => {
  const [newRandomId, setNewRandomId] = useState('');
  const [newRandomType, setNewRandomType] = useState('');
  const dispatch = useAppDispatch();
  const randoms = useAppSelector(selectRandoms);
  const isLoadingRandoms = useAppSelector(selectIsLoading);

  useEffect(() => {
    if (isLoadingRandoms) {
      dispatch(loadRandoms());
    }
  }, [isLoadingRandoms, dispatch]);

  const onChange = (e: { target: { value: SetStateAction<string>; name: SetStateAction<string>; }; }) => {
    if (e.target.name === 'randomid') {
      setNewRandomId(e.target.value);
    } else {
      setNewRandomType(e.target.value);
    }
  }

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (!newRandomId) {
      return;
    }
    const random: Random = { id: newRandomId, type: newRandomType };
    dispatch(addRandom(random));
  }

  const handleDelete = (randomId: string) => {
    dispatch(deleteRandom(randomId));
  }

  return (
    <div>
      <h2 className="mb-4 text-4xl">Words</h2>
      <div className='flex'>
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left rtl:text-right">
            <thead className="text-xs uppercase bg-white text-black">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Word
                </th>
                <th scope="col" className="px-6 py-3">
                  Type
                </th>
                <th scope="col" className="px-6 py-3">
                  Delete
                </th>
              </tr>
            </thead>
            <tbody>
              {randoms.map(e => {
                return <tr key={e.id} className="bg-white border-b border-gray-700">
                  <td scope="row" className="px-6 py-4">
                    {e.id}
                  </td>
                  <td className="px-6 py-4">
                    {e.type}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button className='w-fit h-fit border-none' onClick={() => handleDelete(e.id)}>X</button>
                  </td>
                </tr>
              })}
            </tbody>
          </table>
        </div>

        <form className='rounded border border-gray-500 flex flex-col p-4 ml-4'>
          <div className='flex'>
            <label htmlFor="randomid" className="block mr-2 text-sm font-medium text-black place-content-center">Word:</label>
            <input type="text" id='randomid' name="randomid" onChange={onChange} className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-fit p-2.5 dark:placeholder-gray-400 text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Dog" required />
          </div>
          <div className='flex mt-2 mb-2'>
            <label htmlFor="randomtype" className="block mr-2 text-sm font-medium text-black place-content-center">Type:</label>
            <input type="text" id='randomtype' name="randomtype" onChange={onChange} className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-fit p-2.5 dark:placeholder-gray-400 text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Animal" required />
          </div>
          <button className='m-auto' onClick={handleSubmit}>Add Word</button>
        </form>
      </div>
    </div>
  );
};

export { RandomEntity };
