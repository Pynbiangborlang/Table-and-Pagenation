import React, { useState } from "react";
import { Image, Layer, Stage } from "react-konva";
import useImage from "use-image";
import { PolygonConstructor } from "../../components/lib/pynbiang_Polygon_constructor";

const URLImage = ({ image }) => {
  const [img] = useImage(image.url);

  return <Image image={img} width={image.width} height={image.height} />;
};

export const Drawing = () => {
  const [polygons, setPolygons] = useState([]);
  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        <URLImage
          image={{
            url: "https://www.kindpng.com/picc/m/252-2524695_dummy-profile-image-jpg-hd-png-download.png",
            width: window.innerWidth,
            height: window.innerHeight,
          }}
        />
        <PolygonConstructor
          width={window.innerWidth}
          height={window.innerHeight}
          polygons={polygons}
          isMultiple={false}
          setPolygons={(polygon) => {
            setPolygons([...polygon]);
            console.log("update polygons", JSON.stringify(polygons));
            //callback to server
          }}
        />
      </Layer>
    </Stage>
  );
};
