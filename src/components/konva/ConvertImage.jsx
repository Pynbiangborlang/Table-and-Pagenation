import React from "react";
import { Image } from "react-konva";
import useImage from "use-image";

export const ConvertImage = ({ x, y, w, h, src }) => {
  const [image] = useImage(src);
  debugger;
  return <Image x={x} y={y} width={w} height={h} image={image} />;
};
