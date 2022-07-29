import React, { useEffect, useRef, useState } from "react";
import { Circle, Group, Line } from "react-konva";
import { usePolygonEditor } from "./lib/context/PolyconContextProvider";

const Anchors = ({ anchors, id, callBack }) => {
  const [lines, setLines] = useState(() => {
    let lines = [];
    for (let i = 0; i < anchors.length - 1; i++) {
      lines.push([anchors[i], anchors[i + 1]]);
    }
    return lines;
  });
  const handleDrag = ({ id, x, y }) => {
    let newlines = lines;
    for (let i = 0; i < lines.length; i++) {
      if (id === 0) {
        newlines[0][0].x = x;
        newlines[0][0].y = y;
        newlines[newlines.length - 1][1].x = x;
        newlines[newlines.length - 1][1].y = y;
      }
      if (i === id) {
        newlines[i][1].x = x;
        newlines[i][1].y = y;
        newlines[i + 1][0].x = x;
        newlines[i + 1][0].y = y;
      }
    }

    setLines(newlines);
  };
  return (
    <Group>
      {anchors.map((anchor, i) => {
        if (i === anchors.length - 1) {
          return;
        }
        return (
          <Circle
            key={anchor.id}
            x={anchor.x}
            y={anchor.y}
            radius={10}
            stroke="blue"
            draggable
            onDragStart={(e) => {
              console.log("anchor", e);
              handleDrag({ id: i, x: e.evt.offsetX, y: e.evt.offsetY });

              // callBack({
              //   id: id,
              //   point: { id: anchor.id, x: e.evt.offsetX, y: e.evt.offsetY },
              // });
            }}
          />
        );
      })}
      {lines.map((line, i) => (
        <Line
          points={line.flatMap((point) => [point.x, point.y])}
          stroke="blue"
          lineCap="round"
          lineJoin="round"
          strokeWidth={2}
        />
      ))}
    </Group>
  );
};
export const Polygon = ({ polygon, isSelected, onChange, onSelect }) => {
  // debugger;
  const shapeRef = useRef(null);
  // useEffect(() => {
  //   if (isSelected) {
  //     // we need to attach transformer manually
  //     trRef.current.nodes([shapeRef.current]);
  //     trRef.current.getLayer().batchDraw();
  //   }
  // }, [isSelected]);

  return (
    <>
      <Group draggable>
        {!isSelected && (
          <Line
            lineOnly={true}
            ref={shapeRef}
            key={polygon.id}
            onClick={() => {
              onSelect();
            }}
            onTap={onSelect}
            points={
              polygon.points
                ? polygon.points.flatMap((point) => [point.x, point.y])
                : []
            }
            opacity={1}
            stroke="#df4b26"
            strokeWidth={2}
            tension={0}
            lineCap="round"
            lineJoin="round"
            closed
          />
        )}
        {isSelected && (
          <Anchors
            anchors={polygon.points}
            id={polygon.id}
            callBack={(newpoint) => onChange(newpoint)}
          />
        )}
      </Group>
    </>
  );
};
