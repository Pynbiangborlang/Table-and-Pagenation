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

// @ts-ignore
ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <BrowserRouter>
      <div className="header">
        <Link to="/">My Posts</Link>&nbsp;|
        <Link to="/users">Users</Link>&nbsp;|
        <Link to="/canvasshapes">Canvas Shapes</Link>|
        <Link to="/imageandsvg">Image and SVG</Link>|
        <Link to="/img">Reusable Image component</Link>
      </div>
      <br></br>
      <Routes>
        <Route path="/" element={<Posts />} />
        <Route path="/users" element={<User />} />
        <Route path="/canvasshapes" element={<App />} />
        <Route path="/imageandsvg" element={<ImageAndSvg />} />
        <Route path="/img" element={<Canvas />} />
      </Routes>
    </BrowserRouter>
  </>
);
