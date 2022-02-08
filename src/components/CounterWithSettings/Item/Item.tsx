import React from "react";
import { Display } from "./Display/Display";
import { Buttons } from "./Buttons/Buttons";
import styles from "./Item.module.css";

type CounterItemPropsType = {
  display: React.ReactNode;
  buttons: React.ReactNode;
};

export const Item = (props: CounterItemPropsType) => {
  return (
    <div className={styles.counterItem}>
      <Display content={props.display} />
      <Buttons content={props.buttons} />
    </div>
  );
};
