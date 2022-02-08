import React from "react";
import styles from "./Display.module.css";

type DisplayPropsType = {
  content: React.ReactNode;
};

export const Display = (props: DisplayPropsType) => {
  return <div className={styles.display}>{props.content}</div>;
};
