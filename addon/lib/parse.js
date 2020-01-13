import { renderImage } from './renderValues';

const textColumnWidth = 300;
const simpleColumnWidth = 100;

const arrayValue = ({ key, value }) => {
  if (!Array.isArray(value)) return null;
  return {
    id: key,
    getLabel: () => `[${key}]`,
    getValue: () => `[${value.length}]`,
    minWidth: simpleColumnWidth,
    align: 'right',
    render: null,
  };
};

const objectValue = ({ key, value, options }) => {
  if (typeof value !== 'object' || value === null) return null;
  // eslint-disable-next-line no-use-before-define
  const columns = extractColumns(options)(value);
  return columns.map(entry => ({
    ...entry,
    id: `${key}-${entry.id}`,
  }));
};

const imageValue = ({ key, value, ind }) => {
  const url = key === 'url' ? value : value && value.url;
  if (!url) return null;
  if (url.mimeType) {
    if (!/^image/.test(url.mimeType)) return null;
  }
  return {
    // eslint-disable-next-line no-use-before-define
    ...unknownValue({ key, value, ind }),
    render: renderImage({ url, value }),
  };
};

const simpleValue = ({ key, value, ind }) => {
  if (Array.isArray(value)) return null;
  if (typeof value === 'object' && value !== null) return null;
  return {
    id: key,
    getLabel: () => `${key}`,
    getValue: () => value,
    minWidth: ind === 1 ? textColumnWidth : simpleColumnWidth,
    align: ind === 1 ? 'left' : 'right',
    render: null,
  };
};

const unknownValue = ({ key, value, ind }) => ({
  id: key,
  getLabel: () => `${key}`,
  getValue: () => {
    try {
      return `${value}`;
    } catch (err) {
      return '???';
    }
  },
  minWidth: ind === 1 ? textColumnWidth : simpleColumnWidth,
  align: ind === 1 ? 'left' : 'right',
  render: null,
});

const valueTypesOrder = [arrayValue, imageValue, objectValue, simpleValue, unknownValue];

const extractEntry = (key, value, ind, options) => {
  // eslint-disable-next-line no-restricted-syntax
  for (const tryExtract of valueTypesOrder) {
    try {
      const entry = tryExtract({ key, value, ind, options });
      if (entry) return entry;
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
      return unknownValue({ key, value, ind });
    }
  }
  return unknownValue({ key, value, ind });
};

const flatMap = (array, fn) =>
  array.reduce((acc, item) => {
    const newItem = fn(item);
    return Array.isArray(newItem) ? [...acc, ...newItem] : [...acc, newItem];
  }, []);

const extractColumns = options => keyObj => {
  const entries = Object.entries(keyObj);

  const columns = flatMap(entries, (entry, i) => extractEntry(...entry, i, options));

  return columns;
};

export const parseResult = (result, options) => {
  const isArray = Array.isArray(result);
  const resultArray = isArray ? result : [result];
  const keyObj = resultArray[0];
  if (!keyObj) {
    // TODO: align with API
    return { columns: [], rows: [] };
  }
  const createColumns = extractColumns(options);
  const columns = createColumns(keyObj);
  const rows = resultArray.map(row => ({
    id: row.id,
    columns: createColumns(row),
  }));

  return { columns, rows };
};
