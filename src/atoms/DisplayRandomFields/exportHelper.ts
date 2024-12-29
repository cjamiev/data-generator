import { lowerCaseFirstLetter, capitalizeFirstLetter } from '../../utils/stringHelper';
import { IFieldType } from './types';

const INDEX_ZERO = 0;

const getReactChangeHandler = (selectedFormType: string, name: string) => {
  if (selectedFormType === 'checkbox' || selectedFormType === 'radio') {
    return `
        const onHandle${name}Click = (value) => {
          set${name}(value);
        };
      `;
  }

  return `
        const onHandle${name}Change = (event) => {
          const value = event.target.value;
          set${name}(value);
        };
      `;
};

// eslint-disable-next-line max-params
const getReactForm = (selectedFormType: string, variableName: string, lowerCasedName: string, upperCasedName: string, userOptions: string[], index: number) => {
  if (selectedFormType === 'checkbox') {
    return userOptions
      .map((op) => {
        return `
        <div key='${op}'>
          <input type="checkbox" id="checkbox${op}" onClick={() => onHandle${upperCasedName}Click("${op}")} value='${op}' />
          <label htmlFor="checkbox${op}">${op}</label>
        </div>
        `;
      })
      .join('\n');
  } else if (selectedFormType === 'radio') {
    return userOptions
      .map((op) => {
        return `
        <div key='${op}'>
          <input type="radio" id="radioGroup${op}" name="radioGroup${index}" onClick={() => onHandle${upperCasedName}Click("${op}")} value='${op}' />
          <label htmlFor="radioGroup${op}">${op}</label>
        </div>
        `;
      })
      .join('\n');
  } else if (selectedFormType === 'select') {
    const optionElements = userOptions
      .map((op) => {
        return `
            <option key='${op}' value='${op}'>
              ${op}
            </option>
        `;
      })
      .join('\n');

    return `
          <select onChange={onHandle${upperCasedName}Change}>
            ${optionElements}
          </select>
        `;
  }
  return `
      <label>${variableName}</label>
      <input type="text" onChange={onHandle${upperCasedName}Change} placeholder={'Enter ${variableName}'} value={${lowerCasedName}}></input>
    `;
};

const getReactCode = (column: IFieldType) => {
  const { variableName, randomType, selectedFormType, userOptions } = column;
  const lowerCasedName = lowerCaseFirstLetter(variableName.split(' ').join(''));
  const upperCasedName = capitalizeFirstLetter(lowerCasedName);
  const options = userOptions.includes(',') ? userOptions.split(',') : userOptions.split('');

  return `
        const [${lowerCasedName}, set${upperCasedName}] = useState('${randomType}');
  
        ${getReactChangeHandler(selectedFormType, upperCasedName)}
  
        return (
          <div>
            ${getReactForm(selectedFormType, variableName, lowerCasedName, upperCasedName, options, INDEX_ZERO)}
          </div>
        );
        `;
};

const getAggregatedReactCode = (columns: IFieldType[]) => {
  const pieces = columns.map((item, index) => {
    const lowerCasedName = lowerCaseFirstLetter(item.variableName.split(' ').join(''));
    const upperCasedName = capitalizeFirstLetter(lowerCasedName);
    const options = item.userOptions.includes(',') ? item.userOptions.split(',') : item.userOptions.split('');

    const stateSection = `const [${lowerCasedName}, set${upperCasedName}] = useState('${item.randomType}');`;
    const onChangeSection = getReactChangeHandler(item.selectedFormType, upperCasedName);
    const JSXSection = getReactForm(
      item.selectedFormType,
      item.variableName,
      lowerCasedName,
      upperCasedName,
      options,
      index
    );

    return { stateSection, onChangeSection, JSXSection };
  });

  const aggregateStateSection = pieces.map((item) => item.stateSection).join('\n');
  const aggregateOnChangeSection = pieces.map((item) => item.onChangeSection).join('');
  const aggregateJSXSection = pieces.map((item) => item.JSXSection).join('');

  const completedJSXSection = `
          return (
          <div>
            ${aggregateJSXSection}
          </div>
        );
    `;

  return aggregateStateSection + `\n${aggregateOnChangeSection}\n` + completedJSXSection;
};

export {
  getReactCode,
  getAggregatedReactCode
};
