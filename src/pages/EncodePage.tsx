import { ChangeEvent, useState } from 'react';
import { copyToClipboard } from '../utils/copy';
import { PageWrapper } from '../layout';
import { downloadFile } from '../utils/download';

/*
 * TODO: Refactor code: Split into smaller components
 * Hi Priority Missing features
 * - Delimiter by newline, comma, or input symbol
 */

const EncodePage = () => {
  const [originalInput, setOriginalInput] = useState<string>('');
  const [translatedOutput, setTranslatedOutput] = useState<string>('');

  const onHandleInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setOriginalInput(event.target.value);
  };

  const onHandleFileInput = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const fileSize = Math.floor(file.size / 1024);
      const reader = new FileReader();

      reader.onload = function (e) {
        const content = e.target?.result;
        setOriginalInput(String(content));
      };

      reader.onerror = function (e) {
        console.error('Error reading file:', e);
      };

      if (fileSize < 1024) {
        reader.readAsText(file);
      } else {
        setOriginalInput('File size too big. Limit to 1MB.');
      }
    }
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
    copyToClipboard(translatedOutput);
  };

  const onDownload = () => {
    downloadFile('output.txt', translatedOutput);
  };

  return (
    <PageWrapper>
      <>
        <h1 className="pb-4 text-6xl">Encode Data</h1>
        <span>Convert content to base 64 or decode from base 64</span>
        <div className="flex flex-row gap-4">
          <div className="flex w-1/2 flex-col">
            <textarea
              className="h-96 w-full rounded border-2 border-sky-700 p-4"
              onChange={(event) => {
                onHandleInputChange(event);
              }}
              placeholder="input"
              value={originalInput}
            />
            <div>
              <button className="mr-4 mt-4 shadow-md" onClick={onEncode}>
                Encode
              </button>
              <button className="mt-4 shadow-md" onClick={onDecode}>
                Decode
              </button>
              <div className="mt-4">
                <label htmlFor="input-file">Add A file: </label>
                <input
                  type="file"
                  id="input-file"
                  onChange={(event) => onHandleFileInput(event)}
                  accept=".txt,.xml,.json"
                />
              </div>
            </div>
          </div>
          <div className="flex w-1/2 flex-col">
            <textarea
              className="h-96 w-full rounded border-2 border-sky-700 p-4"
              placeholder="output"
              onChange={() => { }}
              value={translatedOutput}
            />
            <div>
              <button className="mr-4 mt-4 shadow-md" onClick={onCopy}>
                Copy
              </button>
              <button className="mt-4 shadow-md" onClick={onDownload}>
                Download
              </button>
            </div>
          </div>
        </div>
      </>
    </PageWrapper>
  );
};

export { EncodePage };
