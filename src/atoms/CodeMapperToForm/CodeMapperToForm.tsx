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
          <div key={cf.type + cf.label} className="mb-4 flex flex-col gap-1">
            {cf.type === CodeFieldLabel.BUTTON && (
              <button
                className="w-48"
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
                  className="w-48 rounded border-2 border-sky-500"
                  type="text"
                  onChange={() => {}}
                  value={cf.variableName}></input>
              </>
            )}
            {cf.type === CodeFieldLabel.RADIO && (
              <div>
                <input
                  type="radio"
                  className="mr-2 w-48"
                  id={`${cf.type + cf.label}`}
                  name={`${cf.type + cf.label}`}
                  onChange={() => {}}
                  value={cf.variableName}></input>
                <label className="mr-2" htmlFor={`${cf.type + cf.label}`}>
                  {cf.label}
                </label>
                {cf.subcodefield.map((subcf) => {
                  return (
                    <>
                      <input
                        type="radio"
                        className="mr-2 w-48"
                        id={`${subcf.label + subcf.variableName}`}
                        name={`${cf.type + cf.label}`}
                        onChange={() => {}}
                        value={subcf.variableName}></input>
                      <label className="mr-2" htmlFor={`${subcf.label + subcf.variableName}`}>
                        {subcf.label}
                      </label>
                    </>
                  );
                })}
              </div>
            )}
            {cf.type === CodeFieldLabel.CHECKBOX && (
              <div>
                <input
                  type="checkbox"
                  id={`${cf.type + cf.label}`}
                  name={`${cf.type + cf.label}`}
                  className="mr-2 w-4"
                  onChange={() => {}}
                  value={cf.variableName}></input>
                <label className="mr-2" htmlFor={`${cf.type + cf.label}`}>
                  {cf.label}
                </label>
                {cf.subcodefield.map((subcf) => {
                  return (
                    <>
                      <input
                        type="checkbox"
                        id={`${subcf.label + subcf.variableName}`}
                        name={`${cf.type + cf.label}`}
                        className="mr-2 w-4"
                        onChange={() => {}}
                        value={subcf.variableName}></input>
                      <label className="mr-2" htmlFor={`${subcf.label + subcf.variableName}`}>
                        {subcf.label}
                      </label>
                    </>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
