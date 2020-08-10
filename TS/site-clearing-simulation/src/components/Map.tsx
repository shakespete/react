import React, { useEffect, useRef } from 'react';
import { MapProps } from '../interfaces';

export default function Map({ layout, width, height}: MapProps): JSX.Element {
  // const mapLayout = layout.map((row: string) => row.split(''));
  const rows = layout.length;
  const cols = layout[0]?.length;
  const len = 30;
  const pad = 35;

  console.log(layout);
  console.log(rows, cols);

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
