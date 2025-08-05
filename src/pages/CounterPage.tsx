import type { JSX } from "react"
import { useState } from "react"
import { useAppDispatch, useAppSelector } from "../store"
import {
  decrement,
  increment,
  incrementAsync,
  incrementByAmount,
  selectCount,
  selectStatus,
} from "../store/counterSlice"

export const CounterPage = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const count = useAppSelector(selectCount)
  const status = useAppSelector(selectStatus)
  const [incrementAmount, setIncrementAmount] = useState("2")

  const incrementValue = Number(incrementAmount) || 0

  return (
    <div>
      <div>
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          -
        </button>
        <label aria-label="Count">
          {count}
        </label>
        <button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          +
        </button>
      </div>
      <div>
        <input
          aria-label="Set increment amount"
          value={incrementAmount}
          type="number"
          onChange={e => {
            setIncrementAmount(e.target.value)
          }}
        />
        <button
          onClick={() => dispatch(incrementByAmount(incrementValue))}
        >
          Add Amount
        </button>
        <button
          disabled={status !== "idle"}
          onClick={() => {
            void dispatch(incrementAsync(incrementValue))
          }}
        >
          Add Async
        </button>
      </div>
    </div>
  )
}