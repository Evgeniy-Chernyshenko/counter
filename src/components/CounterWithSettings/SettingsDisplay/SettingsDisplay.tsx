import styles from "./SettingsDisplay.module.css";
import {
  setMaxValueCallBackType,
  setStartValueCallBackType,
} from "../CounterWithSettings";

type SettingsDisplayPropsType = {
  startValue: number;
  maxValue: number;
  setStartValueCallBack: setStartValueCallBackType;
  setMaxValueCallBack: setMaxValueCallBackType;
  isStartValueError: boolean;
  isMaxValueError: boolean;
};

export const SettingsDisplay = (props: SettingsDisplayPropsType) => {
  return (
    <div className={styles.settingsDisplay}>
      <label>
        max value:{" "}
        <input
          className={props.isMaxValueError ? styles.error : ""}
          type="number"
          value={props.maxValue}
          onChange={props.setMaxValueCallBack}
        />
      </label>
      <label>
        start value:{" "}
        <input
          className={props.isStartValueError ? styles.error : ""}
          type="number"
          value={props.startValue}
          onChange={props.setStartValueCallBack}
        />
      </label>
    </div>
  );
};
