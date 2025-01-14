import React, { useState } from 'react';
import { CodeFieldLabel, ICodeProp } from '../../types/codeField';

interface ICodeMapperToForm {
  codeFields: ICodeProp[];
}

export const CodeMapperToForm = ({ codeFields }: ICodeMapperToForm) => {
  if (!codeFields.length) {
    return <div />;
  }

  return (
    <div>
      {codeFields.map((cf) => {
        return (
          <div key={cf.type + cf.label} className="mb-4 flex w-48 flex-col gap-1">
            {cf.type === CodeFieldLabel.BUTTON && (
              <button
                className="w-fit"
                onClick={() => {
                  console.log(cf.variableName);
                }}>
                {cf.label}
              </button>
            )}
            {cf.type === CodeFieldLabel.TEXT && (
              <>
                <label>{cf.label}</label>
                <input
                  className="rounded border-2 border-sky-500"
                  type="text"
                  onChange={() => {}}
                  value={cf.variableName}></input>
              </>
            )}
            {cf.type === CodeFieldLabel.RADIO && (
              <div>
                <input
                  type="radio"
                  className="mr-2"
                  id={`${cf.type + cf.label}`}
                  onChange={() => {}}
                  value={cf.variableName}></input>
                <label htmlFor={`${cf.type + cf.label}`}>{cf.label}</label>
              </div>
            )}
            {cf.type === CodeFieldLabel.CHECKBOX && (
              <div>
                <input
                  type="checkbox"
                  className="mr-2"
                  id={`${cf.type + cf.label}`}
                  onChange={() => {}}
                  value={cf.variableName}></input>
                <label htmlFor={`${cf.type + cf.label}`}>{cf.label}</label>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
