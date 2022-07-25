import React, { useRef, useState, useEffect } from "react";
import { Circle, Line, Rect } from "react-konva";

export const PolygonConstructor = () => {
  const [nextPoint, setnextPoint] = useState([0, 0]);
  const [points, setPoints] = useState([]);
  const [isComplete, setIsComplete] = useState(false);
  const circleRef = useRef(null);

  const handleClick = (e) => {
    if (!isComplete) {
      console.log(e);
      let pos = e.evt;
      console.log("nga dei u click function");
      console.log(JSON.stringify(nextPoint));
      setPoints(points.concat([e.evt.offsetX, e.evt.offsetY]));
      console.log(points);
    }
  };

  //when mouse drags show line
  const handleMove = (e) => {
    if (isComplete) {
      return;
    }
    let pos = e.evt;
    setnextPoint([pos.offsetX, pos.offsetY]);
  };

  // when circle click closed the line
  const handleClose = (e) => {
    setnextPoint([]);
    setPoints(points.concat([e.target.attrs.x, e.target.attrs.y]));
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
        points={points.concat(nextPoint)}
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
          x={points[0]}
          y={points[1]}
          radius={10}
          stroke="black"
          onClick={handleClose}
          onMouseOver={(e) => e.target.setFill("green")}
          onMouseOut={(e) => e.target.setFill("transparent")}
        />
      )}

      {/* {mouseDrag && (
        <Line
          points={nextPoint}
          fill="red"
          stroke="#df4b26"
          strokeWidth={2}
          tension={0}
          lineCap="round"
          lineJoin="round"
        />
      )} */}
    </>
  );
};
