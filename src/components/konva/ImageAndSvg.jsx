import axios from "axios";
import React, { useState, useEffect } from "react";
import { Stage, Layer, Image } from "react-konva";
import useImage from "use-image";
import favicon from "../../favicon.svg";
import dog from "../../assets/dog.png";

const ImageAndSvg = () => {
  //function to convert image
  const convertImage = (x, y, w, h, url) => {
    const [image] = useImage(url);

    return <Image x={x} y={y} width={w} height={h} image={image} />;
  };

  return (
    <div>
      <h1>Images and SVG with React Konva</h1>
      <Stage width={1000} height={1000}>
        <Layer>
          {convertImage(0, 0, 500, 500, "https://picsum.photos/id/237/200/300")}
          {/* load svg image */}
          {convertImage(
            510,
            0,
            400,
            500,
            "https://s3-us-west-2.amazonaws.com/s.cdpn.io/106114/tiger.svg"
          )}

          {convertImage(0, 510, 400, 500, favicon)}
        </Layer>
      </Stage>
    </div>
  );
};

export default ImageAndSvg;
