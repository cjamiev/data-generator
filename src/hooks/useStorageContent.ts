import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store';
import { loadEmails, selectEmails, selectIsLoadingEmails } from '../store/email/emailSlice';
import { loadCities, selectCities, selectIsLoadingCities } from '../store/city/citySlice';
import { loadNames, selectNames, selectIsLoadingNames } from '../store/name/nameSlice';
import { loadStreets, selectStreets, selectIsLoadingStreets } from '../store/street/streetSlice';
import { loadWords, selectWords, selectWordTypes, selectIsLoadingWords } from '../store/word/wordSlice';

function useStorageContent() {
  const dispatch = useAppDispatch();
  const emails = useAppSelector(selectEmails);
  const isLoadingEmails = useAppSelector(selectIsLoadingEmails);
  const cities = useAppSelector(selectCities);
  const isLoadingCities = useAppSelector(selectIsLoadingCities);
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
    if (isLoadingCities) {
      dispatch(loadCities());
    }
  }, [isLoadingCities, dispatch]);


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

  return { emails, cities, names, streets, words, wordTypes, isLoadingWords };
}

export default useStorageContent;