import styles from "./CounterDisplay.module.css";

type CounterDisplayPropsType = {
  currentValue: number;
  isLimitExceeded: boolean;
};

export const CounterDisplay = (props: CounterDisplayPropsType) => {
  return (
    <div className={styles.counterDisplay}>
      <span
        className={`${styles.counter}${
          props.isLimitExceeded ? " " + styles.redText : ""
        }`}
      >
        {props.currentValue}
      </span>
    </div>
  );
};
