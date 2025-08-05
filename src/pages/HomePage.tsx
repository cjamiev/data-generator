import { SetStateAction, useEffect, useState } from 'react';
import { PageWrapper } from '../layout';
import { useAppDispatch, useAppSelector } from '../store';
import { loadEmails, addEmail, deleteEmail, selectEmails, selectIsLoading } from '../store/emailSlice';
import { Email } from '../models/random';

const HomePage = () => {
  const [newEmailId, setNewEmailId] = useState('');
  const dispatch = useAppDispatch()
  const emails = useAppSelector(selectEmails)
  const isLoadingEmails = useAppSelector(selectIsLoading)

  useEffect(() => {
    if (isLoadingEmails) {
      dispatch(loadEmails());
    }
  }, [isLoadingEmails, dispatch]);

  // useEffect(() => {
  //   api
  //     .get('/storage/health/ping')
  //     .then((response) => {
  //       console.log(response);
  //     })
  // }, []);

  // useEffect(() => {
  //   api
  //     .get('/storage/location/')
  //     .then((response) => {
  //       console.log(response);
  //     })
  // }, []);

  // useEffect(() => {
  //   api
  //     .get('/storage/email/')
  //     .then((response) => {
  //       console.log(response);
  //     })
  // }, []);

  // useEffect(() => {
  //   api
  //     .get('/storage/street/')
  //     .then((response) => {
  //       console.log(response);
  //     })
  // }, []);

  // useEffect(() => {
  //   api
  //     .get('/storage/name/')
  //     .then((response) => {
  //       console.log(response);
  //     })
  // }, []);

  const onChange = (e: { target: { value: SetStateAction<string>; }; }) => {
    setNewEmailId(e.target.value);
  }

  const handleSubmit = () => {
    if (!newEmailId) {
      return;
    }
    const email: Email = { id: newEmailId };
    dispatch(addEmail(email));
  }

  const handleDelete = (emailId: string) => {
    dispatch(deleteEmail(emailId));
  }

  return (
    <PageWrapper>
      <>
        <h1 className="mb-4 text-6xl">Home Page</h1>
        <div>
          <label>
            New Email: <input id={'new-email'} type="text" name="email" onChange={onChange} />
          </label>
          <button onClick={handleSubmit}>Submit</button>
          {emails.map(e => {
            return <div key={e.id}>
              <span></span>{e.id}
              <button onClick={() => handleDelete(e.id)}>Delete</button>
            </div>
          })}
        </div>
      </>
    </PageWrapper>
  );
};

export { HomePage };
