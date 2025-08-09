import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store';
import { loadEmails, selectEmails, selectIsLoadingEmails } from '../store/email/emailSlice';
import { loadLocations, selectLocations, selectIsLoadingLocations } from '../store/location/locationSlice';
import { loadNames, selectNames, selectIsLoadingNames } from '../store/name/nameSlice';
import { loadStreets, selectStreets, selectIsLoadingStreets } from '../store/street/streetSlice';
import { loadWords, selectWords, selectWordTypes, selectIsLoadingWords } from '../store/word/wordSlice';

function useStorageContent() {
  const dispatch = useAppDispatch();
  const emails = useAppSelector(selectEmails);
  const isLoadingEmails = useAppSelector(selectIsLoadingEmails);
  const locations = useAppSelector(selectLocations);
  const isLoadingLocations = useAppSelector(selectIsLoadingLocations);
  const names = useAppSelector(selectNames);
  const isLoadingNames = useAppSelector(selectIsLoadingNames);
  const streets = useAppSelector(selectStreets);
  const isLoadingStreets = useAppSelector(selectIsLoadingStreets);
  const words = useAppSelector(selectWords);
  const wordTypes = useAppSelector(selectWordTypes);
  const isLoadingWords = useAppSelector(selectIsLoadingWords);

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

  return { emails, locations, names, streets, words, wordTypes, isLoadingWords };
}

export default useStorageContent;