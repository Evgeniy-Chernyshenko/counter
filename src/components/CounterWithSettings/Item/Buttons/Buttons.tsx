import styles from './Buttons.module.css';

type ButtonsPropsType = {
  content: React.ReactNode;
};

export const Buttons = (props: ButtonsPropsType) => {
  console.log('render Buttons');

  return <div className={styles.buttons}>{props.content}</div>;
};
