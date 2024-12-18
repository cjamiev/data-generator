import React from 'react';
import { copyToClipboard } from '../utils/copy';
import { getJSONRow } from './exportHelper';

const ZERO = 0;

const getTableData = (data: { column: string, value: string }[][]) => {
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
  data: { column: string, value: string }[][],
  deleteRow: (selectedIndex: number) => void;
}

export const GeneratedTable = ({ data, deleteRow }: IGenerateTable) => {
  const { headers, rows } = getTableData(data);

  if (!data.length) {
    return <div />;
  }

  return (
    <table>
      <thead>
        <tr>
          {headers.map((item: string) => {
            return <th key={item}>{item}</th>;
          })}
          <th>Delete</th>
          <th>Copy</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((entry: string[], index: number) => {
          return (
            <tr key={JSON.stringify(entry)}>
              {entry.map((item: string) => {
                return (
                  <td key={item}>
                    <div>{item}</div>
                  </td>
                );
              })}
              <td>
                <button
                  onClick={() => {
                    deleteRow(index);
                  }}
                >
                  D
                </button>
              </td>
              <td>
                <button
                  onClick={() => {
                    copyToClipboard(getJSONRow(headers, entry));
                  }}
                >
                  C
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
