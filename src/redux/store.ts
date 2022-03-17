import { counterReducer } from './counter-reducer';
import { combineReducers, createStore } from 'redux';
import {
  getStateFromLocalStorage,
  setStateToLocalStorage,
} from '../utils/localStorage';

export type RootStateType = ReturnType<typeof rootReducer>;

const rootReducer = combineReducers({ counterReducer });

export const store = createStore(
  rootReducer,
  getStateFromLocalStorage('state')
);

store.subscribe(() => {
  setStateToLocalStorage('state', store.getState());
});
