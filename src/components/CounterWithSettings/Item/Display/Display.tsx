import styles from './Display.module.css';

type DisplayPropsType = {
  content: React.ReactNode;
};

export const Display = (props: DisplayPropsType) => {
  console.log('render Display');

  return <div className={styles.display}>{props.content}</div>;
};
