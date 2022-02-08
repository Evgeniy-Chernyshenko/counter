import React from "react";
import styles from "./Button.module.css";

type DefaultButtonPropsType = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export const Button = ({ className, ...restProps }: DefaultButtonPropsType) => {
  const finalClassName = `${styles.default}${className ? " " + className : ""}`;

  return <button className={finalClassName} {...restProps} />;
};
