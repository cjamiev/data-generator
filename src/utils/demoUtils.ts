import { emails, names, streets, words, cities } from '../mocked/words';

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
  localStorage.setItem('dg-words', JSON.stringify(words));
  localStorage.setItem('dg-emails', JSON.stringify(emails));
  localStorage.setItem('dg-names', JSON.stringify(names));
  localStorage.setItem('dg-streets', JSON.stringify(streets));
  localStorage.setItem('dg-cities', JSON.stringify(cities));
}

export const initializeApp = () => {
  const isInitialized = localStorage.getItem('dg-initialized');

  if (isInitialized != 'y') {
    loadAllMockData();
    localStorage.setItem('dg-initialized', 'y');
  }
}
