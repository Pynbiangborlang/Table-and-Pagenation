import React, { useEffect, useRef, useState } from "react";
import { Circle, Group, Line } from "react-konva";

const Anchors = ({ anchors, id, callBack, shouldUpdate }) => {
  const [lines, setLines] = useState(() => {
    let lines = [];
    for (let i = 0; i < anchors.length - 1; i++) {
      lines.push([anchors[i], anchors[i + 1]]);
    }
    return lines;
  });

  const [path, setPath] = useState({ first: [], middle: [], last: [] });
  const [shouldShowPath, setShowPath] = useState(false);
  const handleDrag = ({ id, x, y }) => {
    let newlines = lines;
    for (let i = 0; i < lines.length; i++) {
      if (id === 0) {
        newlines[0][0].x = x;
        newlines[0][0].y = y;
        newlines[newlines.length - 1][1].x = x;
        newlines[newlines.length - 1][1].y = y;
        break;
      }
      if (i === id) {
        newlines[i - 1][1].x = x;
        newlines[i - 1][1].y = y;
        newlines[i][0].x = x;
        newlines[i][0].y = y;
        break;
      }
    }

    setLines([...newlines]);
  };

  const showPath = (i, e) => {
    const newPath = path;
    if (i === 0) {
      newPath.first = [
        lines[lines.length - 1][0].x,
        lines[lines.length - 1][0].y,
      ];
      newPath.last = [lines[1][0].x, lines[1][0].y];
      newPath.middle = [e.target.attrs.x, e.target.attrs.y];
    } else {
      newPath.first = [lines[i - 1][0].x, lines[i - 1][0].y];
      newPath.last = [lines[i][1].x, lines[i][1].y];
      newPath.middle = [e.target.attrs.x, e.target.attrs.y];
    }
    return newPath;
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
            radius={5}
            stroke="blue"
            draggable
            // onMouseDown={(e) => setShowPath(true)}
            onDragStart={(e) => {
              console.log("anchor", e);
              setShowPath(true);
              setPath({ ...showPath(i, e) });
            }}
            onChange={(e)=>{
              console.log('mouseMove', e)
              setPath({ ...showPath(i, e) });
            }}
            onDragEnd={(e) => {
              console.log('end', e)
              setPath({ first: [], middle: [], last: [] });
              setShowPath(false);
              handleDrag({ id: i, x: e.target.attrs.x, y: e.target.attrs.y });
              let newPolygon = []
              for(let i=0;i<lines.length;i++){
                  newPolygon.push({id: anchors[i].id, x: lines[i][0].x, y: lines[i][0].y})
                   if(lines.length-i===1){
                      newPolygon.push({id: anchors[i+1].id, x: lines[0][0].x, y: lines[0][0].y})
                  } 
              }
               callBack(newPolygon)
            }}
          />
        );
      })}
      {lines.map((line, i) => (
        <Line
          key={i}
          points={line.flatMap((point) => [point.x, point.y])}
          stroke="blue"
          lineCap="round"
          lineJoin="round"
          strokeWidth={2}
          onClick={(e)=>{console.log('line click',e)}}
        />
      ))}
      {shouldShowPath && (
        <Line
          stroke="red"
          points={path.first.concat(path.middle).concat(path.last)}
          strokeWidth={2}
        />
      )}
    </Group>
  );
};
export const Polygon = ({ polygon, isSelected, isEditing, shouldUpdate, onChange, onSelect}) => {
  const shapeRef = useRef(null);

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
          shouldUpdate={shouldUpdate}
            isEditing={isEditing}
            anchors={polygon.points}
            id={polygon.id}
            callBack={(newPolygon) => onChange(newPolygon)}
          />
        )}
      </Group>
    </>
  );
};
