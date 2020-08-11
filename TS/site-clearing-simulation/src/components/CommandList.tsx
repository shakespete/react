import React from 'react';
import { useMap } from '../context/MapProvider';

export default function CommandList(): JSX.Element {
  const { state } = useMap();
  return (
    <table className="commList">
      <thead>
        <tr><th>Issued Commands</th></tr>
      </thead>
      <tbody>
        {state.commList.map((comm: string, idx: number) => {
          return <tr key={idx}><td>{idx + 1}: {comm}</td></tr>
        })}
      </tbody>
    </table>
  )
}
