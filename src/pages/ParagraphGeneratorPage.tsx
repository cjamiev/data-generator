import { PageWrapper } from '../layout';
import { copyToClipboard } from '../utils/copy';
import { loremIpsum } from '../mocks/fakewords';
import { capitalizeFirstLetter } from '../utils/stringHelper';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';

/*
 * TODO: Refactor
 */

interface ICopy {
  content: string[];
  isAsAVariable: boolean;
  isAsATemplateLiteral: boolean;
  isEachStringAVariable: boolean;
}

interface INumRange {
  min: number;
  max: number;
}

const size = loremIpsum.length;
const getFakeWord = () => {
  const index = Math.floor(Math.random() * size);
  return loremIpsum[index];
};

const getFakeSentence = (wordsPerSentence: INumRange) => {
  const numOfWords = Math.floor(Math.random() * (wordsPerSentence.max - wordsPerSentence.min + 1)) + wordsPerSentence.min;
  const genFakeSentence: string[] = [];
  for (let count = 0; count < numOfWords; count++) {
    const newFakeWord = getFakeWord();
    const fakeWord = count === 0 ? capitalizeFirstLetter(newFakeWord) : newFakeWord;
    genFakeSentence.push(fakeWord);
  }

  return `${genFakeSentence.join(' ')}.`;
};

const getFakeParagraph = (sentencesPerParagraph: INumRange, wordsPerSentence: INumRange) => {
  const numOfSentences =
    Math.floor(Math.random() * (sentencesPerParagraph.max - sentencesPerParagraph.min + 1)) + sentencesPerParagraph.min;
  const genFakeParagraph: string[] = [];
  for (let count = 0; count < numOfSentences; count++) {
    const newFakeSentence = getFakeSentence(wordsPerSentence);
    genFakeParagraph.push(newFakeSentence);
  }

  return genFakeParagraph.join(' ');
};

const getFakePage = (numOfParagraphs: number, sentencesPerParagraph: INumRange, wordsPerSentence: INumRange) => {
  const genFakePage: string[] = [];
  for (let count = 0; count < numOfParagraphs; count++) {
    const newFakeParagraph = getFakeParagraph(sentencesPerParagraph, wordsPerSentence);
    genFakePage.push(newFakeParagraph);
  }

  return genFakePage;
};

const getContentToCopy = ({ content, isAsAVariable, isAsATemplateLiteral, isEachStringAVariable }: ICopy) => {
  if (isAsAVariable) {
    return `const result = "${content.join(' ')}"`;
  }
  if (isAsATemplateLiteral) {
    const joinedAsLiteral = '`' + content.join('\n') + '`';
    return `const result = ${joinedAsLiteral}`;
  }
  if (isEachStringAVariable) {
    return content.map((p, index) => `const sentence${index} = "${p}"`).join(';\n') + ';';
  }

  return content.join('\n');
};

const getFontClassType = (type: string) => {
  if (type === 'mono') {
    return 'font-mono';
  } else if (type === 'serif') {
    return 'font-serif';
  } else if (type === 'sans') {
    return 'font-sans';
  } else {
    return '';
  }
};

const getFontClassSize = (size: string) => {
  if (size === 'extra-small') {
    return 'text-xs';
  } else if (size === 'small') {
    return 'text-sm';
  } else if (size === 'base') {
    return 'text-base';
  } else if (size === 'large') {
    return 'text-lg';
  } else if (size === 'extra-large') {
    return 'text-xl';
  }
  return 'text-2xl';
};

const ParagraphGeneratorPage = () => {
  const [fontType, setFontType] = useState<string>('');
  const [fontSize, setFontSize] = useState<string>('base');
  const [wordsPerSentence, setWordsPerSentence] = useState<INumRange>({ min: 2, max: 9 });
  const [sentencesPerParagraph, setSentencesPerParagraph] = useState<INumRange>({ min: 3, max: 6 });
  const [numOfParagraphs, setNumOfParagraphs] = useState<number>(5);
  const [content, setContent] = useState<string[]>([]);

  const onHandleWordCountMinChange = (event: ChangeEvent<HTMLInputElement>) => {
    setWordsPerSentence({ max: wordsPerSentence.max, min: Number(event.target.value) });
  };

  const onHandleWordCountMaxChange = (event: ChangeEvent<HTMLInputElement>) => {
    setWordsPerSentence({ max: Number(event.target.value), min: wordsPerSentence.min });
  };

  const onHandleSentenceCountMinChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSentencesPerParagraph({ max: sentencesPerParagraph.max, min: Number(event.target.value) });
  };

  const onHandleSentenceCountMaxChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSentencesPerParagraph({ max: Number(event.target.value), min: sentencesPerParagraph.min });
  };

  const onHandleParagraphCountChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNumOfParagraphs(Number(event.target.value));
  };

  const generateContent = useCallback(() => {
    const newContent = getFakePage(numOfParagraphs, sentencesPerParagraph, wordsPerSentence);
    setContent(newContent);
  }, [numOfParagraphs, sentencesPerParagraph, wordsPerSentence]);

  useEffect(() => {
    if (content.length === 0) {
      generateContent();
    }
  }, [content, generateContent]);

  const fontClass = getFontClassType(fontType) + ' ' + getFontClassSize(fontSize);

  return (
    <PageWrapper>
      <>
        <h1 className="pb-4 text-6xl">Lorem Ipsum Generator</h1>
        <span>Generate fake paragraphs</span>
        <div className="flex flex-row gap-10">
          <div>
            <div className="w-84 flex h-fit flex-col gap-4 rounded border-2 border-sky-600 p-8">
              <div className="mb-2 text-3xl">Options</div>
              <div>
                <label className="mr-4 block"># Paragraphs: {numOfParagraphs}</label>
                <input
                  className="w-16"
                  type="range"
                  id="paragraph-count"
                  name="paragraph-count"
                  min="1"
                  max="10"
                  value={numOfParagraphs}
                  onChange={(event) => onHandleParagraphCountChange(event)}
                />
              </div>
              <div className='flex flex-col'>
                <label className="mr-4 block"># Sentences per Paragraph</label>
                <div>
                  <label className="mr-4">Min: {sentencesPerParagraph.min}</label>
                  <input
                    className="w-16"
                    type="range"
                    id="min-sentences-paragraph"
                    name="min-sentences-paragraph"
                    min="1"
                    max="5"
                    value={sentencesPerParagraph.min}
                    onChange={(event) => onHandleSentenceCountMinChange(event)}
                  />
                </div>
                <div>
                  <label className="mr-3">Max: {sentencesPerParagraph.max}</label>
                  <input
                    className="mr-3 w-16"
                    type="range"
                    id="max-sentences-paragraph"
                    name="max-sentences-paragraph"
                    min="6"
                    max="9"
                    value={sentencesPerParagraph.max}
                    onChange={(event) => onHandleSentenceCountMaxChange(event)}
                  />
                </div>
              </div>
              <div className='flex flex-col'>
                <label className="mr-4 block"># Words per Sentence</label>
                <div>

                  <label className="mr-4">Min: {wordsPerSentence.min}</label>
                  <input
                    className="w-16"
                    type="range"
                    id="min-words-sentence"
                    name="min-words-sentence"
                    min="1"
                    max="5"
                    value={wordsPerSentence.min}
                    onChange={(event) => onHandleWordCountMinChange(event)}
                  />
                </div>
                <div>
                  <label className="mr-3">Max: {wordsPerSentence.max}</label>
                  <input
                    className="w-16"
                    type="range"
                    id="max-words-sentence"
                    name="max-words-sentence"
                    min="6"
                    max="9"
                    value={wordsPerSentence.max}
                    onChange={(event) => onHandleWordCountMaxChange(event)}
                  />
                </div>
              </div>
            </div>
            <div className="w-84 ml-2 mt-2 flex h-fit flex-col gap-4 rounded border-2 border-sky-600 p-8">
              <div className="text-3xl">Font Size</div>
              <div>
                <input
                  onChange={() => setFontSize('extra-small')}
                  type="radio"
                  name="font-size"
                  id="font-extra-small"
                  value="extra-small"
                  checked={fontSize === 'extra-small'}
                />
                <label className="ml-2 w-12" htmlFor="font-extra-small">
                  Extra Small
                </label>
              </div>
              <div>
                <input
                  onChange={() => setFontSize('small')}
                  type="radio"
                  name="font-size"
                  id="font-small"
                  value="small"
                  checked={fontSize === 'small'}
                />
                <label className="ml-2 w-12" htmlFor="font-small">
                  Small
                </label>
              </div>
              <div>
                <input
                  onChange={() => setFontSize('base')}
                  type="radio"
                  name="font-size"
                  id="font-base"
                  value="base"
                  checked={fontSize === 'base'}
                />
                <label className="ml-2 w-12" htmlFor="font-base">
                  Default
                </label>
              </div>
              <div>
                <input
                  onChange={() => setFontSize('large')}
                  type="radio"
                  name="font-size"
                  id="font-large"
                  value="large"
                  checked={fontSize === 'large'}
                />
                <label className="ml-2 w-12" htmlFor="font-large">
                  Large
                </label>
              </div>
              <div>
                <input
                  onChange={() => setFontSize('extra-large')}
                  type="radio"
                  name="font-size"
                  id="font-extra-large"
                  value="extra-large"
                  checked={fontSize === 'extra-large'}
                />
                <label className="ml-2 w-12" htmlFor="font-extra-large">
                  Extra Large
                </label>
              </div>
              <div className="text-3xl">Font Type</div>
              <div>
                <input
                  onChange={() => setFontType('mono')}
                  type="radio"
                  name="font-type"
                  id="font-mono"
                  value="mono"
                  checked={fontType === 'mono'}
                />
                <label className="ml-2 w-12" htmlFor="font-mono">
                  Mono
                </label>
              </div>
              <div>
                <input
                  onChange={() => setFontType('serif')}
                  type="radio"
                  name="font-type"
                  id="font-serif"
                  value="serif"
                  checked={fontType === 'serif'}
                />
                <label className="ml-2 w-12" htmlFor="font-serif">
                  Serif
                </label>
              </div>
              <div>
                <input
                  onChange={() => setFontType('sans')}
                  type="radio"
                  name="font-type"
                  id="font-sans"
                  value="sans"
                  checked={fontType === 'sans'}
                />
                <label className="ml-2 w-12" htmlFor="font-sans">
                  Sans
                </label>
              </div>
              <div>
                <input
                  onChange={() => setFontType('')}
                  type="radio"
                  name="font-type"
                  id="font-default"
                  value=""
                  checked={fontType === ''}
                />
                <label className="ml-2 w-12" htmlFor="font-default">
                  Default
                </label>
              </div>
            </div>
          </div>
          <div className="relative flex w-1/2 flex-col rounded border-2 border-gray-800 p-8">
            <button className="absolute right-2 top-2 shadow-md" onClick={generateContent}>
              Regenerate
            </button>
            {content.map((paragraph, index) => {
              return (
                <div className={`mb-8 mt-8 h-fit w-fit ${fontClass}`} key={index}>
                  {paragraph}
                </div>
              );
            })}
          </div>
          <div className="flex h-fit w-fit flex-col items-center gap-4 rounded border-2 border-sky-600 p-8">
            <div className="mb-4 text-3xl">Copy</div>
            <button
              className="mr-4 w-48 shadow-md"
              onClick={() =>
                copyToClipboard(
                  getContentToCopy({
                    content,
                    isAsAVariable: false,
                    isAsATemplateLiteral: false,
                    isEachStringAVariable: false,
                  })
                )
              }>
              As Is
            </button>
            <button
              className="mr-4 w-48 shadow-md"
              onClick={() =>
                copyToClipboard(
                  getContentToCopy({
                    content,
                    isAsAVariable: true,
                    isAsATemplateLiteral: false,
                    isEachStringAVariable: false,
                  })
                )
              }>
              As Variable
            </button>
            <button
              className="mr-4 w-48 shadow-md"
              onClick={() =>
                copyToClipboard(
                  getContentToCopy({
                    content,
                    isAsAVariable: false,
                    isAsATemplateLiteral: true,
                    isEachStringAVariable: false,
                  })
                )
              }>
              Template Literal
            </button>
            <button
              className="mr-4 w-48 shadow-md"
              onClick={() =>
                copyToClipboard(
                  getContentToCopy({
                    content,
                    isAsAVariable: false,
                    isAsATemplateLiteral: false,
                    isEachStringAVariable: true,
                  })
                )
              }>
              Paragraph = Variable
            </button>
          </div>
        </div>
      </>
    </PageWrapper>
  );
};

export { ParagraphGeneratorPage };
