import { useState } from 'react';
import { Button } from './Button/Button';
import { Display } from './Display/Display';
import styles from './Counter.module.css';

type CounterPropsType = {
  initialCount: number;
  maxCount: number;
};

export const Counter = (props: CounterPropsType) => {
  const [count, setCount] = useState<number>(props.initialCount);

  const isLimitExceeded = count >= props.maxCount;

  const addToCounterHandler = () => {
    if (isLimitExceeded) {
      return;
    }

    setCount(count + 1);
  };

  const resetCounterHandler = () => {
    setCount(props.initialCount);
  };

  return (
    <div className={styles.counter}>
      <Display count={count} isLimitExceeded={isLimitExceeded} />
      <div className={styles.buttonsContainer}>
        <Button disabled={isLimitExceeded} onClick={addToCounterHandler}>
          add
        </Button>
        <Button disabled={!isLimitExceeded} onClick={resetCounterHandler}>
          reset
        </Button>
      </div>
    </div>
  );
};
