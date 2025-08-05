import { useEffect } from 'react';
import { PageWrapper } from '../layout';
import { useAppDispatch, useAppSelector } from '../store';
import { loadEmails, selectEmails, selectStatus } from '../store/emailSlice';

const HomePage = () => {
  const dispatch = useAppDispatch()
  const emails = useAppSelector(selectEmails)
  const status = useAppSelector(selectStatus)



  useEffect(() => {
    dispatch(loadEmails());
  }, []);

  console.log(emails, status);
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

  return (
    <PageWrapper>
      <>
        <h1 className="mb-4 text-6xl">Home Page</h1>
        <div>
          {emails.map(e => {
            return <div key={e.id}>{e.id}</div>
          })}
        </div>
      </>
    </PageWrapper>
  );
};

export { HomePage };
