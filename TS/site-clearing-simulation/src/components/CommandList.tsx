import React from 'react';
import { useMap } from '../context/MapProvider';

export default function CommandList(): JSX.Element {
  const { state } = useMap();
  return (
    <table>
      <thead>
        <tr><th>Commands Executed</th></tr>
      </thead>
      <tbody>
        {state.commList.map((comm: string, idx: number) => {
          return <tr key={idx}><td>{comm}</td></tr>
        })}
      </tbody>
    </table>
  )
}
