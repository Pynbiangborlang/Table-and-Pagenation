import React from "react";
import ReactDOM from "react-dom/client";
import { UseContextComponent } from "./components/usecontext/UseContextComponent";
import Posts from "./components/posts/Posts";
// import "./components/hooks/UseReducerHook";
import User from "./components/usertable/User";
import "./index.css";

// @ts-ignore
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Posts />
    <hr></hr>
    <br></br>
    <User />

    {/* <UseContextComponent /> */}
  </React.StrictMode>
);
