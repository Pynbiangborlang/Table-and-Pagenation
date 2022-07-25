import axios from "axios";
import React, { useEffect } from "react";
import useSWR from "swr";
import "./gallery.css";

const fetcher = (url) => axios.get(url).then((res) => res.data);

export const Gallery = () => {
  let photos = [];
  const { data, error } = useSWR(
    "https://jsonplaceholder.typicode.com/albums/1/photos",
    fetcher
  );

  useEffect(() => {}, [data]);
  return (
    <div className="main-container">
      {data !== undefined &&
        data.map((photo) => (
          <img key={photo.id} className="photo" src={photo.url} />
        ))}
    </div>
  );
};
