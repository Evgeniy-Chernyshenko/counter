import { Item } from "./Item/Item";
import { Button } from "./Button/Button";
import { CounterDisplay } from "./CounterDisplay/CounterDisplay";
import { SettingsDisplay } from "./SettingsDisplay/SettingsDisplay";
import { ChangeEvent, useEffect, useState } from "react";
import styles from "./CounterWithSettingsOneScreen.module.css";

type CounterWithSettingsPropsType = {
  initMaxValue: number;
  initStartValue: number;
};

export type setStartValueCallBackType = (
  e: ChangeEvent<HTMLInputElement>
) => void;

export type setMaxValueCallBackType = (
  e: ChangeEvent<HTMLInputElement>
) => void;

export const CounterWithSettingsOneScreen = (
  props: CounterWithSettingsPropsType
) => {
  const [startValue, setStartValue] = useState<number>(props.initStartValue);
  const [maxValue, setMaxValue] = useState<number>(props.initMaxValue);
  const [currentValue, setCurrentValue] = useState<number>(
    props.initStartValue
  );
  const [isApplySettings, setIsApplySetting] = useState<boolean>(true);

  useEffect(() => {
    const values = localStorage.getItem("values");

    if (!values) {
      return;
    }

    const parsedValues = JSON.parse(values);

    setStartValue(parsedValues.startValue);
    setMaxValue(parsedValues.maxValue);
    setCurrentValue(parsedValues.currentValue);
    setIsApplySetting(parsedValues.isApplySettings);
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "values",
      JSON.stringify({
        startValue,
        maxValue,
        currentValue,
        isApplySettings,
      })
    );
  }, [startValue, maxValue, currentValue, isApplySettings]);

  const isLimitExceeded = currentValue >= maxValue;

  const isStartValueError = startValue < 0 || startValue >= maxValue;
  const isMaxValueError = maxValue <= 0 || maxValue <= startValue;
  const hasErrors = isStartValueError || isMaxValueError;

  const setStartValueCallBack: setStartValueCallBackType = (e) => {
    setStartValue(+e.currentTarget.value);
    setIsApplySetting(false);
  };

  const setMaxValueCallBack: setMaxValueCallBackType = (e) => {
    setMaxValue(+e.currentTarget.value);
    setIsApplySetting(false);
  };

  const incClickHandler = () => {
    if (isLimitExceeded) {
      return;
    }

    setCurrentValue(currentValue + 1);
  };

  const resetClickHandler = () => {
    setCurrentValue(startValue);
  };

  const setClickHandler = () => {
    if (hasErrors) {
      return;
    }

    setCurrentValue(startValue);
    setIsApplySetting(true);
  };

  const settingsClickHandler = () => {
    setIsApplySetting(false);
  };

  return (
    <div className={styles.counterWithSettingsOneScreen}>
      <Item
        display={
          isApplySettings ? (
            <CounterDisplay
              currentValue={currentValue}
              isLimitExceeded={isLimitExceeded}
            />
          ) : (
            <SettingsDisplay
              startValue={startValue}
              maxValue={maxValue}
              setStartValueCallBack={setStartValueCallBack}
              setMaxValueCallBack={setMaxValueCallBack}
              isStartValueError={isStartValueError}
              isMaxValueError={isMaxValueError}
            />
          )
        }
        buttons={
          isApplySettings ? (
            <>
              <Button
                disabled={isLimitExceeded || !isApplySettings}
                onClick={incClickHandler}
              >
                inc
              </Button>
              <Button disabled={!isApplySettings} onClick={resetClickHandler}>
                reset
              </Button>
              <Button onClick={settingsClickHandler}>settings</Button>
            </>
          ) : (
            <Button disabled={hasErrors} onClick={setClickHandler}>
              set
            </Button>
          )
        }
      />
    </div>
  );
};
