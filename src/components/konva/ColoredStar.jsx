import React from "react";
import { Star } from "react-konva";
import Konva from "konva";

export const ColoredStar = ({ x, y, fill }) => {
  return (
    <Star
      x={x}
      y={y}
      numPoints={5}
      innerRadius={20}
      outerRadius={40}
      fill={fill}
      draggable
    />
  );
};
