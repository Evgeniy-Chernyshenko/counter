import styles from './Display.module.css';

type DisplayPropsType = {
  count: number;
  isLimitExceeded: boolean;
};

export const Display = (props: DisplayPropsType) => {
  const finalClassName = `${styles.display}${
    props.isLimitExceeded ? ' ' + styles.redText : ''
  }`;

  return <div className={finalClassName}>{props.count}</div>;
};
