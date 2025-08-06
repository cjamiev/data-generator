import { emails, names, streets, words, locations } from '../mocked/words';

export const loadMockData = <T>(type: string) => {
  const currentDataStr = localStorage.getItem(type);
  const currentData: T[] = JSON.parse(currentDataStr ?? "[]");

  return currentData;
}

export const addMockData = <T>(type: string, data: T) => {
  const currentDataStr = localStorage.getItem(type);
  const currentData: T[] = JSON.parse(currentDataStr ?? "[]");
  const updatedData = currentData.concat([data]);
  localStorage.setItem(type, JSON.stringify(updatedData));
}

export const removeMockData = <T>(type: string, filterFnc: (data: T) => boolean) => {
  const currentDataStr = localStorage.getItem(type);
  const currentData: T[] = JSON.parse(currentDataStr ?? "[]");
  const updatedData = currentData.filter(filterFnc);
  localStorage.setItem(type, JSON.stringify(updatedData));
}

export const loadAllMockData = () => {
  localStorage.setItem('words', JSON.stringify(words));
  localStorage.setItem('emails', JSON.stringify(emails));
  localStorage.setItem('names', JSON.stringify(names));
  localStorage.setItem('streets', JSON.stringify(streets));
  localStorage.setItem('locations', JSON.stringify(locations));
}

export const initializeApp = () => {
  const isInitialized = localStorage.getItem('app-initialized');

  if (isInitialized != 'y') {
    loadAllMockData();
    localStorage.setItem('app-initialized', 'y');
  }
}
