import React, { useState } from 'react';
import { advance, changeDir, endSimulation } from '../actions';
import { IAction } from '../interfaces';
import { useMap } from '../context/MapProvider';

export default function VirtualControls(): JSX.Element {
  const { state, dispatch } = useMap();
  const [blocks, setBlocks] = useState(1);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBlocks(parseInt(e.target.value));
  }

  const advanceHandler = () => {
    if (blocks > 0) return dispatch(advance(state, blocks));
  }

  const turnHandler = (dir: string): IAction => {
    return dispatch(changeDir(state, dir));
  }

  const quitHandler = (): IAction => {
    return dispatch(endSimulation('Simulation Ended by User'));
  }

  return (
    <div className="virtualBtContainer">
      <div className="ctrlRow">
        <button className="virtualBt" onClick={advanceHandler}>A</button>
        <input type="number" className="ctrlInput" value={blocks} onChange={onChangeHandler} />
      </div>
      <div className="ctrlRow">
        <button className="virtualBt" onClick={() => turnHandler('l')}>L</button>
        <button className="virtualBt" onClick={() => turnHandler('r')}>R</button>
      </div>
      <div>
        <button className="quitBt" onClick={quitHandler}>QUIT</button>
      </div>
    </div>
  )
}
