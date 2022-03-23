import React from 'react';
import styles from './SettingsDisplay.module.css';
import {
  setMaxValueCallBackType,
  setStartValueCallBackType,
} from '../CounterWithSettings';
import { Input } from '../Input/Input';

type SettingsDisplayPropsType = {
  startValue: number;
  maxValue: number;
  setStartValueCallBack: setStartValueCallBackType;
  setMaxValueCallBack: setMaxValueCallBackType;
  isStartValueError: boolean;
  isMaxValueError: boolean;
};

export const SettingsDisplay = React.memo((props: SettingsDisplayPropsType) => {
  console.log('render SettingsDisplay');

  return (
    <div className={styles.settingsDisplay}>
      <label>
        max value:{' '}
        <Input
          type="number"
          value={props.maxValue}
          onChange={props.setMaxValueCallBack}
          hasError={props.isStartValueError}
        />
      </label>
      <label>
        start value:{' '}
        <Input
          type="number"
          value={props.startValue}
          onChange={props.setStartValueCallBack}
          hasError={props.isStartValueError}
        />
      </label>
    </div>
  );
});
