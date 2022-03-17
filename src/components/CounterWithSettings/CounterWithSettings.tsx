import React from 'react';
import { CounterItem } from './CounterItem/CounterItem';
import { Button } from './Button/Button';
import { CounterDisplay } from './CounterDisplay/CounterDisplay';
import { SettingsDisplay } from './SettingsDisplay/SettingsDisplay';
import { ChangeEvent, useCallback } from 'react';
import styles from './CounterWithSettings.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { RootStateType } from '../../redux/store';
import { counterAC, CounterStateType } from '../../redux/counter-reducer';
import { ButtonsPanel } from './CounterItem/ButtonsPanel/ButtonsPanel';
import { DisplayPanel } from './CounterItem/DisplayPanel/DisplayPanel';

type CounterWithSettingsPropsType = {
  oneDisplay?: boolean;
  initMaxValue: number;
  initStartValue: number;
};

export type setStartValueCallBackType = (
  e: ChangeEvent<HTMLInputElement>
) => void;

export type setMaxValueCallBackType = (
  e: ChangeEvent<HTMLInputElement>
) => void;

export const CounterWithSettings = React.memo(
  (props: CounterWithSettingsPropsType) => {
    console.log('render CounterWithSettings');

    const isOneDisplay = !!props.oneDisplay;

    const state = useSelector<RootStateType, CounterStateType>(
      (state) => state.counterReducer
    );
    const dispatch = useDispatch();

    const setStartValueCallBack: setStartValueCallBackType = useCallback(
      (e) => {
        dispatch(counterAC.setStartValue(+e.currentTarget.value));
      },
      [dispatch]
    );

    const setMaxValueCallBack: setMaxValueCallBackType = useCallback(
      (e) => {
        dispatch(counterAC.setMaxValue(+e.currentTarget.value));
      },
      [dispatch]
    );

    const incClickHandler = useCallback(() => {
      dispatch(counterAC.incrementCurrentValue());
    }, [dispatch]);

    const resetClickHandler = useCallback(() => {
      dispatch(counterAC.resetCurrentValue());
    }, [dispatch]);

    const setClickHandler = useCallback(() => {
      !state.hasErrors && dispatch(counterAC.setIsApplySettings(true));
    }, [dispatch, state.hasErrors]);

    const settingsClickHandler = useCallback(() => {
      dispatch(counterAC.setIsApplySettings(false));
    }, [dispatch]);

    return (
      <div
        className={`${styles.counterWithSettings}${
          isOneDisplay ? ' ' + styles.oneDisplay : ''
        }`}
      >
        {((isOneDisplay && state.isApplySettings) || !isOneDisplay) && (
          <CounterItem>
            <DisplayPanel>
              <CounterDisplay
                currentValue={state.currentValue}
                isLimitExceeded={state.isLimitExceeded}
                isApplySettings={state.isApplySettings}
                hasErrors={state.hasErrors}
              />
            </DisplayPanel>
            <ButtonsPanel>
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
            </ButtonsPanel>
          </CounterItem>
        )}

        {((isOneDisplay && !state.isApplySettings) || !isOneDisplay) && (
          <CounterItem>
            <DisplayPanel>
              <SettingsDisplay
                startValue={state.startValue}
                maxValue={state.maxValue}
                setStartValueCallBack={setStartValueCallBack}
                setMaxValueCallBack={setMaxValueCallBack}
                isStartValueError={state.isStartValueError}
                isMaxValueError={state.isMaxValueError}
              />
            </DisplayPanel>
            <ButtonsPanel>
              <Button
                disabled={state.isApplySettings || state.hasErrors}
                onClick={setClickHandler}
              >
                set
              </Button>
            </ButtonsPanel>
          </CounterItem>
        )}
      </div>
    );
  }
);
