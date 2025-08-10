import { ChangeEvent } from "react";
import { defaultPasswordOptions, IPasswordOptions } from "../../types/password";

interface IPasswordOptionsForm {
  passwordOptions: IPasswordOptions;
  onHandlePasswordOptionsChange: (updatedPasswordOptions: IPasswordOptions) => void;
}

const PasswordOptionsForm = ({
  passwordOptions,
  onHandlePasswordOptionsChange,
}: IPasswordOptionsForm) => {
  const { passwordLength,
    shouldIncludeNumbers,
    shouldIncludeLowercasedLetters,
    shouldIncludeUppercasedLetters,
    shouldAllowSequence,
    shouldAllowTripleRepeat,
    specialCharacters } = passwordOptions;

  const onHandlePasswordLengthChange = (event: ChangeEvent<HTMLInputElement>) => {
    onHandlePasswordOptionsChange({
      ...passwordOptions,
      passwordLength: Number(event.target.value)
    });
  };

  const onHandleIncludeNumbersChange = () => {
    onHandlePasswordOptionsChange({
      ...passwordOptions,
      shouldIncludeNumbers: !passwordOptions.shouldIncludeNumbers
    });
  };

  const onHandleIncludeLowercasedLettersChange = () => {
    onHandlePasswordOptionsChange({
      ...passwordOptions,
      shouldIncludeLowercasedLetters: !passwordOptions.shouldIncludeLowercasedLetters
    });
  };

  const onHandleIncludeUppercasedLettersChange = () => {
    onHandlePasswordOptionsChange({
      ...passwordOptions,
      shouldIncludeUppercasedLetters: !passwordOptions.shouldIncludeUppercasedLetters
    });
  };

  const onHandleAllowSequenceChange = () => {
    onHandlePasswordOptionsChange({
      ...passwordOptions,
      shouldAllowSequence: !passwordOptions.shouldAllowSequence
    });
  };

  const onHandleAllowTripleRepeatChange = () => {
    onHandlePasswordOptionsChange({
      ...passwordOptions,
      shouldAllowTripleRepeat: !passwordOptions.shouldAllowTripleRepeat
    });
  };

  const onHandleSymbolsChange = (event: ChangeEvent<HTMLInputElement>) => {
    onHandlePasswordOptionsChange({
      ...passwordOptions,
      specialCharacters: event.target.value
    });
  };

  const reset = () => {
    onHandlePasswordOptionsChange(defaultPasswordOptions);
  };

  return (
    <>
      <div className="w-80 border-l-2 border-r-2 border-t-2 border-sky-600 p-4">
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
            id="should-include-numbers"
            className="mr-1 w-6"
            type="checkbox"
            checked={shouldIncludeNumbers}
            onChange={onHandleIncludeNumbersChange}
          />
          <label className="w-32 pt-2" htmlFor="should-include-numbers">
            Numbers
          </label>
        </div>
        <div>
          <input
            id="should-include-lowercased-letters"
            className="mr-1 w-6"
            type="checkbox"
            checked={shouldIncludeLowercasedLetters}
            onChange={onHandleIncludeLowercasedLettersChange}
          />
          <label className="w-32 pt-2" htmlFor="should-include-lowercased-letters">
            Lowercased Letters
          </label>
        </div>
        <div>
          <input
            id="should-include-uppercased-letters"
            className="mr-1 w-6"
            type="checkbox"
            checked={shouldIncludeUppercasedLetters}
            onChange={onHandleIncludeUppercasedLettersChange}
          />
          <label className="w-32 pt-2" htmlFor="should-include-uppercased-letters">
            Uppercased Letters
          </label>
        </div>
        <div>
          <input
            id="should-allow-sequence"
            className="mr-1 w-6"
            type="checkbox"
            checked={shouldAllowSequence}
            onChange={onHandleAllowSequenceChange}
          />
          <label className="w-32 pt-2" htmlFor="should-allow-sequence">
            Allow Sequence (e.g. 123 or abc)
          </label>
        </div>
        <div>
          <input
            id="should-triple-repeat"
            className="mr-1 w-6"
            type="checkbox"
            checked={shouldAllowTripleRepeat}
            onChange={onHandleAllowTripleRepeatChange}
          />
          <label className="w-32 pt-2" htmlFor="should-triple-repeat">
            Allow Triple Repeat (e.g. 111 or aaa)
          </label>
        </div>
        <div>
          <input
            className="h-8 w-64 rounded border-2 border-sky-700 p-4"
            type="text"
            value={specialCharacters}
            onChange={onHandleSymbolsChange}
          />
        </div>
        <button className="ml-16 mt-4 w-32 shadow-md" onClick={reset}>
          Reset Options
        </button>
      </div>
    </>
  );
};

export { PasswordOptionsForm };
