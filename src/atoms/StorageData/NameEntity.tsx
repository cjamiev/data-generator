import { SetStateAction, useState } from 'react';
import { useAppDispatch } from '../../store';
import { addName, deleteName } from '../../store/name/nameSlice';
import { Name } from '../../models/storage';
import { capitalizeEachWord } from '../../utils/contentMapper';
import useStorageContent from '../../hooks/useStorageContent';

const genderTypes = [
  {
    label: 'Male',
    value: 'm'
  },
  {
    label: 'Female',
    value: 'f'
  },
  {
    label: 'Other',
    value: 'o'
  },
]

const NameEntity = () => {
  const [newNameId, setNewNameId] = useState('');
  const [isFirstName, setIsFirstName] = useState(true);
  const [isLastName, setIsLastName] = useState(false);
  const [newNameGender, setNewNameGender] = useState('m');
  const [showDropdown, setShowDrowndowp] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [alertMsg, setAlertMsg] = useState('');
  const dispatch = useAppDispatch();
  const { names } = useStorageContent();


  const onChange = (e: { target: { value: SetStateAction<string>; name: SetStateAction<string>; }; }) => {
    if (e.target.name === 'nameid') {
      setNewNameId(e.target.value);
    } else {
      setNewNameGender(e.target.value);
    }
  }

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (!newNameId) {
      return;
    }

    const newName: Name = { id: capitalizeEachWord(newNameId), is_first_name: isFirstName, is_last_name: isLastName, gender: newNameGender };
    const hasDuplicate = names.some(n => n.id === newName.id);
    if (!hasDuplicate) {
      dispatch(addName(newName));
      setNewNameId('');
      setErrorMsg('');
      setAlertMsg('Successfully Added ' + newName.id);
      setTimeout(() => { setAlertMsg('') }, 5000);
    } else {
      setErrorMsg('Error: Duplicate record found');
    }
  }

  const handleDelete = (nameId: string) => {
    dispatch(deleteName(nameId));
    setAlertMsg('Successfully Deleted ' + nameId);
    setTimeout(() => { setAlertMsg('') }, 5000);
  }

  const toggleDropdown = () => setShowDrowndowp(!showDropdown)
  const handleGenderChange = (value: string) => {
    setNewNameGender(value);
    setShowDrowndowp(false)
  }

  return (
    <div>
      <h2 className="mb-4 text-4xl">Names</h2>
      <div className='flex'>
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left rtl:text-right">
            <thead className="text-xs uppercase bg-white text-black">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Is First Name?
                </th>
                <th scope="col" className="px-6 py-3">
                  Is Last Name?
                </th>
                <th scope="col" className="px-6 py-3">
                  Gender
                </th>
                <th scope="col" className="px-6 py-3">
                  Delete
                </th>
              </tr>
            </thead>
            <tbody>
              {names.map(e => {
                return <tr key={e.id} className="bg-white border-b border-gray-700">
                  <td scope="row" className="px-6 py-4">
                    {e.id}
                  </td>
                  <td className="px-6 py-4">
                    {e.is_first_name ? 'Yes' : 'No'}
                  </td>
                  <td className="px-6 py-4">
                    {e.is_last_name ? 'Yes' : 'No'}
                  </td>
                  <td className="px-6 py-4">
                    {genderTypes.find(g => g.value === e.gender)?.label}
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
              <label htmlFor="nameid" className="block mr-2 text-sm font-medium text-black place-content-center">Word:</label>
              <input type="text" id='nameid' name="nameid" value={newNameId} onChange={onChange} className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-fit p-2.5 dark:placeholder-gray-400 text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Steve" required />
            </div>
            <div className="flex items-center mt-4 mb-4">
              <input id="is-first-name" type="checkbox" value="" checked={isFirstName} onClick={() => { setIsFirstName(!isFirstName) }} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
              <label htmlFor="is-first-name" className="ms-2 text-sm font-medium text-black">Is First Name?</label>
            </div>
            <div className="flex items-center mt-4 mb-4">
              <input id="is-last-name" type="checkbox" value="" checked={isLastName} onClick={() => { setIsLastName(!isLastName) }} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
              <label htmlFor="is-last-name" className="ms-2 text-sm font-medium text-black">Is Last Name?</label>
            </div>
            <button id="dropdownDefaultButton" onClick={toggleDropdown} className="text-white hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center bg-sky-500" type="button">{genderTypes.find(g => g.value === newNameGender)?.label}<svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
            </svg>
            </button>
            {showDropdown ? <div id="dropdown" className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 border border-sky-500">
              <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                {genderTypes.map(g => {
                  return (
                    <li key={g.value} onClick={() => handleGenderChange(g.value)}>
                      <span className="block px-4 py-2 hover:bg-sky-500 hover:text-white cursor-pointer">{g.label}</span>
                    </li>
                  )
                })}
              </ul>
            </div> : null}
            <button className='m-auto' onClick={handleSubmit}>Add Name</button>
            {errorMsg ? <span className='text-red-500'>{errorMsg}</span> : null}
            {alertMsg ? <span className='absolute bottom-36 mt-2 p-2 bg-green-500 text-white border rounded border-green-600'>{alertMsg}</span> : null}
          </form>
        </div>
      </div>
    </div>
  );
};

export { NameEntity };
