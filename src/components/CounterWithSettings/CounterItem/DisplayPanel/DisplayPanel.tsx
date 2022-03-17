import React from 'react';
import styles from './DisplayPanel.module.css';

export const DisplayPanel: React.FC = React.memo((props) => {
  console.log('render DisplayPanel');

  return <div className={styles.display}>{props.children}</div>;
});
