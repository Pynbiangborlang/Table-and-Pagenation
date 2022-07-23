import React, { useState } from "react";
import { ConvertImage } from "../components/konva/ConvertImage";
import { Stage, Layer } from "react-konva";
import dog from "../assets/dog.png";

export const Canvas = () => {
  return (
    <Stage width={1000} height={1000}>
      <Layer>
        <ConvertImage
          x={0}
          y={0}
          w={200}
          h={200}
          src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/106114/tiger.svg"
        />
      </Layer>
    </Stage>
  );
};
