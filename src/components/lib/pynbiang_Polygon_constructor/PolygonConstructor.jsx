import React, { useRef, useState, useEffect } from "react";
import Konva from "konva";
import { Circle, Line, Rect, Group, Stage, Layer, Image } from "react-konva";
import useImage from "use-image";

const URLImage = ({ image }) => {
  const [img] = useImage(image.url);

  return <Image image={img} width={image.width} height={image.height} />;
};
const Anchors = ({ anchors, id, callBack }) => {
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
            onDragStart={(e) => {
              setShowPath(true);
              setPath({ ...showPath(i, e) });
            }}
            onDragEnd={(e) => {
              setPath({ first: [], middle: [], last: [] });
              setShowPath(false);
              handleDrag({ id: i, x: e.target.attrs.x, y: e.target.attrs.y });
              let newPolygon = [];
              for (let i = 0; i < lines.length; i++) {
                newPolygon.push({
                  id: anchors[i].id,
                  x: lines[i][0].x,
                  y: lines[i][0].y,
                });
                if (lines.length - i === 1) {
                  newPolygon.push({
                    id: anchors[i + 1].id,
                    x: lines[0][0].x,
                    y: lines[0][0].y,
                  });
                }
              }
              callBack({ id: id, points: newPolygon });
            }}
          />
        );
      })}
      {lines.map((line, i) => (
        <Line
          key={i}
          points={line.flatMap((point) => [point.x, point.y])}
          stroke="red"
          lineCap="round"
          lineJoin="round"
          strokeWidth={2}
          onClick={(e) => {
            console.log("line click", e);
          }}
        />
      ))}
      {shouldShowPath && (
        <Line
          stroke="blue"
          points={path.first.concat(path.middle).concat(path.last)}
          strokeWidth={2}
        />
      )}
    </Group>
  );
};
export const Polygon = ({ polygon, isSelected, onChange, onSelect }) => {
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
            anchors={polygon.points}
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
  callBack,
  isMultiple = false,
  ...props
}) => {
  console.log("poly");
  let newScale = scale ? scale : 1;
  const [isEnable, setIsEnable] = useState(false);
  const [isUpdated, setIsUpdate] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [newPolygons, setPolygons] = useState(polygons ? polygons : []);
  const [selectedId, selectShape] = useState(null);
  const [nextPoint, setnextPoint] = useState([0, 0]);
  const [points, setPoints] = useState([]);
  const [isComplete, setIsComplete] = useState(false);

  console.log("newpolygons", newPolygons);
  const onSave = () => {
    if (selectedId || !isUpdated) {
      selectShape(null);
      setIsEditing(false);
      callBack(newPolygons);
      setIsUpdate(true);
      console.log("newPoints", newPolygons);
    }
  };

  const onCreatePoint = (e) => {
    isMultiple
      ? setIsComplete(false)
      : isComplete
      ? () => {
          return;
        }
      : () => {};
    if (!isComplete) {
      console.log(e);
      let pos = e.evt;
      setPoints([
        ...points,
        {
          id: Date.now(),
          x: pos.offsetX * newScale,
          y: pos.offsetY * newScale,
        },
      ]);
    }
  };

  const predictNextPoint = (e) => {
    if (isComplete) {
      return;
    }
    let pos = e.evt;
    setnextPoint([pos.offsetX * newScale, pos.offsetY * newScale]);
  };

  const onCompleteShape = (e) => {
    setIsUpdate(false);
    setPolygons([
      ...newPolygons,
      {
        id: Date.now(),
        points: points.concat({
          id: Date.now(),
          x: e.target.attrs.x * newScale,
          y: e.target.attrs.y * newScale,
        }),
      },
    ]);
    setPoints([]);
    setnextPoint([]);
    setIsComplete(true);
    onSave();
    console.log("******** Polygon Points**********\n");
    console.log(JSON.stringify(points));
    console.log("******** Polygons**********\n");
  };

  const updatePolygons = (newPolygon) => {
    let tempPolygons = newPolygons;
    newPolygons.forEach((polygon, i) => {
      if (polygon.id === newPolygon.id) {
        tempPolygons[i] = newPolygon;
        setPolygons(tempPolygons);
      }
    });
  };

  const listener = (e) => {
    console.log(e);
    if (e.key.toLowerCase() === "e") {
      setIsEnable(true);
      return;
    }
    if (e.key.toLowerCase() === "z" && e.ctrlKey) {
      if (isComplete) {
        return;
      }
      setPoints((points) => {
        points.pop();
        return [...points];
      });
    }

    if (e.key === "Enter") {
      onSave();
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
      debugger;
      setPolygons([...arr]);
      onSave();
    }

    e.preventDefault();
  };

  useEffect(() => {
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  });

  useEffect(() => {
    window.alert(
      `Click 'E' to Enable\n ctrl+z to undo\nClick 'Delete' to delete\nClick 'Enter' to save`
    );
  }, []);

  return (
    <>
      <Stage width={width} height={height}>
        <Layer>
          {props.imageURL && (
            <URLImage
              image={{
                url: "https://www.kindpng.com/picc/m/252-2524695_dummy-profile-image-jpg-hd-png-download.png",
                width: width,
                height: height,
              }}
            />
          )}
          {!isEditing && isEnable && (
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
            points={points
              .flatMap((point) => [point.x, point.y])
              .concat(nextPoint)}
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
            />
          )}

          {isMultiple
            ? newPolygons[0] &&
              newPolygons.map((polygon, i) => (
                <Polygon
                  key={i}
                  isSelected={polygon.id === selectedId}
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
