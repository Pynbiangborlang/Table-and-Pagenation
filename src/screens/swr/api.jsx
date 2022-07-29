import axios from "axios";

export async function getTodos() {
  const data = await axios
    .get("http://localhost:8000/api/todo")
    .then((res) => res.data);
  return data;
}

export async function addTodo(todo) {
  //please run server code
  await axios
    .post("http://localhost:8000/api/todo", {
      todo,
    })
    .then((res) => res.data)
    .then((data) => {
      return data;
    });
}
