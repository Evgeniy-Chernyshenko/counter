import styles from './CounterDisplay.module.css';

type CounterDisplayPropsType = {
  currentValue: number;
  isLimitExceeded: boolean;
  isApplySettings: boolean;
  hasErrors: boolean;
};

export const CounterDisplay = (props: CounterDisplayPropsType) => {
  console.log('render CounterDisplay');

  return (
    <div className={styles.counterDisplay}>
      {props.isApplySettings && (
        <span
          className={`${styles.counter}${
            props.isLimitExceeded ? ' ' + styles.redText : ''
          }`}
        >
          {props.currentValue}
        </span>
      )}
      {!props.isApplySettings &&
        (props.hasErrors ? (
          <span className={`${styles.message} ${styles.redText}`}>
            Incorrect values!
          </span>
        ) : (
          <span className={styles.message}>Enter values and press "set"</span>
        ))}
    </div>
  );
};
