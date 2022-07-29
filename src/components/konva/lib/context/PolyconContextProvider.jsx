import React, { createContext, useContext, useState } from "react";

const PolyconContext = createContext();
const PolygonEditor = createContext();
const PolygonSetter = createContext();

//provides values of polygons
export const usePolygon = () => {
  return useContext(PolyconContext);
};

//provides a function to edit a polygon
export const usePolygonEditor = () => {
  return useContext(PolygonEditor);
};

//provides a function to set polygon
export const usePolygonSetter = () => {
  return useContext(PolygonSetter);
};

export const PolyconContextProvider = ({ children }) => {
  function editPolygon(newPolygon, oldPolygons) {
    let newPolygons = oldPolygons;
    newPolygons.forEach((polygon, i) => {
      if (polygon.id === newPolygon.id) {
        let newPoints = polygon.points;
        newPoints.forEach((point, i) => {
          if (point.id === newPolygon.point.id) {
            console.log("oldpoints", point);
            newPoints[i] = {
              id: point.id,
              x: newPolygon.point.x,
              y: newPolygon.point.y,
            };
            console.log("newpoints", newPoints[i]);
          }
        });

        newPolygons[i] = { id: polygon.id, points: newPoints };
      }
    });
    console.log(newPolygons);
    return newPolygons;
  }
  return (
    // <PolyconContext.Provider value={polygons}>
    <PolygonEditor.Provider value={editPolygon}>
      {/* <PolygonSetter.Provider value={setPolygon}> */}
      {children}
      {/* </PolygonSetter.Provider> */}
    </PolygonEditor.Provider>
    // </PolyconContext.Provider>
  );
};
