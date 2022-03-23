import React from 'react';
import styles from './Input.module.css';

type DefaultButtonPropsType = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  hasError: boolean;
};

export const Input = React.memo(
  ({ className, hasError, ...restProps }: DefaultButtonPropsType) => {
    console.log('render Input');

    const finalClassName = `${styles.default}${
      hasError ? ' ' + styles.error : ''
    }${className ? ' ' + className : ''}`;

    return <input className={finalClassName} {...restProps} />;
  }
);
