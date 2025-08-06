import { SetStateAction, useState } from 'react';
import { useAppDispatch } from '../../store';
import { addEmail, deleteEmail } from '../../store/email/emailSlice';
import { Email } from '../../models/storage';
import useStorageContent from '../../hooks/useStorageContent';

const EmailEntity = () => {
  const [newEmailId, setNewEmailId] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [alertMsg, setAlertMsg] = useState('');
  const dispatch = useAppDispatch();
  const { emails } = useStorageContent();

  const onChange = (e: { target: { value: SetStateAction<string>; }; }) => {
    setNewEmailId(e.target.value);
  }

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (!newEmailId) {
      return;
    }

    const newEmail: Email = { id: newEmailId };
    const hasDuplicate = emails.some(e => e.id === newEmail.id);
    if (!hasDuplicate) {
      dispatch(addEmail(newEmail));
      setNewEmailId('');
      setErrorMsg('');
      setAlertMsg('Successfully Added ' + newEmail.id);
      setTimeout(() => { setAlertMsg('') }, 5000);
    } else {
      setErrorMsg('Error: Duplicate record found');
    }
  }

  const handleDelete = (emailId: string) => {
    dispatch(deleteEmail(emailId));
    setAlertMsg('Successfully Deleted ' + emailId);
    setTimeout(() => { setAlertMsg('') }, 5000);
  }

  return (
    <div>
      <h2 className="mb-4 text-4xl">Email Hosts</h2>
      <div className='flex'>
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left rtl:text-right">
            <thead className="text-xs uppercase bg-white text-black">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Host
                </th>
                <th scope="col" className="px-6 py-3">
                  Delete
                </th>
              </tr>
            </thead>
            <tbody>
              {emails.map(e => {
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
            <div className='flex mb-2'>
              <label htmlFor="emailid" className="block mr-2 text-sm font-medium text-black place-content-center">Host:</label>
              <input type="text" id='emailid' name="emailid" value={newEmailId} onChange={onChange} className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-fit p-2.5 dark:placeholder-gray-400 text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="gmail.com" required />
            </div>
            <button className='m-auto' onClick={handleSubmit}>Add Email Host</button>
            {errorMsg ? <span className='text-red-500'>{errorMsg}</span> : null}
            {alertMsg ? <span className='absolute top-32 mt-2 p-2 bg-green-500 text-white border rounded border-green-600'>{alertMsg}</span> : null}
          </form>
        </div>
      </div>
    </div>
  );
};

export { EmailEntity };
