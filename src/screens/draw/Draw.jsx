import React from "react";
import { Stage, Layer } from "react-konva";
import PolygonConstructor1 from "../../components/konva/PolygonConstructor2.0";
import { PolygonConstructor } from "../../components/konva/PolygonConstructor";

export const Draw = () => {
  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        {/* <PolygonConstructor1
          // construct only line, not polygon
          lineOnly={true}
          scale={1}
          onComplete={(points) => {
            console.log("*** POLYGON POINTS *****", points);
          }}
        /> */}
        <PolygonConstructor />
      </Layer>
    </Stage>
  );
};
{
  /* <PolygonConstructor1
          // construct only line, not polygon
          lineOnly={true}
          scale={1}
          onComplete={(points) => {
            console.log("*** POLYGON POINTS *****", points);
          }}
        /> */
}
