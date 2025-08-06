import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store';
import { loadEmails, selectEmails, selectIsLoading } from '../store/email/emailSlice';
import { loadLocations, selectLocations } from '../store/location/locationSlice';
import { loadNames, selectNames } from '../store/name/nameSlice';
import { loadStreets, selectStreets } from '../store/street/streetSlice';
import { loadWords, selectWords } from '../store/word/wordSlice';

function useStorageContent() {
  const dispatch = useAppDispatch();
  const emails = useAppSelector(selectEmails);
  const isLoadingEmails = useAppSelector(selectIsLoading);
  const locations = useAppSelector(selectLocations);
  const isLoadingLocations = useAppSelector(selectIsLoading);
  const names = useAppSelector(selectNames);
  const isLoadingNames = useAppSelector(selectIsLoading);
  const streets = useAppSelector(selectStreets);
  const isLoadingStreets = useAppSelector(selectIsLoading);
  const words = useAppSelector(selectWords);
  const isLoadingWords = useAppSelector(selectIsLoading);

  useEffect(() => {
    if (isLoadingEmails) {
      dispatch(loadEmails());
    }
  }, [isLoadingEmails, dispatch]);

  useEffect(() => {
    if (isLoadingLocations) {
      dispatch(loadLocations());
    }
  }, [isLoadingLocations, dispatch]);


  useEffect(() => {
    if (isLoadingNames) {
      dispatch(loadNames());
    }
  }, [isLoadingNames, dispatch]);

  useEffect(() => {
    if (isLoadingStreets) {
      dispatch(loadStreets());
    }
  }, [isLoadingStreets, dispatch]);

  useEffect(() => {
    if (isLoadingWords) {
      dispatch(loadWords());
    }
  }, [isLoadingWords, dispatch]);

  return { emails, locations, names, streets, words };
}

export default useStorageContent;