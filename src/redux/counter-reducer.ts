export type CounterStateType = {
  startValue: number;
  maxValue: number;
  currentValue: number;
  isApplySettings: boolean;
  isLimitExceeded: boolean;
  isStartValueError: boolean;
  isMaxValueError: boolean;
  hasErrors: boolean;
};

const initialState: CounterStateType = {
  startValue: 0,
  maxValue: 5,
  currentValue: 0,
  isApplySettings: true,
  isLimitExceeded: false,
  isStartValueError: false,
  isMaxValueError: false,
  hasErrors: false,
};

type ActionCreatorsType<T> = T extends { [key: string]: infer V } ? V : never;
type ActionType = ReturnType<ActionCreatorsType<typeof counterAC>>;

export const counterReducer = (
  state = initialState,
  action: ActionType
): CounterStateType => {
  switch (action.type) {
    case 'INCREMENT_CURRENT_VALUE': {
      if (state.isLimitExceeded) {
        return state;
      }

      const newCurrentValue = state.currentValue + 1;

      return newCurrentValue >= state.maxValue
        ? { ...state, isLimitExceeded: true }
        : { ...state, currentValue: newCurrentValue };
    }

    case 'RESET_CURRENT_VALUE': {
      return {
        ...state,
        currentValue: state.startValue,
        isLimitExceeded: false,
      };
    }

    case 'SET_IS_APPLY_SETTINGS': {
      return {
        ...state,
        ...action.payload,
        ...(action.payload.isApplySettings && {
          currentValue: state.startValue,
          isLimitExceeded: false,
        }),
      };
    }

    case 'SET_MAX_VALUE':
    case 'SET_START_VALUE': {
      const newState = { ...state, ...action.payload, isApplySettings: false };

      const isStartValueError =
        newState.startValue < 0 || newState.startValue >= newState.maxValue;
      const isMaxValueError =
        newState.maxValue <= 0 || newState.maxValue <= newState.startValue;
      const hasErrors = isStartValueError || isMaxValueError;

      return {
        ...newState,
        isStartValueError,
        isMaxValueError,
        hasErrors,
      };
    }

    default:
      return state;
  }
};

export const counterAC = {
  setStartValue: (value: number) =>
    ({
      type: 'SET_START_VALUE',
      payload: { startValue: value },
    } as const),
  setMaxValue: (value: number) =>
    ({
      type: 'SET_MAX_VALUE',
      payload: { maxValue: value },
    } as const),
  incrementCurrentValue: () =>
    ({
      type: 'INCREMENT_CURRENT_VALUE',
    } as const),
  resetCurrentValue: () =>
    ({
      type: 'RESET_CURRENT_VALUE',
    } as const),
  setIsApplySettings: (value: boolean) =>
    ({
      type: 'SET_IS_APPLY_SETTINGS',
      payload: { isApplySettings: value },
    } as const),
};
