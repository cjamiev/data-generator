import { useState } from 'react';
import { useAppDispatch } from '../../store';
import { addEmail, deleteEmail } from '../../store/email/emailSlice';
import { Email } from '../../models/storage';
import useStorageContent from '../../hooks/useStorageContent';

const placeHolderBatchContent = 'email\nemail2\nemail3';

const EmailEntity = () => {
  const { emails } = useStorageContent();
  const dispatch = useAppDispatch();
  const [isBatchMode, setIsBatchMode] = useState(true);
  const [batchContent, setBatchContent] = useState('');
  const [newEmailId, setNewEmailId] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [alertMsg, setAlertMsg] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewEmailId(e.target.value);
  }

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (!isBatchMode) {
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
    } else {
      let hasDuplicateError = false;
      let hasMissingDataError = false;
      const batchLines = batchContent.split('\n');
      batchLines.forEach(newEmailId => {
        const newEmail: Email = { id: newEmailId };
        const hasDuplicate = emails.some(e => e.id === newEmail.id);
        if (!newEmailId) {
          hasMissingDataError = true;
        }
        else if (hasDuplicate) {
          hasDuplicateError = true;
        } else {
          dispatch(addEmail(newEmail));
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

  const handleDelete = (emailId: string) => {
    dispatch(deleteEmail(emailId));
    setErrorMsg('');
    setAlertMsg('Successfully Deleted ' + emailId);
    setTimeout(() => { setAlertMsg('') }, 5000);
  }

  const handleBatchModeChange = () => { setIsBatchMode(!isBatchMode); }

  const handleBatchContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBatchContent(e.target.value);
  }

  return (
    <div>
      <div className='relative '>
        <h2 className="mb-4 text-4xl">Email Hosts</h2>
        {errorMsg ? <span className='absolute top-0 left-54 p-2 bg-red-500 text-white border rounded border-red-600'>{errorMsg}</span> : null}
        {alertMsg ? <span className='absolute top-0 left-54 p-2 bg-green-500 text-white border rounded border-green-600'>{alertMsg}</span> : null}
      </div>
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
                  <label htmlFor="emailid" className="block mr-2 text-sm font-medium text-black place-content-center">Host:</label>
                  <input type="text" id='emailid' name="emailid" value={newEmailId} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-fit p-2.5 dark:placeholder-gray-400 text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="gmail.com" required />
                </div></>}
            <button className='m-auto' onClick={handleSubmit}>Add Email Host</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export { EmailEntity };
