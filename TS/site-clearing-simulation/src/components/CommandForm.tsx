import React, { useState } from 'react';
import { useMap } from '../context/MapProvider';
import { advance, changeDir, endSimulation } from '../actions';

export default function CommandForm(): JSX.Element {
  const [command, setCommand] = useState('');
  const { state, dispatch } = useMap();

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCommand(e.target.value);
  }

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const commArray = command.split(' ');
    if (commArray[0].length) {
      const comm = commArray[0];

      if (comm === 'a' && commArray[1]) {
        if (state.currRow === 0 && state.currCol === -1 && (state.currentDirection !== 'E')) {
          setCommand('');
          return dispatch(endSimulation('Invalid Command: Exceeds Site Bounds'));
        }
        let steps: number = parseInt(commArray[1]);
        setCommand('');
        dispatch(advance(state, steps));
      } else if (comm === 'l' || comm === 'r') {
        setCommand('');
        dispatch(changeDir(state, comm));
      } else if (comm === 'q') {
        setCommand('');
        dispatch(endSimulation('Simulation Ended by User'));
      } 
    }
  };

  return (
    <form onSubmit={submit}>
      <input type="text" className="commField" onChange={onChangeHandler} value={command} />
      <span className="currDir">Current Direction: <strong>{state.currentDirection}</strong></span>
    </form>
  );
}
