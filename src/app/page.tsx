"use client";
import { useState } from "react";
import { getRandomInt } from "@/utils/randomHelper";

const digits = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const getColumn = (selectedNumbers: number[][], verticalIndex: number): number[] => {
  return selectedNumbers.map((entry: number[]) => {
    return entry[verticalIndex]
  });
}
const getRemainingNumbers = (generatedNumbers: number[], verticalNumbers: number[]): number[] => {
  const allNumbers = generatedNumbers.concat(verticalNumbers);

  return digits.filter(digit => allNumbers.findIndex(num => num === digit) === -1);
}
const getUniqueNumbers = (selectedNumbers: number[][]): number[] => {
  const generatedNumbers = [];

  for (let count = 0; count < digits.length; count++) {
    const verticalNumbers = getColumn(selectedNumbers, count);
    const remainingNumbers = getRemainingNumbers(generatedNumbers, verticalNumbers);
    const nextDigitIndex = getRandomInt(remainingNumbers.length);
    const nextDigit = remainingNumbers[nextDigitIndex];

    generatedNumbers.push(nextDigit);
  }

  return generatedNumbers.filter(num => num !== undefined);
}

const getSudokuGrid = (): number[][] => {
  const sudokuGrid: number[][] = [];

  for (let count = 0; count < digits.length; count++) {
    const newRow = getUniqueNumbers(sudokuGrid);

    sudokuGrid.push(newRow)
  }

  return sudokuGrid;
}

const Home = () => {
  const [count, setCount] = useState(0);

  const result = getSudokuGrid();

  return (
    <div key={count}>
      <pre>{result.map(entry => entry.join('|')).join('\n')}</pre>
      <button onClick={() => { setCount(c => c + 1) }}>Reset</button>
    </div>
  );
}

export default Home;