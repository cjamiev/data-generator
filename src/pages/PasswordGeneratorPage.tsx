import { ChangeEvent, useEffect, useState, useCallback } from 'react';
import { copyToClipboard } from '../utils/copy';
import { PageWrapper } from '../layout';

// no duplicate, no repeated, number count, number position, using words
const letters = 'abcdefghijklmnopqrstuvwxyz';
const uppercasedletters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const numbers = '0123456789';
const SPECIAL_CHARACTERS = '`~!@#$%^&*=+-_\\/|,.;(){}[]<>';

const getNumbers = (shouldIncludeNumbers: boolean) => {
  return shouldIncludeNumbers ? numbers.split('') : [];
};

const getLowercasedLetters = (shouldIncludeLowercasedLetters: boolean) => {
  return shouldIncludeLowercasedLetters ? letters.split('') : [];
};

const getUppercasedLetters = (shouldIncludeUppercasedLetters: boolean) => {
  return shouldIncludeUppercasedLetters ? uppercasedletters.split('') : [];
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

const getNextCharacter = ({
  oneCharacterBack,
  twoCharactersBack,
  shouldAllowSequence,
  allPossibilities,
}: {
  oneCharacterBack: string;
  twoCharactersBack: string;
  shouldAllowSequence: boolean;
  allPossibilities: string[];
}) => {
  const size = allPossibilities.length;
  if (shouldAllowSequence) {
    const index = Math.floor(Math.random() * size);
    const currentChar = allPossibilities[index];

    return currentChar;
  }

  let foundChar = '';
  let loopCounter = 0;
  while (!foundChar && loopCounter < 100) {
    const index = Math.floor(Math.random() * size);
    const currentChar = allPossibilities[index];

    // Need to unit test this section
    foundChar =
      index > 0 && allPossibilities[index - 1] === oneCharacterBack && allPossibilities[index - 1] === twoCharactersBack
        ? ''
        : currentChar;
    loopCounter++;
  }

  if (loopCounter > 99) {
    console.error('Loop Counter hit:', loopCounter);
  }

  return foundChar;
};

const generatePassword = ({
  shouldIncludeNumbers,
  shouldIncludeLowercasedLetters,
  shouldIncludeUppercasedLetters,
  shouldAllowSequence,
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
    return 'NOT ENOUGH CHARACTERS TO WORK WITH!';
  }

  const generated: string[] = [];
  for (let i = 0; i < passwordLength; i++) {
    const oneCharacterBack = i > 0 ? generated[i - 1] : '';
    const twoCharactersBack = i > 1 ? generated[i - 2] : '';
    const currentChar = getNextCharacter({
      oneCharacterBack,
      twoCharactersBack,
      shouldAllowSequence,
      allPossibilities,
    });

    generated.push(currentChar);
  }

  return generated.join('');
};

const PasswordGeneratorPage = () => {
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [generatedPasswords, setGeneratedPasswords] = useState<string[]>(['a', 'b', 'c', 'd', 'e']);
  const [passwordLength, setPasswordLength] = useState<number>(16);
  const [specialCharacters, setSpecialCharacters] = useState<string>(SPECIAL_CHARACTERS);
  const [shouldIncludeNumbers, setShouldIncludeNumbers] = useState<boolean>(true);
  const [shouldIncludeLowercasedLetters, setShouldIncludeLowercasedLetters] = useState<boolean>(true);
  const [shouldIncludeUppercasedLetters, setShouldIncludeUppercasedLetters] = useState<boolean>(true);
  const [shouldAllowSequence, setShouldAllowSequence] = useState<boolean>(false);

  useEffect(() => {
    if (!isMounted) {
      const passwords = [];
      for (let pCount = 0; pCount < 5; pCount++) {
        const content = generatePassword({
          shouldIncludeNumbers,
          shouldIncludeLowercasedLetters,
          shouldIncludeUppercasedLetters,
          shouldAllowSequence,
          specialCharacters: specialCharacters.split(''),
          passwordLength,
        });

        passwords.push(content);
      }

      setGeneratedPasswords(passwords);
      setIsMounted(true);
    }
  }, [
    isMounted,
    passwordLength,
    shouldAllowSequence,
    shouldIncludeLowercasedLetters,
    shouldIncludeNumbers,
    shouldIncludeUppercasedLetters,
    specialCharacters,
  ]);

  const regeneratePassword = useCallback(
    (index: number) => {
      const content = generatePassword({
        shouldIncludeNumbers,
        shouldIncludeLowercasedLetters,
        shouldIncludeUppercasedLetters,
        shouldAllowSequence,
        specialCharacters: specialCharacters.split(''),
        passwordLength,
      });

      const updatedPasswords = generatedPasswords.map((p, i) => {
        if (i === index) {
          return content;
        } else {
          return p;
        }
      });
      setGeneratedPasswords(updatedPasswords);
    },
    [
      generatedPasswords,
      shouldIncludeNumbers,
      shouldIncludeLowercasedLetters,
      shouldIncludeUppercasedLetters,
      shouldAllowSequence,
      specialCharacters,
      passwordLength,
    ]
  );

  const onHandlePasswordLengthChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPasswordLength(Number(event.target.value));
  };

  const onHandleIncludeNumbersChange = () => {
    setShouldIncludeNumbers(!shouldIncludeNumbers);
  };

  const onHandleIncludeLowercasedLettersChange = () => {
    setShouldIncludeLowercasedLetters(!shouldIncludeLowercasedLetters);
  };

  const onHandleIncludeUppercasedLettersChange = () => {
    setShouldIncludeUppercasedLetters(!shouldIncludeUppercasedLetters);
  };

  const onHandleAllowSequenceChange = () => {
    setShouldAllowSequence(!shouldAllowSequence);
  };

  const onHandleSymbolsChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSpecialCharacters(event.target.value);
  };

  return (
    <PageWrapper>
      <>
        <h1 className="text-6xl">Password Generator</h1>
        <div className="flex">
          <div>
            <div className="w-80 rounded-t-lg border-l-2 border-r-2 border-t-2 border-sky-600 p-4">
              <label className="mr-4">Length: {passwordLength}</label>
              <input
                type="range"
                id="password-length"
                name="password-length"
                min="8"
                max="50"
                value={passwordLength}
                onChange={(event) => onHandlePasswordLengthChange(event)}
              />
            </div>
            <div className="flex w-80 flex-col rounded-b-lg border-2 border-sky-600 p-4">
              <span className="text-2xl font-bold">Include</span>
              <div>
                <input
                  className="mr-2 w-6"
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
                  className="mr-2 w-6"
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
                  className="mr-2 w-6"
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
                  className="mr-2 w-6"
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
                  className="w-64 rounded border-2 border-sky-700 p-4"
                  type="text"
                  onChange={(event) => {
                    onHandleSymbolsChange(event);
                  }}
                  value={specialCharacters}
                />
              </div>
            </div>
          </div>
          <div className="ml-2 w-fit rounded border-2 border-sky-600 p-8">
            {generatedPasswords.map((password, index) => {
              return (
                <div key={password} className="mt-2 flex gap-4">
                  <span className="mt-3 w-60 font-mono text-2xl">{password}</span>
                  <button className="w-32 shadow-md" onClick={() => copyToClipboard(password)}>
                    copy
                  </button>
                  <button className="w-32 shadow-md" onClick={() => regeneratePassword(index)}>
                    regenerate
                  </button>
                </div>
              );
            })}
            <button
              className="ml-48 mt-4 w-32 shadow-md"
              onClick={() => copyToClipboard(generatedPasswords.join('\n'))}>
              copy all
            </button>
          </div>
        </div>
      </>
    </PageWrapper>
  );
};

export { PasswordGeneratorPage };
