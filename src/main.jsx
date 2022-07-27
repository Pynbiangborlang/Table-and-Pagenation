import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { UseContextComponent } from "./components/usecontext/UseContextComponent";
import Posts from "./screens/posts/Posts";
// import "./components/hooks/UseReducerHook";
import User from "./screens/usertable/User";
import "./index.css";
import App from "./screens/App";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import ImageAndSvg from "./components/konva/ImageAndSvg";
import { Canvas } from "./screens/canvas";
import { PolygonConstructor } from "./components/konva/PolygonConstructor";
import { Draw } from "./screens/draw/Draw";
import { Gallery } from "./screens/galary/Gallery";
import { LearningSwr } from "./screens/swr/LearningSwr";
import { Todos } from "./screens/swr/Todos";

// @ts-ignore
ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <BrowserRouter>
      <div className="header">
        <Link to="/">My Posts</Link>&nbsp;|
        <Link to="/users">Users</Link>&nbsp;|
        <Link to="/canvasshapes">Canvas Shapes</Link>|
        <Link to="/imageandsvg">Image and SVG</Link>|
        <Link to="/img">Reusable Image</Link>|
        <Link to="/draw">Drawing Polygon</Link>|
        <Link to="/gallery">Gallery</Link>|<Link to="/todos">Todo Lists</Link>|
        <Link to="/addtodos">My Todo</Link>|
      </div>
      <br></br>
      <Routes>
        <Route path="/" element={<Posts />} />
        <Route path="/users" element={<User />} />
        <Route path="/canvasshapes" element={<App />} />
        <Route path="/imageandsvg" element={<ImageAndSvg />} />
        <Route path="/img" element={<Canvas />} />
        <Route path="/draw" element={<Draw />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/todos" element={<LearningSwr />} />
        <Route path="/addtodos" element={<Todos />} />
      </Routes>
    </BrowserRouter>
  </>
);
