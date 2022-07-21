import React, { useRef, useState } from "react";
import { Line } from "react-konva";

const Triangle = ({ x, y, scale, fill, onClick, ...props }) => {
  const points = [0, 86.6, 100, 86.6, 50, 0];
  const ref = useRef(null);
  return (
    <Line
      ref={ref}
      closed
      x={x}
      y={y}
      scaleX={scale}
      scaleY={scale}
      draggable
      points={points}
      stroke="black"
      tension={0}
      fill={fill}
      onClick={(e) => {
        onClick(e.target);
      }}
    />
  );
};

export default Triangle;
