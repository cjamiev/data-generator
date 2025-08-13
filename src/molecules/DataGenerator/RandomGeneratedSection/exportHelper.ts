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
  const lineOne = `INSERT INTO Table (${header.map((i) => `${i.replace(' ', '_')}`).join(',')})`;
  const size = rows.length;
  const remainingLines = rows.map((entry, idx) => `(${entry.map((i) => `'${i}'`).join(',')})${size === idx + 1 ? ';' : ','}`);

  return [lineOne, 'VALUES', ...remainingLines].join('\n');
};

const getSQLUpdateData = (header: string[], row: string[]) => {
  const lineOne = 'UPDATE <table_name>';
  const remainingLines = row.map((data, index) => `${header[index]}='${data}'`).join(',');

  return [lineOne, 'SET ' + remainingLines, 'WHERE condition;'].join('\n');
};

export {
  getJSONRow,
  getJSONData,
  getCSVData,
  getSQLInsertData,
  getSQLUpdateData,
};
