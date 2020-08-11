import { IState, IAction } from '../interfaces';

/**
 * Action Creators
 */

export const advance = (store: IState, steps: number): IAction => {
  let siteVis = JSON.parse(JSON.stringify(store.visited));
  let siteMap = store.mapSite;

  const dir = store.currentDirection;
  const totalSteps = steps;

  let cRow = store.currRow;
  let cCol = store.currCol;
  let fuelCost = 0;
  let paintDmg = 0;

  if (dir === 'E' || dir === 'W') {
    while (steps) {
      dir === 'E' ? cCol++ : cCol--;

      const landType = siteMap[cRow][cCol];
      const landVis = siteVis[cRow][cCol];
      console.log(landType);
      switch (landType) {
        case 'o':
          fuelCost += 1;
          break;
        case 'r':
          landVis === 1 ? fuelCost += 1 : fuelCost += 2;
          break;
        case 't':
          if (landVis === 1) {
            fuelCost += 1;
          } else {
            fuelCost += 2;
            if (steps > 1) paintDmg += 1;
          }
          break;
        case 'T':
          return {
            type: 'END_SIMULATION',
            payload: 'Destruction of Protected Tree'
          };
        default:
          break;
      }

      siteVis[cRow][cCol] = 1;
      steps--;
    }
  } else {
    while (steps) {
      dir === 'N' ? cRow-- : cRow++;

      const landType = siteMap[cRow][cCol];
      const landVis = siteVis[cRow][cCol];
      console.log(landType);
      switch (landType) {
        case 'o':
          fuelCost += 1;
          break;
        case 'r':
          landVis === 1 ? fuelCost += 1 : fuelCost += 2;
          break;
        case 't':
          if (landVis === 1) {
            fuelCost += 1;
          } else {
            fuelCost += 2;
            if (steps > 1) paintDmg += 1;
          }
          break;
        case 'T':
          return {
            type: 'END_SIMULATION',
            payload: 'Destruction of Protected Tree'
          };
        default:
          break;
      }

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
      visited: siteVis,
      fuel: fuelCost,
      paint: paintDmg
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