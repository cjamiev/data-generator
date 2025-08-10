/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useCallback } from 'react';
import { PageWrapper } from '../layout';
import useStorageContent from '../hooks/useStorageContent';
import { PasswordsDisplay } from '../atoms/Password/PasswordsDisplay';
import { PasswordOptionsForm } from '../atoms/Password/PasswordOptionsForm';
import { PasswordReadableOptionsForm } from '../atoms/Password/PasswordReadableOptionsForm';
import { defaultPasswordOptions, defaultPasswordReadableOptions, IPasswordOptions, IPasswordReadableOptions } from '../types/password';
import { generatePassword, generateReadablePassword } from '../utils/passwordGeneratorHelper';

const PasswordGeneratorPage = () => {
  const { words, wordTypes, isLoadingWords } = useStorageContent();
  const [passwordOptions, setPasswordOptions] = useState<IPasswordOptions>(defaultPasswordOptions);
  const [passwordReadableOptions, setPasswordReadableOptions] = useState<IPasswordReadableOptions>(defaultPasswordReadableOptions);
  const [shouldGeneratePasswords, setShouldGeneratePasswords] = useState<boolean>(true);
  const [generatedPasswords, setGeneratedPasswords] = useState<string[]>(['a', 'b', 'c', 'd', 'e']);
  const [isTrueRandomMode, setIsTrueRandomMode] = useState<boolean>(false);
  const [alertMsg, setAlertMsg] = useState('');

  useEffect(() => {
    if (shouldGeneratePasswords && !isLoadingWords) {
      const passwords = [];
      for (let pCount = 0; pCount < 5; pCount++) {
        const newGeneratedPassword = isTrueRandomMode
          ? generatePassword(passwordOptions)
          : generateReadablePassword(words, wordTypes, passwordReadableOptions);
        passwords.push(newGeneratedPassword);
      }

      setGeneratedPasswords(passwords);
      setShouldGeneratePasswords(false);
    }
  }, [
    passwordOptions.shouldIncludeNumbers,
    passwordOptions.shouldIncludeLowercasedLetters,
    passwordOptions.shouldIncludeUppercasedLetters,
    passwordOptions.shouldAllowSequence,
    passwordOptions.shouldAllowTripleRepeat,
    passwordOptions.specialCharacters,
    passwordOptions.passwordLength,
    shouldGeneratePasswords,
    isTrueRandomMode,
    words.length,
    passwordReadableOptions.numberOfWords,
    passwordReadableOptions.shouldIncludeSymbol,
    passwordReadableOptions.shouldIncludeDate,
    isLoadingWords
  ]);

  const toggleMode = () => {
    setIsTrueRandomMode(!isTrueRandomMode);
    setShouldGeneratePasswords(true);
  }

  const onHandlePasswordReadableOptionsChange = (updatedPasswordReadableOptions: IPasswordReadableOptions) => {
    setPasswordReadableOptions(updatedPasswordReadableOptions);
    setShouldGeneratePasswords(true);
  };

  const onHandlePasswordOptionsChange = (updatedPasswordOptions: IPasswordOptions) => {
    setPasswordOptions(updatedPasswordOptions);
    setShouldGeneratePasswords(true);
  }

  const handleAlertMsg = (msg: string) => {
    setAlertMsg(msg);
    setTimeout(() => { setAlertMsg('') }, 5000);
  }

  const regeneratePassword = useCallback(
    (index: number) => {
      const content = isTrueRandomMode
        ? generatePassword(passwordOptions)
        : generateReadablePassword(words, wordTypes, passwordReadableOptions);
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
      passwordOptions.shouldIncludeNumbers,
      passwordOptions.shouldIncludeLowercasedLetters,
      passwordOptions.shouldIncludeUppercasedLetters,
      passwordOptions.shouldAllowSequence,
      passwordOptions.shouldAllowTripleRepeat,
      passwordOptions.specialCharacters,
      passwordOptions.passwordLength,
      isTrueRandomMode,
      words.length,
      passwordReadableOptions.numberOfWords,
      passwordReadableOptions.shouldIncludeSymbol,
      passwordReadableOptions.shouldIncludeDate,
    ]
  );

  const regenerateAll = () => { setShouldGeneratePasswords(true) }

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
                <span className="ml-3 text-sm font-medium text-gray-900">{isTrueRandomMode ? 'Random' : 'Readable'}</span>
              </label>
            </div>
            {isTrueRandomMode
              ? <PasswordOptionsForm
                passwordOptions={passwordOptions}
                onHandlePasswordOptionsChange={onHandlePasswordOptionsChange}
              />
              :
              <PasswordReadableOptionsForm
                passwordReadableOptions={passwordReadableOptions}
                onHandlePasswordReadableOptionsChange={onHandlePasswordReadableOptionsChange}
              />
            }
          </div>
          <PasswordsDisplay generatedPasswords={generatedPasswords} regenerateAll={regenerateAll} regeneratePassword={regeneratePassword} handleAlertMsg={handleAlertMsg} />
        </div>
      </>
    </PageWrapper>
  );
};

export { PasswordGeneratorPage };
