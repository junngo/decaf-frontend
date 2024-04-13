// src/components/Counter.js
import React from 'react';
import { useRecoilState } from 'recoil';
import { counterState } from '../recoil/state';

function Counter() {
  const [count, setCount] = useRecoilState(counterState);

  return (
    <div>
      <h2>Count: {count}</h2>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}

export default Counter;
