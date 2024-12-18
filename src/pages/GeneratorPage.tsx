import React, { useState } from 'react';
import { copyToClipboard } from '../utils/copy';
import { GeneratedSection } from '../Generator/GeneratedSection';
import { FieldSection } from '../Generator/FieldSection';
import { fieldTypes, IFieldType, RandomType } from '../Generator/types';
import { getSQLCreateData, getSQLReadData, getAggregatedReactCode } from '../Generator/exportHelper';
import { getCorrectGeneratedValue } from '../Generator/helper';
/*
 * TODO:
 * insert sql template, json, csv switch between formats, preview mode
 * Color Code, Time Stamp
 * Words, Fake Words, Password, Sentence
 * Money, Formula (compute from other columns/values), Geometric/Weighted Distributed Number
 * improve email generator, with the name
 * improve Custom format string generator
 */

const INDEX_ZERO = 0;
const ZERO = 0;
const DEFAULT_ROW_COUNT = 10;
const MIN_ROW_COUNT = 1;
const MAX_ROW_COUNT = 1000;

export const GeneratorPage = () => {
    const [data, setData] = useState<{ column: string, value: string }[][]>([]);
    const [rowCount, setRowCount] = useState<number>(DEFAULT_ROW_COUNT);
    const [columns, setColumns] = useState<IFieldType[]>([fieldTypes[INDEX_ZERO]]);

    const validate = () => {
        const errors = columns.map((item, index) => {
            if (item.variableName) {
                return '';
            } else {
                return 'Error missing name for entry' + index + ' ' + item.randomType;
            }
        });

        return errors.filter(Boolean);
    };

    const generateData = () => {
        const errors = validate();
        if (errors[INDEX_ZERO]) {
            console.error(errors);
            return;
        }
        const result: { column: string, value: string }[][] = [];
        for (let i = ZERO; i < rowCount; i++) {
            const currentRow = columns.map((col, index) => {
                const value = getCorrectGeneratedValue(col, 10 * i + index);

                return { column: col.variableName, value };
            });
            result.push(currentRow);
        }

        setData(result);
    };

    const deleteRowFromData = (rowIndex: number) => {
        const updatedData = data.filter((_, index) => index !== rowIndex);

        setData(updatedData);
    };

    const onHandleCountUpdate = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value: string = event.target.value;
        const valueAsNumber = Number(value);
        if (isNaN(valueAsNumber)) {
            return;
        } else if (valueAsNumber < MIN_ROW_COUNT) {
            setRowCount(MIN_ROW_COUNT);
        } else if (valueAsNumber > MAX_ROW_COUNT) {
            setRowCount(MAX_ROW_COUNT);
        } else {
            setRowCount(valueAsNumber);
        }
    };

    const onHandleAddField = (randomType: RandomType) => {
        const initialField = fieldTypes.find((i) => i.randomType === randomType);
        if (initialField) {
            const updatedData = columns.concat(initialField);
            setColumns(updatedData);
        }
    };

    const onHandleRemoveField = (selectedIndex: number) => {
        const updatedData = columns.filter((_, i) => i !== selectedIndex);

        setColumns(updatedData);
    };

    const onHandleColumnNameChange = (event: React.ChangeEvent<HTMLInputElement>, selectedIndex: number) => {
        const value = event.target.value;
        if (value) {
            const updatedColumns = columns.map((item, index) => {
                if (selectedIndex === index) {
                    return { ...item, variableName: value };
                } else {
                    return item;
                }
            });

            setColumns(updatedColumns);
        }
    };

    const onHandleColumnOptionsChange = (event: React.ChangeEvent<HTMLInputElement>, selectedIndex: number) => {
        const value = event.target.value;
        if (value) {
            const updatedColumns = columns.map((item, index) => {
                if (selectedIndex === index) {
                    return { ...item, userOptions: value };
                } else {
                    return item;
                }
            });

            setColumns(updatedColumns);
        }
    };

    const onHandleBuiltInOptionsChange = (event: React.ChangeEvent<HTMLSelectElement>, selectedIndex: number) => {
        const value = event.target.value;
        if (value) {
            const updatedColumns = columns.map((item, index) => {
                if (selectedIndex === index) {
                    return { ...item, selectedBuiltInOptions: value };
                } else {
                    return item;
                }
            });

            setColumns(updatedColumns);
        }
    };

    const onHandleDataTypeChange = (event: React.ChangeEvent<HTMLSelectElement>, selectedIndex: number) => {
        const value = event.target.value;
        if (value) {
            const updatedColumns = columns.map((item, index) => {
                if (selectedIndex === index) {
                    return { ...item, selectedDataType: value };
                } else {
                    return item;
                }
            });

            setColumns(updatedColumns);
        }
    };

    const onHandleFormTypeChange = (event: React.ChangeEvent<HTMLSelectElement>, selectedIndex: number) => {
        const value = event.target.value;
        if (value) {
            const updatedColumns = columns.map((item, index) => {
                if (selectedIndex === index) {
                    return { ...item, selectedFormType: value };
                } else {
                    return item;
                }
            });

            setColumns(updatedColumns);
        }
    };

    return (
        <div className="m-8">
            <FieldSection
                columns={columns}
                onHandleAddField={onHandleAddField}
                onHandleRemoveField={onHandleRemoveField}
                onHandleColumnNameChange={onHandleColumnNameChange}
                onHandleColumnOptionsChange={onHandleColumnOptionsChange}
                onHandleBuiltInOptionsChange={onHandleBuiltInOptionsChange}
                onHandleDataTypeChange={onHandleDataTypeChange}
                onHandleFormTypeChange={onHandleFormTypeChange}
            />
            <div>
                <button onClick={() => copyToClipboard(getAggregatedReactCode(columns))}>Get React Code</button>
                <button onClick={() => copyToClipboard(getSQLReadData(columns))}>Read SQL</button>
                <button onClick={() => copyToClipboard(getSQLCreateData(columns))}>Create SQL</button>
                <button onClick={generateData}>Generate Data</button>
                <input type="text" onChange={onHandleCountUpdate} value={rowCount} />
            </div>
            <GeneratedSection data={data} deleteRow={deleteRowFromData} />
        </div>
    );
};
