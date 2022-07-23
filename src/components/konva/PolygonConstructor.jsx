import React, { useRef, useState, useEffect } from "react";
import { Circle, Layer, Line, Rect, Stage } from "react-konva";

export const PolygonConstructor = () => {
  const [isDrawing, setIsDrawing] = useState(false);
  const [nextPoint, setnextPoint] = useState([]);
  const [points, setPoints] = useState([]);
  const [circle, setCircle] = useState({ x: 0, y: 0, radius: 0 });
  const [mouseDrag, setMouseDrag] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const circleRef = useRef(null);

  const handleClick = (e) => {
    if (!isComplete) {
      console.log(e);
      let pos = e.evt;
      console.log("nga dei u click function");
      if (!isDrawing) {
        setIsComplete(false);
        setIsDrawing(true);
        setCircle({ x: pos.offsetX, y: pos.offsetY, radius: 10 });
        setPoints([pos.offsetX, pos.offsetY]);
        return;
      }

      console.log(points);

      setPoints([...points, pos.offsetX, pos.offsetY]);
      setMouseDrag(false);
    }
  };

  //when mouse drags show line
  const handleMove = (e) => {
    if (!isDrawing) {
      return;
    }

    setMouseDrag(true);
    let pos = e.evt;

    setnextPoint([
      points[points.length - 2],
      points[points.length - 1],
      pos.offsetX,
      pos.offsetY,
    ]);
  };

  // when circle click closed the line
  const handleClose = (e) => {
    setPoints([...points, e.target.attrs.x, e.target.attrs.y]);
    setIsDrawing(false);
    setMouseDrag(false);
    setIsComplete(true);
    console.log("******** Polygon Points**********\n");
    console.log(JSON.stringify(points));
  };
  return (
    <>
      <Rect
        x={0}
        y={0}
        width={window.innerWidth}
        height={window.innerHeight}
        onClick={handleClick}
        onMouseMove={handleMove}
      />
      <Line
        opacity={1}
        points={points}
        stroke="#df4b26"
        strokeWidth={2}
        tension={0}
        lineCap="round"
        lineJoin="round"
        closed={isComplete}
      />

      {points[0] && !isComplete && (
        <Circle
          ref={circleRef}
          x={circle.x}
          y={circle.y}
          radius={circle.radius}
          stroke="black"
          onClick={handleClose}
          onMouseOver={(e) => e.target.setFill("green")}
          onMouseOut={(e) => e.target.setFill("transparent")}
        />
      )}

      {mouseDrag && (
        <Line
          points={nextPoint}
          fill="red"
          stroke="#df4b26"
          strokeWidth={2}
          tension={0}
          lineCap="round"
          lineJoin="round"
        />
      )}
    </>
  );
};
