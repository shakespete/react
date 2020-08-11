import React from 'react';
import { useMap } from '../context/MapProvider';

export default function SiteReport(): JSX.Element {
  const { state } = useMap();

  return (
    <table className="siteReport">
      <thead>
        <tr>
          <th>Item</th>
          <th>Quantity</th>
          <th>Cost</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Communication Overhead</td>
          <td>{state.commList.length}</td>
          <td>{state.commList.length}</td>
        </tr>
        <tr>
          <td>Fuel Usage</td>
          <td>{state.fuelUsage}</td>
          <td>{state.fuelUsage}</td>
        </tr>
        <tr>
          <td>Uncleared Squares</td>
          <td>{state.unclearedSquares}</td>
          <td>{state.unclearedSquares * 3}</td>
        </tr>
        <tr>
          <td>Destruction of Protected Tree</td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>Paint Damage to Bulldozer</td>
          <td>{state.paintDmg}</td>
          <td>{state.paintDmg * 2}</td>
        </tr>
      </tbody>
    </table>
  )
}
