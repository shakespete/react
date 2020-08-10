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
        const steps = commArray[1];
        console.log(`Steps: ${steps}`);
        
        dispatch({
          type: 'MOVE_FORWARD',
          payload: command
        });

      } else if (comm === 'q') {
        console.log('Quit');
      } else {
        console.log(`Turn: ${comm}`);

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
        
        dispatch({
          type: 'CHANGE_DIR',
          payload: dirObj
        });
      }
      setCommand('');
    }
  };

  console.log(state);

  return (
    <form onSubmit={submit}>
      <input type="text" onChange={onChangeHandler} value={command} />
    </form>
  );
}
