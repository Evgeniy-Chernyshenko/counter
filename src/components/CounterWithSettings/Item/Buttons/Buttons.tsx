import React from "react";
import styles from "./Buttons.module.css";

type ButtonsPropsType = {
  content: React.ReactNode;
};

export const Buttons = (props: ButtonsPropsType) => {
  return <div className={styles.buttons}>{props.content}</div>;
};
