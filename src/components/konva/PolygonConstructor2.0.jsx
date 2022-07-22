import React, { useState } from "react";
import { Circle, Rect, Line } from "react-konva";

function Anchor(props) {
  const [strokeWidth, setStrokeWidth] = useState(2);

  return (
    <Circle
      x={props.point.x}
      y={props.point.y}
      radius={10}
      stroke="#666"
      fill={props.fill}
      strokeWidth={strokeWidth}
      onMouseOver={() => {
        document.body.style.cursor = "pointer";
        setStrokeWidth(3);
        props.onMouseOver();
      }}
      onMouseOut={() => {
        document.body.style.cursor = "default";
        setStrokeWidth(2);
        props.onMouseOut();
      }}
      onClick={() => {
        document.body.style.cursor = "default";
        props.onClick();
      }}
    />
  );
}

function PolygonOriginAnchor(props) {
  const isValid = props.validateMouseEvents();
  const [fill, setFill] = useState("transparent");

  return (
    <Anchor
      point={props.point}
      fill={fill}
      onClick={() => {
        if (isValid) {
          props.onValidClick();
        }
      }}
      onMouseOver={() => {
        if (isValid) {
          document.body.style.cursor = "pointer";
          setFill("green");
          props.onValidMouseOver();
        } else {
          document.body.style.cursor = "not-allowed";
          setFill("red");
        }
      }}
      onMouseOut={() => {
        setFill("transparent");
      }}
    />
  );
}

function PolygonConstructor(props) {
  const [points, setPoints] = useState(props.points || []);
  const [nextPoint, setNextPoint] = useState({ x: 0, y: 0 });
  const [isComplete, setIsComplete] = useState(props.isComplete || false);
  const { scale } = props;

  const handleClick = ({ x, y }) => {
    if (props.lineOnly) {
      console.log("*** LINE POINTS *****", JSON.stringify(points));
    }
    setPoints(points.concat({ x, y }));
  };

  return (
    <>
      <Line
        strokeWidth={2}
        stroke="red"
        opacity={1}
        lineJoin="round"
        closed={isComplete}
        points={points
          .flatMap((point) => [point.x, point.y])
          .concat([nextPoint.x, nextPoint.y])}
      />

      <Rect
        x={0}
        y={0}
        width={window.innerWidth / scale}
        height={window.innerHeight / scale}
        onClick={(event) => {
          if (!isComplete) {
            const x = event.evt.offsetX / scale;
            const y = event.evt.offsetY / scale;
            handleClick({ x, y });
          }
        }}
        onMouseMove={(event) => {
          if (!isComplete) {
            console.log("ON MOUSE MOVE", event.evt.offsetX, event.evt.offsetY);
            const x = event.evt.offsetX / scale;
            const y = event.evt.offsetY / scale;
            setNextPoint({ x, y });
          }
        }}
      />

      {points[0] && !isComplete && (
        <PolygonOriginAnchor
          point={points[0]}
          onValidClick={() => {
            // props.onComplete(points);
            setNextPoint(points[0]);
            setIsComplete(true);
            console.log("*** POLYGON POINTS *****", JSON.stringify(points));
          }}
          onValidMouseOver={() => {
            setNextPoint(points[0]);
          }}
          validateMouseEvents={() => {
            console.log("polygon click");
            return points.length > 2;
          }}
        />
      )}
    </>
  );
}

export default PolygonConstructor;
