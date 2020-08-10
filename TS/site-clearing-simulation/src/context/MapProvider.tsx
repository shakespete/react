
import React, { createContext, useContext, useReducer } from 'react';
import { IState, IAction } from '../interfaces';

const initialState = {
  currentDirection: 'E',
  mapSite: [],
  visited: [],
  commList: [],
  commCount: 0,
  fuelUsage: 0,
  paintDmg: 0,
  totalRows: 0,
  totalCols: 0,
  currRow: 0,
  currCol: -1
};

const MapContext = createContext<IState | any>(initialState);
export const useMap = () => useContext(MapContext);

function reducer(state: IState, action: IAction): IState {
  switch(action.type) {
    case 'GENERATE_MAP':
      const layout = action.payload;
      const rows = layout.length;
      const cols = layout[0]?.length;

      return {
        ...state,
        mapSite: action.payload,
        totalRows: rows,
        totalCols: cols
      }
    case 'MOVE_FORWARD': {
      return {
        ...state,
        commList: [...state.commList, action.payload]
      }
    }
    case 'CHANGE_DIR': {
      return {
        ...state,
        commList: [...state.commList, action.payload.command],
        currentDirection: action.payload.direction
      }
    }
    default:
      return state;
  }
}

export function MapProvider({ children }: JSX.ElementChildrenAttribute): JSX.Element {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <MapContext.Provider value={{ state, dispatch }}>
      {children}
    </MapContext.Provider>
  )
}
