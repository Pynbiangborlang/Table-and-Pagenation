import React from "react";
// import { PolygonConstructor } from "../../components/lib/PolygonConstructor";
import Draw from "../../components/lib/pynbiang_Polygon_constructor";

export const Drawing = () => {
  return (
    <Draw polygons={null} isMultiple={true} />
    // <PolygonConstructor
    //   width={window.innerWidth}
    //   height={window.innerHeight}
    //   polygons={[]}
    // />
  );
};
