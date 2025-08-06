import { SetStateAction, useState } from 'react';
import { useAppDispatch } from '../../store';
import { addWord, deleteWord } from '../../store/word/wordSlice';
import { Word } from '../../models/storage';
import { capitalizeEachWord } from '../../utils/contentMapper';
import useStorageContent from '../../hooks/useStorageContent';

const WordEntity = () => {
  const [newWordId, setNewWordId] = useState('');
  const [newWordType, setNewWordType] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const dispatch = useAppDispatch();
  const { words } = useStorageContent();

  const onChange = (e: { target: { value: SetStateAction<string>; name: SetStateAction<string>; }; }) => {
    if (e.target.name === 'wordid') {
      setNewWordId(e.target.value);
    } else {
      setNewWordType(e.target.value);
    }
  }

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (!newWordId) {
      return;
    }
    const newWord: Word = { id: capitalizeEachWord(newWordId), type: capitalizeEachWord(newWordType) };
    const hasDuplicate = words.some(w => w.id === newWord.id && w.type === newWord.type);
    if (!hasDuplicate) {
      dispatch(addWord(newWord));
      setErrorMsg('');
    } else {
      setErrorMsg('Error: Duplicate record found');
    }
  }

  const handleDelete = (wordId: string) => {
    dispatch(deleteWord(wordId));
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
              {words.map(e => {
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
            <label htmlFor="wordid" className="block mr-2 text-sm font-medium text-black place-content-center">Word:</label>
            <input type="text" id='wordid' name="wordid" onChange={onChange} className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-fit p-2.5 dark:placeholder-gray-400 text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Dog" required />
          </div>
          <div className='flex mt-2 mb-2'>
            <label htmlFor="wordtype" className="block mr-2 text-sm font-medium text-black place-content-center">Type:</label>
            <input type="text" id='wordtype' name="wordtype" onChange={onChange} className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-fit p-2.5 dark:placeholder-gray-400 text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Animal" required />
          </div>
          <button className='m-auto' onClick={handleSubmit}>Add Word</button>
          {errorMsg ? <span className='text-red-500'>{errorMsg}</span> : null}
        </form>
      </div>
    </div>
  );
};

export { WordEntity };
