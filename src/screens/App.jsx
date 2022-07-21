import React, { useState } from "react";
import { Layer, Stage, Text } from "react-konva";
import { ColoredStar } from "../components/konva/ColoredStar";
import Triangle from "../components/konva/Triangle";

const App = () => {
  const [color, setColor] = useState("red");
  return (
    <Stage width={500} height={500}>
      <Layer>
        <ColoredStar x={200} y={200} fill="red" />
        <ColoredStar x={300} y={300} fill="green" />
        <Triangle
          id={"triangle1"}
          x={10}
          y={20}
          scale={2}
          fill={color}
          onClick={(shape) => {
            shape.setFill("green");
          }}
        />
        <Triangle
          id={"triangle2"}
          x={10}
          y={300}
          scale={2}
          fill={color}
          onClick={(shape) => {
            shape.setFill("blue");
          }}
        />
      </Layer>
    </Stage>
  );
};

export default App;
