import React, { useRef, useState, useEffect } from "react";
import Konva from "konva";
import { Circle, Line, Rect} from "react-konva";

export const PolygonConstructor = ({ scale, callBack, isMultiple, isEditing }) => {
  let newScale = scale ? scale : 1;
  const [nextPoint, setnextPoint] = useState([0, 0]);
  const [points, setPoints] = useState([]);
  const [polygon, setPolygon] = useState();
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if(!polygon){
      return
    }
   
    callBack(polygon);
    setPoints([]);
    return()=>{

    }
  }, [polygon]);

  const listener = (e) => {
    if(e.key==="Escape"){
    setPoints((points) => {
      points.pop();
      points.pop();
      return points;
    });
    setnextPoint([]);
  }
  };
  
  const handleClick = (e) => {
    isMultiple?isEditing?()=>{return}:setIsComplete(false):()=>{return};
    if (!isComplete) {
      console.log(e);
      let pos = e.evt;
      setPoints([
        ...points,
        {
          id: Date.now(),
          x: pos.offsetX * newScale,
          y: pos.offsetY * newScale,
        },
      ]);
    }
  };

  //when mouse drags show line
  const handleMove = (e) => {
    if (isComplete) {
      return;
    }
    let pos = e.evt;
    setnextPoint([pos.offsetX * newScale, pos.offsetY * newScale]);
  };

  // when circle click closed the line
  const handleClose = (e) => {
    setPolygon({
      id: Date.now(),
      points: points.concat({
        id: Date.now(),
        x: e.target.attrs.x * newScale,
        y: e.target.attrs.y * newScale,
      }),
    });
    setPoints([]);
    setnextPoint([]);
    setIsComplete(true);
    console.log("******** Polygon Points**********\n");
    console.log(JSON.stringify(points));
  };

  useEffect(() => {
    document.addEventListener("keydown", listener);

    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, []);

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
        points={points.flatMap((point) => [point.x, point.y]).concat(nextPoint)}
        stroke="#df4b26"
        strokeWidth={2}
        tension={0}
        lineCap="round"
        lineJoin="round"
        closed={isComplete}
      />

      {points[0] && !isComplete && (
        <Circle
          x={points[0].x}
          y={points[0].y}
          radius={10}
          stroke="black"
          onClick={handleClose}
          onMouseOver={(e) => e.target.setFill("green")}
          onMouseOut={(e) => e.target.setFill("transparent")}
        />
      )}
    </>
  );
};
