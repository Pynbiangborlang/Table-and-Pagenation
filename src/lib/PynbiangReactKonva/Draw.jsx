import React, { useEffect, useState } from "react";
import { Stage, Layer } from "react-konva";
import { PolygonConstructor } from "./PolygonConstructor";

export const Draw = ({
  polygons,
  isMultiple,
  callBack,
  width = window.innerWidth,
  height = window.innerHeight,
  ...props
}) => {
  const [isEnable, setIsEnable] = useState(false);
  const [newPolygons, setPolygons] = useState(polygons || []);

  return (
    <>
      <div className="dr-tools-bar">
        <button onClick={() => setIsEnable(!isEnable)}>
          <span>{isEnable ? "Disable" : "Enable"}</span>
        </button>
      </div>
      <Stage width={width} height={height}>
        <Layer>
          <PolygonConstructor
            isEnable={isEnable}
            polygons={newPolygons}
            isMultiple={isMultiple}
            callBack={(polygons) => {
              debugger;
              isMultiple
                ? setPolygons([...newPolygons, polygons])
                : setPolygons([polygons]);
              console.log("update polygons", polygons);
              //callback
            }}
          />
        </Layer>
      </Stage>
    </>
  );
};
