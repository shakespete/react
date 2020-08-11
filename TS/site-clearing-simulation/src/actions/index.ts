import { IState, IAction } from '../interfaces';

/**
 * Action Creators
 */

export const advance = (store: IState, steps: number): IAction => {
  let siteVis = JSON.parse(JSON.stringify(store.visited));

  const dir = store.currentDirection;
  let cRow = store.currRow;
  let cCol = store.currCol;
  const totalSteps = steps;

  if (dir === 'E' || dir === 'W') {
    while (steps) {
      dir === 'E' ? cCol++ : cCol--;
      siteVis[cRow][cCol] = 1;
      steps--;
    }
  } else {
    while (steps) {
      dir === 'N' ? cRow-- : cRow++;
      siteVis[cRow][cCol] = 1;
      steps--;
    }
  }

  return {
    type: 'ADVANCE',
    payload: {
      row: cRow,
      col: cCol,
      command: `a ${totalSteps}`,
      visited: siteVis
    }
  };
}

export const changeDir = (store: IState, comm: string): IAction => {
  let dirObj = {
    command: comm,
    direction: ''
  };

  switch (store.currentDirection) {
    case 'N':
      dirObj.direction = comm === 'l' ? 'W' : 'E';
      break;
    case 'S':
      dirObj.direction = comm === 'l' ? 'E' : 'W';
      break;
    case 'E':
      dirObj.direction = comm === 'l' ? 'N' : 'S';
      break;
    case 'W':
      dirObj.direction = comm === 'l' ? 'S' : 'N';
      break;
    default:
      break;
  }
  
  return {
    type: 'CHANGE_DIR',
    payload: dirObj
  };
}

export const endSimulation = (message: string): IAction => {
  return {
    type: 'END_SIMULATION',
    payload: message
  };
}