import { PageWrapper } from '../layout';
import { copyToClipboard } from '../utils/copy';
import { loremIpsum } from '../mocks/fakewords';
import { capitalizeFirstLetter } from '../utils/stringHelper';

/*
 * Refactor
 * Hi-priority features
 * - Words per sentence
 * - Sentences per paragraph
 * - Number of paragraphs
 * - Copy contents
 * Lo-Priority features
 * - Font Size
 * - Font Family
 */
const size = loremIpsum.length;
const getFakeWord = () => {
  const index = Math.floor(Math.random() * size);
  return loremIpsum[index];
}

const getFakeSentence = () => {
  const numOfWords = Math.floor(Math.random() * 10) + 2;
  const genFakeSentence: string[] = [];
  for (let count = 0; count < numOfWords; count++) {
    const newFakeWord = getFakeWord();
    const fakeWord = count === 0 ? capitalizeFirstLetter(newFakeWord) : newFakeWord;
    genFakeSentence.push(fakeWord);
  }

  return `${genFakeSentence.join(' ')}.`;
}

const getFakeParagraph = () => {
  const numOfSentences = Math.floor(Math.random() * 3) + 3;
  const genFakeParagraph: string[] = [];
  for (let count = 0; count < numOfSentences; count++) {
    const newFakeSentence = getFakeSentence();
    genFakeParagraph.push(newFakeSentence);
  }

  return genFakeParagraph.join(' ');
}

const getFakePage = (numOfParagraphs: number) => {
  const genFakePage: string[] = [];
  for (let count = 0; count < numOfParagraphs; count++) {
    const newFakeParagraph = getFakeParagraph();
    genFakePage.push(newFakeParagraph);
  }

  return genFakePage;
}

const ParagraphGeneratorPage = () => {
  const result = getFakePage(5);

  return (
    <PageWrapper>
      <>
        <h1 className="pb-4 text-6xl">Paragraph Generator</h1>
        <div>
          {result.map((paragraph, index) => {
            return <div className='w-64 h-fit mt-8 mb-8' key={index}>{paragraph}</div>
          })}
        </div>
      </>
    </PageWrapper>
  );
};

export { ParagraphGeneratorPage };
