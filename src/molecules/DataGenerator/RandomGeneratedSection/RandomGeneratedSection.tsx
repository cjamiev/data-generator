import { useState } from 'react';
import { copyToClipboard } from '../../../utils/copy';
import { getJSONData, getCSVData, getSQLInsertData } from './exportHelper';
import { RandomGeneratedTable } from '../../../atoms/DataGenerator/RandomGeneratedTable';

const ZERO = 0;

const getTableData = (data: { column: string; value: string }[][]) => {
  if (!data.length) {
    return { headers: [], rows: [] };
  }

  const headers = data[ZERO].map((i) => i.column);
  const rows = data.map((item) => {
    return item.map((i) => i.value);
  });

  return { headers, rows };
};

interface IGenerateTable {
  data: { column: string; value: string }[][];
  deleteRow: (selectedIndex: number) => void;
}

const ActiveTabClass = 'border-t-2 border-l-2 border-r-2 rounded-t-xl border-gray-500';

export const RandomGeneratedSection = ({ data, deleteRow }: IGenerateTable) => {
  const [selectedTab, setSelectedTab] = useState<number>(0);
  const { headers, rows } = getTableData(data);

  if (!data.length) {
    return <div />;
  }

  return (
    <div className="rounded-xl border-2 border-gray-500 p-4">
      <div className="flex gap-10">
        <div>
          <div className="mb-2 text-xl">View Result</div>
          <ul className="flex w-fit border-b-2 border-solid border-gray-500">
            <li className={`p-1 ${selectedTab === 0 ? ActiveTabClass : ''}`}>
              <button className="m-0 h-6 w-12 border-none p-0 hover:bg-transparent" onClick={() => setSelectedTab(0)}>
                Table
              </button>
            </li>
            <li className={`p-1 ${selectedTab === 1 ? ActiveTabClass : ''}`}>
              <button className="m-0 h-6 w-12 border-none p-0 hover:bg-transparent" onClick={() => setSelectedTab(1)}>
                JSON
              </button>
            </li>
            <li className={`p-1 ${selectedTab === 2 ? ActiveTabClass : ''}`}>
              <button className="m-0 h-6 w-12 border-none p-0 hover:bg-transparent" onClick={() => setSelectedTab(2)}>
                CSV
              </button>
            </li>
            <li className={`p-1 ${selectedTab === 3 ? ActiveTabClass : ''}`}>
              <button className="m-0 h-6 w-12 border-none p-0 hover:bg-transparent" onClick={() => setSelectedTab(3)}>
                SQL
              </button>
            </li>
          </ul>
        </div>
        <div>
          <div className="mb-2 text-xl">Copy Result</div>
          <button
            className="mr-2 w-16"
            onClick={() => {
              copyToClipboard(getJSONData(data));
            }}>
            JSON
          </button>
          <button
            className="mr-2 w-16"
            onClick={() => {
              copyToClipboard(getCSVData(headers, rows));
            }}>
            CSV
          </button>
          <button
            className="mr-2 w-16"
            onClick={() => {
              copyToClipboard(getSQLInsertData(headers, rows));
            }}>
            SQL
          </button>
        </div>
      </div>
      {selectedTab === 0 ? <RandomGeneratedTable data={data} deleteRow={deleteRow} /> : null}
      {selectedTab === 1 ? (
        <div>
          {JSON.parse(getJSONData(data)).map((section: unknown, index: number) => {
            return <div key={index}>{JSON.stringify(section, null, 4)}</div>;
          })}
        </div>
      ) : null}
      {selectedTab === 2 ? (
        <div>
          {getCSVData(headers, rows)
            .split('\n')
            .map((section: string, index: number) => {
              return <div key={index}>{section}</div>;
            })}
        </div>
      ) : null}
      {selectedTab === 3 ? (
        <div>
          {getSQLInsertData(headers, rows)
            .split('\n')
            .map((section: string, index: number) => {
              return <div key={index}>{section}</div>;
            })}
        </div>
      ) : null}
    </div>
  );
};
