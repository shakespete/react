import React, { createContext, useReducer } from 'react';
import { IState, IAction } from './interfaces';

const initialState: IState = {
  episodes: [],
  favourites: [],
};
export const Store = createContext<IState | any>(initialState);

function reducer(state: IState, action: IAction): IState {
  switch (action.type) {
    case 'FETCH_DATA':
      return {
        ...state,
        episodes: action.payload
      };
    default:
      return state;
  }
}

export function StoreProvider ({ children }: any): JSX.Element {
  const [state, dispatch] = useReducer(reducer, initialState);

  return <Store.Provider value={{ state, dispatch }}>{children}</Store.Provider>
}
