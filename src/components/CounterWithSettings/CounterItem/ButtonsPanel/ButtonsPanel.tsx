import React from 'react';
import styles from './ButtonsPanel.module.css';

export const ButtonsPanel: React.FC = React.memo((props) => {
  console.log('render ButtonsPanel');

  return <div className={styles.buttons}>{props.children}</div>;
});
