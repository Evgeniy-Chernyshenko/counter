import React from 'react';
import styles from './CounterItem.module.css';

export const CounterItem: React.FC = React.memo((props) => {
  console.log('render CounterItem');

  return <div className={styles.counterItem}>{props.children}</div>;
});
