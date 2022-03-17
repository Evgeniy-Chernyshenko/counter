import { RootStateType } from '../redux/store';

export const getStateFromLocalStorage = (key: string) => {
  try {
    const value = localStorage.getItem(key);

    if (!value) {
      return;
    }

    return JSON.parse(value);
  } catch {}
};

export const setStateToLocalStorage = (key: string, state: RootStateType) => {
  try {
    localStorage.setItem(key, JSON.stringify(state));
  } catch {}
};
