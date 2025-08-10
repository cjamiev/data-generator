import { ChangeEvent } from "react";
import { defaultPasswordReadableOptions, IPasswordReadableOptions } from "../../types/password";

interface IPasswordReadableOptionsForm {
  passwordReadableOptions: IPasswordReadableOptions;
  onHandlePasswordReadableOptionsChange: (updatedPasswordReadableOptions: IPasswordReadableOptions) => void;
}

const PasswordReadableOptionsForm = ({
  passwordReadableOptions,
  onHandlePasswordReadableOptionsChange,
}: IPasswordReadableOptionsForm) => {
  const { numberOfWords, shouldIncludeSymbol, shouldIncludeDate } = passwordReadableOptions;


  const onHandleNumberOfWordsChange = (event: ChangeEvent<HTMLInputElement>) => {
    onHandlePasswordReadableOptionsChange({
      ...passwordReadableOptions,
      numberOfWords: Number(event.target.value)
    });
  };

  const onHandleIncludeSymbolChange = () => {
    onHandlePasswordReadableOptionsChange({
      ...passwordReadableOptions,
      shouldIncludeSymbol: !passwordReadableOptions.shouldIncludeSymbol
    });
  };

  const onHandleIncludeDateChange = () => {
    onHandlePasswordReadableOptionsChange({
      ...passwordReadableOptions,
      shouldIncludeDate: !passwordReadableOptions.shouldIncludeDate
    });
  };

  const reset = () => {
    onHandlePasswordReadableOptionsChange(defaultPasswordReadableOptions);
  };

  return (
    <>
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
        <div>
          <input
            id="should-include-lowercased-letters"
            className="mr-1 w-6"
            type="checkbox"
            checked={shouldIncludeSymbol}
            onChange={onHandleIncludeSymbolChange}
          />
          <label className="w-32 pt-2" htmlFor="should-include-lowercased-letters">
            Add Symbol
          </label>
        </div>
        <div>
          <input
            id="should-include-uppercased-letters"
            className="mr-1 w-6"
            type="checkbox"
            checked={shouldIncludeDate}
            onChange={onHandleIncludeDateChange}
          />
          <label className="w-32 pt-2" htmlFor="should-include-uppercased-letters">
            Add Date
          </label>
        </div>
        <button className="ml-16 mt-4 w-32 shadow-md" onClick={reset}>
          Reset Options
        </button>
      </div>
    </>
  );
};

export { PasswordReadableOptionsForm };
