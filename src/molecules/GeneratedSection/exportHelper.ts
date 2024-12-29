import { IFieldType, RandomType } from '../../atoms/DisplayRandomFields/types';

const getJSONRow = (header: string[], row: string[]) => {
  const result = header.reduce((accumulator, current, index) => {
    return { ...accumulator, [current]: row[index] };
  }, {});

  return JSON.stringify(result);
};

const getJSONData = (data: { column: string, value: string }[][]) => {
  if (!data.length) {
    return '[]';
  }

  const result = data.map((entry) => {
    return entry
      .map((item) => {
        return { [item.column]: item.value };
      })
      .reduce((accumulator, current) => {
        return { ...accumulator, ...current };
      }, {});
  });

  return JSON.stringify(result);
};

const getCSVData = (header: string[], rows: string[][]) => {
  const lineOne = header.join(',');
  const remainingLines = rows.map((entry) => entry.join(','));

  return [lineOne, ...remainingLines].join('\n');
};

const getSQLInsertData = (header: string[], rows: string[][]) => {
  const lineOne = `INSERT INTO Table (${header.map((i) => `'${i.replace(' ', '_')}'`).join(',')})`;
  const remainingLines = rows.map((entry) => `(${entry.map((i) => `'${i}'`).join(',')})`);

  return [lineOne, 'VALUES', ...remainingLines, ';'].join('\n');
};

const getSQLUpdateData = (header: string[], row: string[]) => {
  const lineOne = 'UPDATE <table_name>';
  const remainingLines = row.map((data, index) => `${header[index]}='${data}'`).join(',');

  return [lineOne, 'SET ' + remainingLines, 'WHERE condition;'].join('\n');
};

const getSQLDataType = (type: string) => {
  if (type === 'date') {
    return 'date';
  }
  if (type === 'boolean') {
    return 'bool';
  }
  if (type === 'number') {
    return 'int';
  }
  return 'varchar(100)';
};

// TODO: table name, customize format of column names
const getSQLCreateData = (header: { randomType: RandomType, selectedDataType: string }[]) => {
  const lineOne = 'CREATE TABLE <table-name> (';
  const remainingLines = header
    .map((i) => `  ${i.randomType.replace(' ', '_')} ${getSQLDataType(i.selectedDataType)}`)
    .join(',\n');

  return [lineOne, remainingLines, ');'].join('\n');
};

// TODO: table name, add where clause
const getSQLReadData = (columns: IFieldType[]) => {
  const header = columns.map((i) => i.randomType.replace(' ', '_')).join(', ');

  return 'Select ' + header + ' From <table-name>';
};

export {
  getJSONRow,
  getJSONData,
  getCSVData,
  getSQLInsertData,
  getSQLUpdateData,
  getSQLCreateData,
  getSQLReadData
};
