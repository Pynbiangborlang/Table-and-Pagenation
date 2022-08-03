const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { json } = require("body-parser");
const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(
  json(),
  bodyParser.urlencoded({
    extended: true,
  })
);

let todos = [{ id: 1, name: "task 1" }];

app.post("/api/todo", (req, res) => {
  console.log(req.body);
  todos = [...todos, req.body.todo];
  res.json(todos);
  res.end();
});

app.get("/api/todo", (req, res) => {
  res.json(todos).end();
});

app.listen(8000, () => console.log("server listens at port 8000"));
