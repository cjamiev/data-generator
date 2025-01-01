import { ChangeEvent, useState } from 'react';
import { copyToClipboard } from '../utils/copy';
import { PageWrapper } from '../layout';

/*
 * TODO: Refactor code: Split into smaller components
 * Hi Priority Missing features
 * - Delimiter by newline, comma, or input symbol
 * - File conversion, Download File
 */

const EncodePage = () => {
  const [originalInput, setOriginalInput] = useState<string>('');
  const [translatedOutput, setTranslatedOutput] = useState<string>('');

  const onHandleInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setOriginalInput(event.target.value);
  };

  const onEncode = () => {
    const encoded = window.btoa(originalInput);

    setTranslatedOutput(encoded);
  };

  const onDecode = () => {
    const decoded = window.atob(originalInput);

    setTranslatedOutput(decoded);
  };

  const onCopy = () => {
    copyToClipboard(translatedOutput)
  };

  return (
    <PageWrapper>
      <>
        <h1 className="text-6xl">Encode Page</h1>
        <div className='flex flex-row'>
          <div className='flex flex-col w-1/2 p-8'>
            <textarea
              className="h-96 w-full rounded border-2 border-sky-700 p-4"
              onChange={(event) => {
                onHandleInputChange(event);
              }}
              value={originalInput}
            />
            <div>
              <button onClick={onEncode}>Encode</button>
              <button onClick={onDecode}>Decode</button>
            </div>
          </div>
          <div className='flex flex-col w-1/2 p-8'>
            <textarea className="h-96 w-full rounded border-2 border-sky-700 p-4" onChange={() => { }} value={translatedOutput} />
            <button onClick={onCopy}>Copy</button>
          </div>
        </div>
      </>
    </PageWrapper>
  );
};

export { EncodePage };
