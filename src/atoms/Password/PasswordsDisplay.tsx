import { copyToClipboard } from '../../utils/copy';
import { ERROR_MESSAGE, ERROR_MESSAGE2 } from '../../utils/passwordGeneratorHelper';

interface IPasswordsDisplay {
  generatedPasswords: string[],
  regenerateAll: () => void,
  regeneratePassword: (index: number) => void
  handleAlertMsg: (msg: string) => void
}

const PasswordsDisplay = ({ generatedPasswords, regenerateAll, regeneratePassword, handleAlertMsg }: IPasswordsDisplay) => {
  const hasError = generatedPasswords[0] === ERROR_MESSAGE || generatedPasswords[0] === ERROR_MESSAGE2;

  const handleCopyPassword = (password: string, isMultiple: boolean) => {
    const messageEnding = isMultiple ? 's' : '';
    copyToClipboard(password);
    handleAlertMsg('Successfully Copied Password' + messageEnding);
  }

  return (
    <div id="passwords-display" className="ml-2 w-fit rounded border-2 border-sky-600 p-8">
      {!hasError ? (
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
        <div>{generatedPasswords[0]}</div>
      )}
      {!hasError ? (
        <div className="flex items-center justify-center pt-4">
          <button className="mr-4 w-32 shadow-md" onClick={() => handleCopyPassword(generatedPasswords.join('\n'), true)}>
            Copy All
          </button>
          <button className="w-32 shadow-md" onClick={regenerateAll}>
            Regenerate All
          </button>
        </div>
      ) : null}
    </div>
  );
};

export { PasswordsDisplay };
