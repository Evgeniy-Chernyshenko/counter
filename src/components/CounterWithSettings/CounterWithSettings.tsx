import { Item } from './Item/Item';
import { Button } from './Button/Button';
import { CounterDisplay } from './CounterDisplay/CounterDisplay';
import { SettingsDisplay } from './SettingsDisplay/SettingsDisplay';
import { ChangeEvent, useEffect, useState } from 'react';
import styles from './CounterWithSettings.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { RootStateType } from '../../redux/store';
import { counterAC, CounterStateType } from '../../redux/counter-reducer';

type CounterWithSettingsPropsType = {
  isOneDisplay?: boolean;
  initMaxValue: number;
  initStartValue: number;
};

export type setStartValueCallBackType = (
  e: ChangeEvent<HTMLInputElement>
) => void;

export type setMaxValueCallBackType = (
  e: ChangeEvent<HTMLInputElement>
) => void;

export const CounterWithSettings = (props: CounterWithSettingsPropsType) => {
  const isOneDisplay = !!props.isOneDisplay;

  const state = useSelector<RootStateType, CounterStateType>(
    (state) => state.counterReducer
  );
  const dispatch = useDispatch();

  const setStartValueCallBack: setStartValueCallBackType = (e) => {
    dispatch(counterAC.setStartValue(+e.currentTarget.value));
  };

  const setMaxValueCallBack: setMaxValueCallBackType = (e) => {
    dispatch(counterAC.setMaxValue(+e.currentTarget.value));
  };

  const incClickHandler = () => {
    dispatch(counterAC.incrementCurrentValue());
  };

  const resetClickHandler = () => {
    dispatch(counterAC.resetCurrentValue());
  };

  const setClickHandler = () => {
    !state.hasErrors && dispatch(counterAC.setIsApplySettings(true));
  };

  const settingsClickHandler = () => {
    dispatch(counterAC.setIsApplySettings(false));
  };

  return (
    <div
      className={`${styles.counterWithSettings}${
        isOneDisplay ? ' ' + styles.oneDisplay : ''
      }`}
    >
      {((isOneDisplay && state.isApplySettings) || !isOneDisplay) && (
        <Item
          display={
            <CounterDisplay
              currentValue={state.currentValue}
              isLimitExceeded={state.isLimitExceeded}
              isApplySettings={state.isApplySettings}
              hasErrors={state.hasErrors}
            />
          }
          buttons={
            <>
              <Button
                disabled={state.isLimitExceeded || !state.isApplySettings}
                onClick={incClickHandler}
              >
                inc
              </Button>
              <Button
                disabled={
                  !state.isApplySettings ||
                  state.currentValue === state.startValue
                }
                onClick={resetClickHandler}
              >
                reset
              </Button>
              {isOneDisplay && (
                <Button
                  disabled={!state.isApplySettings}
                  onClick={settingsClickHandler}
                >
                  settings
                </Button>
              )}
            </>
          }
        />
      )}

      {((isOneDisplay && !state.isApplySettings) || !isOneDisplay) && (
        <Item
          display={
            <SettingsDisplay
              startValue={state.startValue}
              maxValue={state.maxValue}
              setStartValueCallBack={setStartValueCallBack}
              setMaxValueCallBack={setMaxValueCallBack}
              isStartValueError={state.isStartValueError}
              isMaxValueError={state.isMaxValueError}
            />
          }
          buttons={
            <Button
              disabled={state.isApplySettings || state.hasErrors}
              onClick={setClickHandler}
            >
              set
            </Button>
          }
        />
      )}
    </div>
  );
};
