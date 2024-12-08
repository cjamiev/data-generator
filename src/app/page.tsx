"use client";
import { useState } from "react";
import { getRandomInt } from "@/utils/randomHelper";

const digits = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const getUniqueNumbers = (selectedNumbers: number[]): number[] => {
  const generatedNumbers = [];
  const remainingNumbers = digits.filter(digit => selectedNumbers.findIndex(num => num === digit) === -1);

  for (let count = 0; count < digits.length; count++) {
    const nextDigitIndex = getRandomInt(remainingNumbers.length);
    const nextDigit = remainingNumbers[nextDigitIndex];

    remainingNumbers.splice(nextDigitIndex, 1);
    generatedNumbers.push(nextDigit);
  }

  return generatedNumbers.filter(num => num !== undefined);
}

const Home = () => {
  const [count, setCount] = useState(0);

  const result = getUniqueNumbers([]);

  return (
    <div key={count}>
      {JSON.stringify(result)}
      <button onClick={() => { setCount(c => c + 1) }}>Reset</button>
    </div>
  );
}

export default Home;