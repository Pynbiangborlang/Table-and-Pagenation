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
  const [newPolygons, setPolygons] = useState(polygons || []);

  return (
    <>
      <PolygonConstructor
        width={width}
        height={height}
        imageURL="../../../assets/dog.png"
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
    </>
  );
};
