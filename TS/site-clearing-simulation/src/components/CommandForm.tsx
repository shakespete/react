import React, { useState } from 'react';
import { useMap } from '../context/MapProvider';

export default function CommandForm(): JSX.Element {
  const [command, setCommand] = useState('');
  const { state, dispatch } = useMap();

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCommand(e.target.value);
  }

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const commArray = command.split(' ');
    if (commArray.length) {
      const comm = commArray[0];

      if (comm === 'a') {
        if (state.currRow === 0 && state.currCol === -1 && (state.currentDirection !== 'E')) {
          setCommand('');
          return dispatch({
            type: 'END_SIMULATION',
            payload: 'Simulation Ended'
          });
        }

        let siteVis = JSON.parse(JSON.stringify(state.visited));
        let steps: number = parseInt(commArray[1]);

        const dir = state.currentDirection;
        let cRow = state.currRow;
        let cCol = state.currCol;

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

        setCommand('');
        return dispatch({
          type: 'MOVE_FORWARD',
          payload: {
            row: cRow,
            col: cCol,
            command: `${comm} ${commArray[1]}`,
            visited: siteVis
          }
        });
      } else if (comm === 'q') {
        setCommand('');
        return dispatch({
          type: 'END_SIMULATION',
          payload: 'Simulation Ended'
        });
      } else {
        let dirObj = {
          command: comm,
          direction: ''
        };

        switch (state.currentDirection) {
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
        
        setCommand('');
        return dispatch({
          type: 'CHANGE_DIR',
          payload: dirObj
        });
      }
    }
  };

  console.log(state);

  return (
    <form onSubmit={submit}>
      <input type="text" onChange={onChangeHandler} value={command} />
    </form>
  );
}
