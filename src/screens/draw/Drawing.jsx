import React, { useState } from "react";
import { Layer, Stage } from "react-konva";
import { PolygonConstructor } from "../../components/lib/pynbiang_Polygon_constructor";

export const Drawing = () => {
  const [polygons, setPolygons] = useState([]);
  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        <PolygonConstructor
          width={window.innerWidth}
          height={window.innerHeight}
          imageURL="https://www.kindpng.com/picc/m/252-2524695_dummy-profile-image-jpg-hd-png-download.png"
          polygons={polygons}
          isMultiple={false}
          setPolygons={(polygon) => {
            setPolygons([...polygon]);
            console.log("update polygons", polygons);
            //callback
          }}
        />
      </Layer>
    </Stage>
  );
};
