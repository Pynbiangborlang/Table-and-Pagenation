import React, { useRef, useState, useEffect } from "react";
import { Circle, Layer, Line, Stage } from "react-konva";

export const PolygonConstructor = () => {
  const [isDrawing, setIsDrawing] = useState(false);
  const [nextPoint, setnextPoint] = useState([]);
  const [points, setPoints] = useState([]);
  const [circle, setCircle] = useState({ x: 0, y: 0, radius: 0 });
  const [mouseDrag, setMouseDrag] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const circleRef = useRef(null);

  useEffect(() => {
    console.log("circle ref");
    console.log(circleRef.current);
  }, []);

  const handleClick = (e) => {
    let pos = e.target.getStage().getPointerPosition();
    if (!isDrawing) {
      setIsDrawing(true);
      setCircle({ x: pos.x, y: pos.y, radius: 10 });
      setPoints([pos.x, pos.y]);
      return;
    }
    let x = circleRef.current.attrs.x;
    let y = circleRef.current.attrs.y;
    let r = circleRef.current.attrs.r;

    console.log("outside close");
    console.log(points);

    setPoints([...points, pos.x, pos.y]);
    setMouseDrag(false);
  };

  //when mouse drags show line
  const handleMove = (e) => {
    if (!isDrawing) {
      return;
    }

    setMouseDrag(true);
    let pos = e.target.getStage().getPointerPosition();

    setnextPoint([
      points[points.length - 2],
      points[points.length - 1],
      pos.x,
      pos.y,
    ]);
  };

  // when circle click closed the line
  const handleClose = (e) => {
    setPoints([...points, e.target.attrs.x, e.target.attrs.y]);
    setIsDrawing(false);
    setMouseDrag(false);
    setIsComplete(true);
  };
  return (
    <Stage
      width={1000}
      height={1000}
      onClick={handleClick}
      onMouseMove={handleMove}
    >
      <Layer>
        <Line
          opacity={1}
          points={points}
          fill="red"
          stroke="#df4b26"
          strokeWidth={2}
          tension={0}
          lineCap="round"
          lineJoin="round"
          closed={isComplete}
        />

        {!isComplete && (
          <Circle
            ref={circleRef}
            x={circle.x}
            y={circle.y}
            radius={circle.radius}
            stroke="black"
            onClick={handleClose}
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
      </Layer>
    </Stage>
  );
};
