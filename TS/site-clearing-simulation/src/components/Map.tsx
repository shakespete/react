import React, { useEffect, useRef } from 'react';
import { IMapProps } from '../interfaces';
import { useMap } from '../context/MapProvider';

export default function Map({ width, height}: IMapProps): JSX.Element {
  const { state } = useMap();
  const layout = state.mapSite;
  const rows = state.totalRows;
  const cols = state.totalCols;

  const len = 30;
  const pad = 35;

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current && rows && cols) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');

      if (ctx) {
        for (let i = 0; i < rows; ++i) {
          for (let j = 0; j < cols; ++j) {
            ctx.strokeStyle = "green";
            ctx.strokeRect(j * pad + 10, i * pad + 10, len, len);
            ctx.font = '16px serif';
            ctx.fillText(layout[i][j], j * pad + 21, i * pad + 30);
          }
        }
      } 
    }       
  },[layout, rows, cols]);

  return <canvas ref={canvasRef} width={width} height={height} />;
}
