import { ChangeEvent, useEffect, useState, useCallback } from 'react';
import { copyToClipboard } from '../utils/copy';
import { PageWrapper } from '../layout';
import useStorageContent from '../hooks/useStorageContent';
import { generateRandomContent } from '../utils/randomContentHelper';

/*
 * TODO: Refactor code: Split into smaller components
 * Hi Priority Missing features
 * - Readable password made of real words
 * Lo Priority Missing features
 * - No duplicate character
 * - Limit number of occurance of a particular character
 */
const LOWERCASED_LETTERS = 'abcdefghijklmnopqrstuvwxyz';
const UPPERCASED_LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const NUMBERS = '0123456789';
const SPECIAL_CHARACTERS = '`~!@#$%^&*=+-_\\/|,.;(){}[]<>';
const ERROR_MESSAGE = 'NOT ENOUGH CHARACTERS TO WORK WITH!';

const getNumbers = (shouldIncludeNumbers: boolean) => {
  return shouldIncludeNumbers ? NUMBERS.split('') : [];
};

const getLowercasedLetters = (shouldIncludeLowercasedLetters: boolean) => {
  return shouldIncludeLowercasedLetters ? LOWERCASED_LETTERS.split('') : [];
};

const getUppercasedLetters = (shouldIncludeUppercasedLetters: boolean) => {
  return shouldIncludeUppercasedLetters ? UPPERCASED_LETTERS.split('') : [];
};

interface IGetCharactersProp {
  shouldIncludeNumbers: boolean;
  shouldIncludeLowercasedLetters: boolean;
  shouldIncludeUppercasedLetters: boolean;
  specialCharacters: string[];
}
interface IGetPasswordProp {
  shouldIncludeNumbers: boolean;
  shouldIncludeLowercasedLetters: boolean;
  shouldIncludeUppercasedLetters: boolean;
  shouldAllowSequence: boolean;
  shouldAllowTripleRepeat: boolean;
  specialCharacters: string[];
  passwordLength: number;
}
const getAllCharacters = ({
  shouldIncludeNumbers,
  shouldIncludeLowercasedLetters,
  shouldIncludeUppercasedLetters,
  specialCharacters,
}: IGetCharactersProp) => {
  const numList = getNumbers(shouldIncludeNumbers);
  const lowerLetterList = getLowercasedLetters(shouldIncludeLowercasedLetters);
  const upperLetterList = getUppercasedLetters(shouldIncludeUppercasedLetters);

  return [...upperLetterList, ...lowerLetterList, ...numList, ...specialCharacters];
};

const getCharacterWithCheck = ({
  oneCharacterBack,
  twoCharactersBack,
  shouldAllowSequence,
  shouldAllowTripleRepeat,
  allPossibilities,
}: {
  oneCharacterBack: string;
  twoCharactersBack: string;
  shouldAllowSequence: boolean;
  shouldAllowTripleRepeat: boolean;
  allPossibilities: string[];
}) => {
  const size = allPossibilities.length;
  const index = Math.floor(Math.random() * size);
  const currentChar = allPossibilities[index];

  const isInSequence =
    !shouldAllowSequence &&
    index > 1 &&
    allPossibilities[index - 1] === oneCharacterBack &&
    allPossibilities[index - 2] === twoCharactersBack;
  const isTripleRepeat =
    !shouldAllowTripleRepeat && currentChar === oneCharacterBack && currentChar === twoCharactersBack;

  if (isInSequence || isTripleRepeat) {
    return ''; // Not valid character
  }

  return currentChar;
};

const getNextCharacter = ({
  oneCharacterBack,
  twoCharactersBack,
  shouldAllowSequence,
  shouldAllowTripleRepeat,
  allPossibilities,
}: {
  oneCharacterBack: string;
  twoCharactersBack: string;
  shouldAllowSequence: boolean;
  shouldAllowTripleRepeat: boolean;
  allPossibilities: string[];
}) => {
  const size = allPossibilities.length;
  if (shouldAllowSequence && shouldAllowTripleRepeat) {
    const index = Math.floor(Math.random() * size);
    const currentChar = allPossibilities[index];

    return currentChar;
  }

  let foundChar = '';
  let loopCounter = 0;
  while (!foundChar && loopCounter < 100) {
    foundChar = getCharacterWithCheck({
      oneCharacterBack,
      twoCharactersBack,
      shouldAllowSequence,
      shouldAllowTripleRepeat,
      allPossibilities,
    });

    loopCounter++;
  }

  if (loopCounter > 99) {
    console.error('Max Loop Counter Hit');
  }

  return foundChar;
};

const generatePassword = ({
  shouldIncludeNumbers,
  shouldIncludeLowercasedLetters,
  shouldIncludeUppercasedLetters,
  shouldAllowSequence,
  shouldAllowTripleRepeat,
  specialCharacters,
  passwordLength,
}: IGetPasswordProp) => {
  const allPossibilities = getAllCharacters({
    shouldIncludeNumbers,
    shouldIncludeLowercasedLetters,
    shouldIncludeUppercasedLetters,
    specialCharacters,
  });

  if (allPossibilities.length === 0) {
    return ERROR_MESSAGE;
  }

  const generated: string[] = [];
  for (let i = 0; i < passwordLength; i++) {
    const oneCharacterBack = i > 0 ? generated[i - 1] : '';
    const twoCharactersBack = i > 1 ? generated[i - 2] : '';
    const currentChar = getNextCharacter({
      oneCharacterBack,
      twoCharactersBack,
      shouldAllowSequence,
      shouldAllowTripleRepeat,
      allPossibilities,
    });

    generated.push(currentChar);
  }

  return generated.join('');
};

const generateReadablePassword = (words: string[], numberOfWords: number) => {
  const password: string[] = [];
  for (let wCount = 0; wCount < numberOfWords; wCount++) {
    password.push(generateRandomContent(words.filter(w => !password.some(i => i === w))));
  }

  return password.join('').replace(/\s+/g, '');
}

const PasswordGeneratorPage = () => {
  const { words, isLoadingWords } = useStorageContent();
  const [shouldGeneratePasswords, setShouldGeneratePasswords] = useState<boolean>(true);
  const [generatedPasswords, setGeneratedPasswords] = useState<string[]>(['a', 'b', 'c', 'd', 'e']);
  const [passwordLength, setPasswordLength] = useState<number>(16);
  const [specialCharacters, setSpecialCharacters] = useState<string>(SPECIAL_CHARACTERS);
  const [shouldIncludeNumbers, setShouldIncludeNumbers] = useState<boolean>(true);
  const [shouldIncludeLowercasedLetters, setShouldIncludeLowercasedLetters] = useState<boolean>(true);
  const [shouldIncludeUppercasedLetters, setShouldIncludeUppercasedLetters] = useState<boolean>(true);
  const [shouldAllowSequence, setShouldAllowSequence] = useState<boolean>(false);
  const [shouldAllowTripleRepeat, setShouldAllowTripleRepeat] = useState<boolean>(false);
  const [isTrueRandomMode, setIsTrueRandomMode] = useState<boolean>(false);
  const [alertMsg, setAlertMsg] = useState('');
  const [numberOfWords, setNumberOfWords] = useState<number>(2);

  useEffect(() => {
    if (shouldGeneratePasswords && !isLoadingWords) {
      const passwords = [];
      for (let pCount = 0; pCount < 5; pCount++) {
        const content = isTrueRandomMode ? generatePassword({
          shouldIncludeNumbers,
          shouldIncludeLowercasedLetters,
          shouldIncludeUppercasedLetters,
          shouldAllowSequence,
          shouldAllowTripleRepeat,
          specialCharacters: specialCharacters.split(''),
          passwordLength,
        }) : generateReadablePassword(words.map(i => i.id), numberOfWords);

        passwords.push(content);
      }

      setGeneratedPasswords(passwords);
      setShouldGeneratePasswords(false);
    }
  }, [shouldGeneratePasswords, generatedPasswords, shouldIncludeNumbers, shouldIncludeLowercasedLetters, shouldIncludeUppercasedLetters, shouldAllowSequence, shouldAllowTripleRepeat, specialCharacters, passwordLength, isTrueRandomMode, words, numberOfWords, isLoadingWords]);

  const regeneratePassword = useCallback(
    (index: number) => {
      const content = isTrueRandomMode ? generatePassword({
        shouldIncludeNumbers,
        shouldIncludeLowercasedLetters,
        shouldIncludeUppercasedLetters,
        shouldAllowSequence,
        shouldAllowTripleRepeat,
        specialCharacters: specialCharacters.split(''),
        passwordLength,
      }) : generateReadablePassword(words.map(i => i.id), numberOfWords);

      const updatedPasswords = generatedPasswords.map((p, i) => {
        if (i === index) {
          return content;
        } else {
          return p;
        }
      });
      setGeneratedPasswords(updatedPasswords);
    },
    [isTrueRandomMode, shouldIncludeNumbers, shouldIncludeLowercasedLetters, shouldIncludeUppercasedLetters, shouldAllowSequence, shouldAllowTripleRepeat, specialCharacters, passwordLength, words, numberOfWords, generatedPasswords]
  );

  const onHandlePasswordLengthChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPasswordLength(Number(event.target.value));
    setShouldGeneratePasswords(true);
  };

  const onHandleNumberOfWordsChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNumberOfWords(Number(event.target.value));
    setShouldGeneratePasswords(true);
  };

  const onHandleIncludeNumbersChange = () => {
    setShouldIncludeNumbers(!shouldIncludeNumbers);
    setShouldGeneratePasswords(true);
  };

  const onHandleIncludeLowercasedLettersChange = () => {
    setShouldIncludeLowercasedLetters(!shouldIncludeLowercasedLetters);
    setShouldGeneratePasswords(true);
  };

  const onHandleIncludeUppercasedLettersChange = () => {
    setShouldIncludeUppercasedLetters(!shouldIncludeUppercasedLetters);
    setShouldGeneratePasswords(true);
  };

  const onHandleAllowSequenceChange = () => {
    setShouldAllowSequence(!shouldAllowSequence);
    setShouldGeneratePasswords(true);
  };

  const onHandleAllowTripleRepeatChange = () => {
    setShouldAllowTripleRepeat(!shouldAllowTripleRepeat);
    setShouldGeneratePasswords(true);
  };

  const onHandleSymbolsChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSpecialCharacters(event.target.value);
    setShouldGeneratePasswords(true);
  };

  const reset = () => {
    setPasswordLength(16);
    setSpecialCharacters(SPECIAL_CHARACTERS);
    setShouldIncludeNumbers(true);
    setShouldIncludeLowercasedLetters(true);
    setShouldIncludeUppercasedLetters(true);
    setShouldAllowSequence(false);
  };

  const handleCopyPassword = (password: string, isMultiple: boolean) => {
    const messageEnding = isMultiple ? 's' : '';
    copyToClipboard(password);
    setAlertMsg('Successfully Copied Password' + messageEnding);
    setTimeout(() => { setAlertMsg('') }, 5000);
  }

  const toggleMode = () => {
    setIsTrueRandomMode(!isTrueRandomMode);
    setShouldGeneratePasswords(true);
  }

  const hasError = generatedPasswords[0] !== ERROR_MESSAGE;

  return (
    <PageWrapper>
      <>
        <div className='relative'>
          <h1 className="mb-4 text-6xl">Password Generator</h1>
          {alertMsg ? <span className='absolute top-6 left-150 p-2 bg-green-500 text-white border rounded border-green-600'>{alertMsg}</span> : null}
        </div>
        <div className="flex">
          <div>
            <div className="w-80 rounded-t-lg border-l-2 border-r-2 border-t-2 border-sky-600 p-4">
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" value="" className="sr-only peer" onClick={toggleMode} />
                <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:border-gray-300 after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-sky-500"></div>
                <span className="ml-3 text-sm font-medium text-gray-900">{isTrueRandomMode ? 'True Random' : 'Readable'}</span>
              </label>
            </div>
            {isTrueRandomMode ? <><div className="w-80 border-l-2 border-r-2 border-t-2 border-sky-600 p-4">
              <label className="mr-4">Length: {passwordLength}</label>
              <input
                type="range"
                id="password-length"
                name="password-length"
                min="8"
                max="50"
                value={passwordLength}
                onChange={onHandlePasswordLengthChange}
              />
            </div>
              <div className="w-80 rounded-b-lg border-b-2 border-l-2 border-r-2 border-sky-600 p-4">
                <span className="text-2xl font-bold">Include</span>
                <div>
                  <input
                    className="mr-1 w-6"
                    onChange={onHandleIncludeNumbersChange}
                    type="checkbox"
                    id="should-include-numbers"
                    checked={shouldIncludeNumbers}
                  />
                  <label className="w-32 pt-2" htmlFor="should-include-numbers">
                    Numbers
                  </label>
                </div>
                <div>
                  <input
                    className="mr-1 w-6"
                    onChange={onHandleIncludeLowercasedLettersChange}
                    type="checkbox"
                    id="should-include-lowercased-letters"
                    checked={shouldIncludeLowercasedLetters}
                  />
                  <label className="w-32 pt-2" htmlFor="should-include-lowercased-letters">
                    Lowercased Letters
                  </label>
                </div>
                <div>
                  <input
                    className="mr-1 w-6"
                    onChange={onHandleIncludeUppercasedLettersChange}
                    type="checkbox"
                    id="should-include-uppercased-letters"
                    checked={shouldIncludeUppercasedLetters}
                  />
                  <label className="w-32 pt-2" htmlFor="should-include-uppercased-letters">
                    Uppercased Letters
                  </label>
                </div>
                <div>
                  <input
                    className="mr-1 w-6"
                    onChange={onHandleAllowSequenceChange}
                    type="checkbox"
                    id="should-allow-sequence"
                    checked={shouldAllowSequence}
                  />
                  <label className="w-32 pt-2" htmlFor="should-allow-sequence">
                    Allow Sequence (e.g. 123 or abc)
                  </label>
                </div>
                <div>
                  <input
                    className="mr-1 w-6"
                    onChange={onHandleAllowTripleRepeatChange}
                    type="checkbox"
                    id="should-triple-repeat"
                    checked={shouldAllowTripleRepeat}
                  />
                  <label className="w-32 pt-2" htmlFor="should-triple-repeat">
                    Allow Triple Repeat (e.g. 111 or aaa)
                  </label>
                </div>
                <div>
                  <input
                    className="h-8 w-64 rounded border-2 border-sky-700 p-4"
                    type="text"
                    onChange={(event) => {
                      onHandleSymbolsChange(event);
                    }}
                    value={specialCharacters}
                  />
                </div>
                <button className="ml-16 mt-4 w-32 shadow-md" onClick={reset}>
                  Reset Options
                </button>
              </div>
            </> : <>
              <div className="w-80 rounded-b-lg border-2 border-sky-600 p-4">
                <label className="mr-4"># Of Words: {numberOfWords}</label>
                <input
                  type="range"
                  id="number-of-words"
                  name="numberof-words"
                  min="1"
                  max="5"
                  value={numberOfWords}
                  onChange={onHandleNumberOfWordsChange}
                />
              </div>
            </>
            }
          </div>
          <div className="ml-2 w-fit rounded border-2 border-sky-600 p-8">
            {generatedPasswords[0] !== ERROR_MESSAGE ? (
              generatedPasswords.map((password, index) => {
                return (
                  <div key={password + index} className="mt-2 flex gap-4">
                    <button className="w-24 shadow-md" onClick={() => handleCopyPassword(password, false)}>
                      Copy
                    </button>
                    <button className="w-24 shadow-md" onClick={() => regeneratePassword(index)}>
                      Regen
                    </button>
                    <span className="mt-3 w-fit min-w-60 font-mono text-2xl">{password}</span>
                  </div>
                );
              })
            ) : (
              <div>{ERROR_MESSAGE}</div>
            )}
            {hasError ? (
              <div className="flex items-center justify-center pt-4">
                <button className="mr-4 w-32 shadow-md" onClick={() => handleCopyPassword(generatedPasswords.join('\n'), true)}>
                  Copy All
                </button>
                <button className="w-32 shadow-md" onClick={() => setShouldGeneratePasswords(true)}>
                  Regenerate All
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </>
    </PageWrapper>
  );
};

export { PasswordGeneratorPage };
