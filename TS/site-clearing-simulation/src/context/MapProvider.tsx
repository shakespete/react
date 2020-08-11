
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
  unclearedSquares: 0,
  currRow: 0,
  currCol: -1,
  simInProgress: false,
  message: ''
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
        totalCols: cols,
        simInProgress: true
      }
    case 'ADVANCE': {
      return {
        ...state,
        currRow: action.payload.row,
        currCol: action.payload.col,
        commList: [...state.commList, action.payload.command],
        visited: action.payload.visited,
        fuelUsage: state.fuelUsage + action.payload.fuel,
        paintDmg: state.paintDmg + action.payload.paint
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
      let uncleared = 0;
      for (let i = 0; i < state.totalRows; ++i) {
        for (let j = 0; j < state.totalCols; ++j) {
          if (
            state.visited[i][j] === 0 &&
            state.mapSite[i][j] !== 'T'
          ) {
            uncleared++;
          }
        }
      }

      return {
        ...state,
        simInProgress: false,
        message: action.payload,
        unclearedSquares: uncleared
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
