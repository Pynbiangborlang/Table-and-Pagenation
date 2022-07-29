import React, { useEffect, useState } from "react";
import { Stage, Layer } from "react-konva";
import { Polygon } from "../../components/konva/Polygon";
// import PolygonConstructor1 from "../../components/konva/PolygonConstructor2.0";
import { PolygonConstructor } from "../../components/konva/PolygonConstructor";
import {
  usePolygon,
  usePolygonEditor,
  usePolygonSetter,
} from "../../components/konva/lib/context/PolyconContextProvider";

export const Draw = () => {
  const [polygons, setPolygons] = useState([]);
  const [selectedId, selectShape] = useState(null);
  const [isUpdate, setIsupdate] = useState(false);
  const editPolygon = usePolygonEditor();
  console.log("polygons", polygons);

  useEffect(() => {
    setIsupdate(true);
  }, [polygons]);

  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        <PolygonConstructor
          scale={1}
          callBack={(polygon) => {
            setPolygons([...polygons, polygon]);
            setIsupdate(true);
          }}
        />
        {polygons[1] &&
          polygons.map((polygon, i) => (
            <Polygon
              key={i}
              isSelected={polygon.id === selectedId}
              polygon={polygon}
              onSelect={() => {
                selectShape(polygon.id);
              }}
              onChange={(newPoint) => {
                setPolygons(editPolygon(newPoint, polygons));
              }}
            />
          ))}
      </Layer>
    </Stage>
  );
};
