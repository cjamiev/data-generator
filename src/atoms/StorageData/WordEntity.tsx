import { SetStateAction, useState } from 'react';
import { useAppDispatch } from '../../store';
import { addWord, deleteWord } from '../../store/word/wordSlice';
import { Word } from '../../models/storage';
import { capitalizeEachWord } from '../../utils/contentMapper';
import useStorageContent from '../../hooks/useStorageContent';

const WordEntity = () => {
  const { words, wordTypes } = useStorageContent();
  const [selectedType, setSelectedType] = useState(wordTypes[0]);
  const [showTypeList, setShowTypeList] = useState(false);
  const [newWordId, setNewWordId] = useState('');
  const [newWordType, setNewWordType] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [alertMsg, setAlertMsg] = useState('');
  const dispatch = useAppDispatch();

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
      setNewWordId('');
      setErrorMsg('');
      setAlertMsg('Successfully Added ' + newWord.id);
      setTimeout(() => { setAlertMsg('') }, 5000);
    } else {
      setErrorMsg('Error: Duplicate record found');
    }
  }

  const handleDelete = (wordId: string) => {
    dispatch(deleteWord(wordId));
    setAlertMsg('Successfully Deleted ' + wordId);
    setTimeout(() => { setAlertMsg('') }, 5000);
  }

  const handleTypeSelectionChange = (type: string) => {
    setSelectedType(type);
  }

  const toggleDropdown = () => {
    setShowTypeList(!showTypeList);
  }

  return (
    <div>
      <div>
        <h2 className="mb-4 text-4xl">Words</h2>
        <div className='mb-2 relative'>
          <button id="dropdownDefaultButton" onClick={toggleDropdown} className="relative w-32 text-white hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center bg-sky-500" type="button">
            {selectedType}
            <svg className="absolute right-4 w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
            </svg>
          </button>
          {showTypeList ? <div id="dropdown" className="z-1 w-32 absolute bg-white divide-y divide-gray-100 rounded-lg shadow-sm border border-sky-500">
            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
              {wordTypes.map(type => {
                return (
                  <li key={type} onClick={() => handleTypeSelectionChange(type)}>
                    <span className="block px-4 py-2 hover:bg-sky-500 hover:text-white cursor-pointer">{type}</span>
                  </li>
                )
              })}
            </ul>
          </div> : null}
        </div>
      </div>
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
              {words.filter(w => w.type === selectedType).map(e => {
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

        <div>
          <form className='relative rounded border border-gray-500 flex flex-col p-4 ml-4'>
            <div className='flex'>
              <label htmlFor="wordid" className="block mr-2 text-sm font-medium text-black place-content-center">Word:</label>
              <input type="text" id='wordid' name="wordid" value={newWordId} onChange={onChange} className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-fit p-2.5 dark:placeholder-gray-400 text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Dog" required />
            </div>
            <div className='flex mt-2 mb-2'>
              <label htmlFor="wordtype" className="block mr-2 text-sm font-medium text-black place-content-center">Type:</label>
              <input type="text" id='wordtype' name="wordtype" onChange={onChange} className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-fit p-2.5 dark:placeholder-gray-400 text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Animal" required />
            </div>
            <button className='m-auto' onClick={handleSubmit}>Add Word</button>
            {errorMsg ? <span className='text-red-500'>{errorMsg}</span> : null}
            {alertMsg ? <span className='absolute bottom-48 p-2 bg-green-500 text-white border rounded border-green-600'>{alertMsg}</span> : null}
          </form>
        </div>
      </div>
    </div>
  );
};

export { WordEntity };
