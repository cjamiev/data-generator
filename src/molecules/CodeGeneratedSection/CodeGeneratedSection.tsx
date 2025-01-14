import React, { useState } from 'react';
import { ICodeProp } from '../../types/codeField';
import { CodeMapperToForm } from '../../atoms/CodeMapperToForm';

interface ICodeGeneratedSection {
  codeFields: ICodeProp[];
}

const ActiveTabClass = 'border-t-2 border-l-2 border-r-2 rounded-t-xl border-gray-500';

export const CodeGeneratedSection = ({ codeFields }: ICodeGeneratedSection) => {
  const [selectedTab, setSelectedTab] = useState<number>(0);

  if (!codeFields.length) {
    return <div />;
  }

  return (
    <div>
      <div></div>
      <div className="rounded-xl border-2 border-gray-500 p-4">
        <div className="flex gap-10">
          <div>
            <div className="mb-2 text-xl">View Result</div>
            <ul className="flex w-fit border-b-2 border-solid border-gray-500">
              <li className={`p-1 ${selectedTab === 0 ? ActiveTabClass : ''}`}>
                <button className="m-0 h-6 w-12 border-none p-0 hover:bg-transparent" onClick={() => setSelectedTab(0)}>
                  View
                </button>
              </li>
              <li className={`p-1 ${selectedTab === 1 ? ActiveTabClass : ''}`}>
                <button className="m-0 h-6 w-12 border-none p-0 hover:bg-transparent" onClick={() => setSelectedTab(1)}>
                  Code
                </button>
              </li>
            </ul>
          </div>
          <div>
            <div className="mb-2 text-xl">Copy Result</div>
            <button className="mr-2 w-16" onClick={() => {}}>
              Code
            </button>
          </div>
        </div>
        {selectedTab === 0 ? <CodeMapperToForm codeFields={codeFields} /> : null}
        {selectedTab === 1 ? <div>Code</div> : null}
      </div>
    </div>
  );
};
