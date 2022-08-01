import React, { useEffect, useState } from "react";
import { Stage, Layer } from "react-konva";
import { Polygon } from "./Polygon";
import { PolygonConstructor } from "./PolygonConstructor";

export const Draw = ({ polygons, isMultiple, callBack, ...props }) => {
  const [shouldUpdate, setUpdate] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isEnable, setIsEnable] = useState(false);
  const [newPolygons, setPolygons] = useState(polygons ? polygons : []);
  const [selectedId, selectShape] = useState(null);

  useEffect(() => {
    // callBack(polygons)
    console.log("newPoints", newPolygons);
    setUpdate(false);
    setIsEditing(false);
    selectShape(null);
    return () => {};
  }, [shouldUpdate]);

  const updatePolygons = (newPolygon) => {
    let tempPolygons = newPolygons;
    newPolygons.forEach((polygon, i) => {
      if (polygon.id === newPolygon.id) {
        tempPolygons[i] = newPolygon;
        setPolygons(tempPolygons);
      }
    });
  };

  return (
    <>
      <div className="dr-tools-bar">
        <button onClick={() => setIsEnable(!isEnable)}>
          <span>{isEnable ? "Disable" : "Enable"}</span>
        </button>
        <button
          disabled={!isEditing}
          onClick={() => {
            setUpdate(true);
            setIsEditing(isEditing ? false : true);
          }}
        >
          <span>Save</span>
        </button>
      </div>
      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer>
          {isEnable && !isEditing && (
            <PolygonConstructor
              scale={1}
              isMultiple={isMultiple}
              isEditing={isEditing}
              callBack={(polygon) => {
                isMultiple
                  ? setPolygons([...newPolygons, polygon])
                  : setPolygons([polygon]);
              }}
            />
          )}
          {isMultiple
            ? newPolygons[0] &&
              newPolygons.map((polygon, i) => (
                <Polygon
                  key={i}
                  isSelected={polygon.id === selectedId}
                  isEditing={isEditing}
                  polygon={polygon}
                  onSelect={() => {
                    setIsEditing(true);
                    selectShape(polygon.id);
                  }}
                  onChange={(newPolygon) => {
                    updatePolygons(newPolygon);
                  }}
                />
              ))
            : newPolygons[0] && (
                <Polygon
                  isSelected={polygons[0].id === selectedId}
                  polygon={polygons[0]}
                  onSelect={() => {
                    setIsEditing(true);
                    selectShape(polygons[0].id);
                  }}
                  onChange={(newPolygon) => {
                    setPolygons(newPolygon);
                  }}
                />
              )}
        </Layer>
      </Stage>
    </>
  );
};
