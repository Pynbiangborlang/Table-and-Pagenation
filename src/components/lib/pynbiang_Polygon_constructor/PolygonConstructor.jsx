import React, { useRef, useState, useEffect } from "react";
import Konva from "konva";
import { Circle, Line, Rect, Group, Stage, Layer, Image } from "react-konva";

const Anchors = ({ polygon, id, callBack }) => {
  let anchors = polygon.points;
  const [lines, setLines] = useState(() => {
    let lines = [];
    for (let i = 0; i < anchors.length - 1; i++) {
      lines.push([anchors[i], anchors[i + 1]]);
    }
    return lines;
  });

  const [path, setPath] = useState([]);
  const [isDrag, setIsDrag] = useState(false);
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
    let newPath = [];
    if (i === 0) {
      newPath = [
        lines[lines.length - 1][0].x,
        lines[lines.length - 1][0].y,
        e.target.attrs.x,
        e.target.attrs.y,
        lines[1][0].x,
        lines[1][0].y,
      ];
    } else {
      newPath = [
        lines[i - 1][0].x,
        lines[i - 1][0].y,
        e.target.attrs.x,
        e.target.attrs.y,
        lines[i][1].x,
        lines[i][1].y,
      ];
    }
    setPath(newPath);
  };

  return (
    <Group>
      {polygon.points.map((anchor, i) => {
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
            onDragStart={(e) => {
              setIsDrag(true);
              showPath(i, e);
            }}
            onDragMove={(e) => {
              handleDrag({ id: i, x: e.target.attrs.x, y: e.target.attrs.y });
              let newAnchors = [];
              for (let i = 0; i < lines.length; i++) {
                newAnchors.push({
                  id: anchors[i].id,
                  x: lines[i][0].x,
                  y: lines[i][0].y,
                });
                if (lines.length - i === 1) {
                  newAnchors.push({
                    id: anchors[i + 1].id,
                    x: lines[0][0].x,
                    y: lines[0][0].y,
                  });
                }
              }
              showPath(i, e);
              callBack({
                id: id,
                x: polygon.x,
                y: polygon.y,
                points: newAnchors,
              });
            }}
            onDragEnd={(e) => {
              setPath([]);
              setIsDrag(false);
              handleDrag({ id: i, x: e.target.attrs.x, y: e.target.attrs.y });
              let newAnchors = [];
              for (let i = 0; i < lines.length; i++) {
                newAnchors.push({
                  id: anchors[i].id,
                  x: lines[i][0].x,
                  y: lines[i][0].y,
                });
                if (lines.length - i === 1) {
                  newAnchors.push({
                    id: anchors[i + 1].id,
                    x: lines[0][0].x,
                    y: lines[0][0].y,
                  });
                }
              }
              callBack({
                id: id,
                x: polygon.x,
                y: polygon.y,
                points: newAnchors,
              });
            }}
          />
        );
      })}
      {isDrag && <Line stroke="blue" points={path} strokeWidth={2} />}
    </Group>
  );
};
export const Polygon = ({ polygon, isSelected, onChange, onSelect }) => {
  const shapeRef = useRef(null);
  const [start, setStart] = useState(
    polygon.x && polygon.y ? { x: polygon.x, y: polygon.y } : {}
  );

  return (
    <>
      <Group
        x={start.x?.x}
        y={start.x?.y}
        draggable
        onDragMove={(e) => {
          setStart({
            x: e.target.attrs.x,
            y: e.target.attrs.y,
          });
        }}
        onDragEnd={(e) => {
          setStart({ x: e.target.attrs.x, y: e.target.attrs.y });
          onChange({ ...polygon, x: e.target.attrs.x, y: e.target.attrs.y });
        }}
      >
        <Line
          lineOnly={true}
          ref={shapeRef}
          key={polygon.id}
          points={
            polygon.points
              ? polygon.points.flatMap((point) => [point.x, point.y])
              : []
          }
          opacity={1}
          fill={isSelected ? "transparent" : "red"}
          stroke="#df4b26"
          strokeWidth={2}
          tension={0}
          lineCap="round"
          lineJoin="round"
          closed
          onClick={() => (isSelected ? onSelect(null) : onSelect(polygon.id))}
          onTap={() => (isSelected ? onSelect(null) : onSelect(polygon.id))}
        />
        {isSelected && (
          <Anchors
            polygon={polygon}
            id={polygon.id}
            callBack={(newPolygon) => onChange(newPolygon)}
          />
        )}
      </Group>
    </>
  );
};

export const PolygonConstructor = ({
  width,
  height,
  polygons,
  scale,
  setPolygons,
  isMultiple = true,
  ...props
}) => {
  let newScale = scale ? scale : 1;
  const [history, setHistory] = useState({
    points: [],
    lastPosition: {},
  });
  const [isEnable, setIsEnable] = useState(false);
  const [isUpdated, setIsUpdate] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [newPolygons, setNewPolygons] = useState(polygons ? polygons : []);
  const [selectedId, selectShape] = useState(null);
  const [nextPoint, setnextPoint] = useState([]);
  const [points, setPoints] = useState([]);
  const [isComplete, setIsComplete] = useState(false);

  const onSave = () => {
    selectShape(null);
    setIsEditing(false);
    setPolygons(newPolygons);
    setIsUpdate(true);
  };

  const onCreatePoint = (e) => {
    isMultiple
      ? () => {}
      : isComplete && newPolygons[0]
      ? () => {
          return;
        }
      : () => {};

    let pos = e.evt;
    setPoints([
      ...points,
      {
        id: Date.now(),
        x: pos.offsetX * newScale,
        y: pos.offsetY * newScale,
      },
    ]);
  };

  const predictNextPoint = (e) => {
    if (isComplete) {
      setHistory({
        ...history,
        lastPosition: { x: e.evt.offsetX, y: e.evt.offsetY },
      });
      return;
    }
    let pos = e.evt;
    setnextPoint([pos.offsetX * newScale, pos.offsetY * newScale]);
  };

  const onCompleteShape = (e) => {
    setIsUpdate(false);
    // setIsComplete(true);
    setIsEditing(false);
    isMultiple
      ? setNewPolygons([
          ...newPolygons,
          {
            id: Date.now(),
            points: points.concat({
              id: Date.now(),
              x: e.target.attrs.x * newScale,
              y: e.target.attrs.y * newScale,
            }),
          },
        ])
      : setNewPolygons([
          {
            id: Date.now(),
            points: points.concat({
              id: Date.now(),
              x: e.target.attrs.x * newScale,
              y: e.target.attrs.y * newScale,
            }),
          },
        ]);
    setHistory({
      points: points,
      lastPosition: { x: nextPoint[0], y: nextPoint[1] },
    });
    setPoints([]);
    setnextPoint([]);
    onSave();
    console.log("******** Polygon Points**********\n");
    console.log(JSON.stringify(points));
    if (!isMultiple) {
      setIsComplete(true);
    } else {
      setIsComplete(false);
    }
  };

  const updatePolygons = (newPolygon) => {
    let tempPolygons = newPolygons;
    newPolygons.forEach((polygon, i) => {
      if (polygon.id === newPolygon.id) {
        tempPolygons[i] = newPolygon;
        setNewPolygons([...tempPolygons]);
      }
    });
    setIsUpdate(false);
  };

  const keyListener = (e) => {
    if (e.key.toLowerCase() === "e") {
      console.log("Enabled");
      setIsEnable(true);
      return;
    }
    if (e.key.toLowerCase() === "z" && e.ctrlKey) {
      if (points[0]) {
        setPoints((points) => {
          points.pop();
          return [...points];
        });
        return;
      }
      if ((isComplete && !isMultiple) || (!isComplete && isMultiple)) {
        setIsEditing(false);
        selectShape(null);
        setIsComplete(false);
        setPoints([...history.points]);
        setnextPoint([history.lastPosition.x?.x, history.lastPosition.y?.y]);
        let len = newPolygons.length;
        newPolygons[0] &&
          setNewPolygons((newPolygons) => {
            newPolygons.pop();
            return [...newPolygons];
          });

        if (len > 1) {
          let plen = newPolygons[len - 1].points.length;
          setHistory({
            points: newPolygons[len - 2].points,
            lastPosition: {
              x: newPolygons[len - 1].points[plen - 2].x,
              y: newPolygons[len - 1].points[plen - 2].y,
            },
          });
        } else {
          setHistory({ points: [], lastPosition: {} });
        }
      }
    }

    if (e.key === "Enter") {
      if (isComplete && (selectedId || !isUpdated)) {
        onSave();
      }
      return;
    }

    if (e.key === "Delete") {
      if (!selectedId) {
        return;
      }

      setIsUpdate(false);
      let arr = [];
      newPolygons.forEach((polygon) => {
        arr.push(polygon);
        if (selectedId === polygon.id) {
          arr.pop();
        }
      });
      setNewPolygons([...arr]);
      onSave();
      !isMultiple ? (isComplete ? setIsComplete(false) : () => {}) : () => {};
    }

    e.preventDefault();
  };

  useEffect(() => {
    document.addEventListener("keydown", keyListener);
    return () => {
      document.removeEventListener("keydown", keyListener);
    };
  });

  useEffect(() => {
    window.alert(
      `Click 'E' to Enable\n ctrl+z to undo\nClick 'Delete' to delete\nClick 'Enter' to save`
    );
  }, []);

  return (
    <>
      {!isEditing && isEnable && !isComplete && (
        <Rect
          x={0}
          y={0}
          width={window.innerWidth}
          height={window.innerHeight}
          onClick={onCreatePoint}
          onMouseMove={predictNextPoint}
        />
      )}
      <Line
        opacity={1}
        points={points.flatMap((point) => [point.x, point.y]).concat(nextPoint)}
        stroke="#df4b26"
        strokeWidth={2}
        tension={0}
        lineCap="round"
        lineJoin="round"
        closed={isComplete}
      />

      {points[0] && !isComplete && (
        <Circle
          x={points[0].x}
          y={points[0].y}
          radius={10}
          stroke="black"
          onClick={onCompleteShape}
          onMouseOver={(e) => e.target.setFill("green")}
          onMouseOut={(e) => e.target.setFill("transparent")}
          opacity={0.8}
        />
      )}

      {isMultiple
        ? newPolygons[0] &&
          newPolygons.map((polygon, i) => (
            <Polygon
              key={i}
              isSelected={polygon.id === selectedId}
              polygon={polygon}
              onSelect={(id) => {
                if (id === null) {
                  onSave();
                  return;
                }
                setIsEditing(true);
                selectShape(id);
              }}
              onChange={(newPolygon) => {
                console.log("changed");
                updatePolygons(newPolygon);
              }}
            />
          ))
        : newPolygons[0] && (
            <Polygon
              isSelected={newPolygons[0].id === selectedId}
              polygon={newPolygons[0]}
              onSelect={(id) => {
                if (id === null) {
                  onSave();
                  return;
                }
                setIsEditing(true);
                selectShape(id);
              }}
              onChange={(newPolygon) => {
                setIsUpdate(false);
                setNewPolygons([newPolygon]);
                setHistory({
                  points: [...newPolygon.points],
                  lastPosition: { x: newPolygon.x?.x, y: newPolygon.y?.y },
                });
              }}
            />
          )}
    </>
  );
};
