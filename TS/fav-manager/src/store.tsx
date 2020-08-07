import React, { createContext, useReducer } from 'react';
import { IState, IAction, IEpisode } from './interfaces';

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
    case 'ADD_FAV':
      return {
        ...state,
        favourites: [...state.favourites, action.payload]
      };
    case 'REM_FAV':
      return {
        ...state,
        favourites: state.favourites.filter((ep: IEpisode) => ep.id !== action.payload.id)
      }
    default:
      return state;
  }
}

export function StoreProvider ({ children }: JSX.ElementChildrenAttribute): JSX.Element {
  const [state, dispatch] = useReducer(reducer, initialState);

  return <Store.Provider value={{ state, dispatch }}>{children}</Store.Provider>
}
