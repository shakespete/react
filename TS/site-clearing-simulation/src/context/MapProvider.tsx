
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
  currCol: -1,
  simInProgress: true
};

const MapContext = createContext<IState | any>(initialState);
export const useMap = () => useContext(MapContext);

function reducer(state: IState, action: IAction): IState {
  switch(action.type) {
    case 'GENERATE_MAP':
      const layout = action.payload;
      const rows = layout.length;
      const cols = layout[0]?.length;
      
      const visitedMatrix = Array(rows);
      for (let i = 0; i < rows; ++i) {
        visitedMatrix[i] = Array(cols).fill(0);
      }

      return {
        ...state,
        mapSite: action.payload,
        visited: visitedMatrix,
        totalRows: rows,
        totalCols: cols
      }
    case 'ADVANCE': {
      return {
        ...state,
        currRow: action.payload.row,
        currCol: action.payload.col,
        commList: [...state.commList, action.payload.command],
        visited: action.payload.visited
      }
    }
    case 'CHANGE_DIR': {
      return {
        ...state,
        commList: [...state.commList, action.payload.command],
        currentDirection: action.payload.direction
      }
    }
    case 'END_SIMULATION': {
      return {
        ...state,
        simInProgress: false
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
