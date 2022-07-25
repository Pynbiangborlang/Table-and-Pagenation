import React from "react";
import { useFetch } from "./useUser";

export const LearningSwr = () => {
  const { data, error } = useFetch(
    "https://jsonplaceholder.typicode.com/todos"
  );
  return (
    <>
      <ul>
        {data ? (
          data.map((todo) => <li key={todo.id}>{todo.title}</li>)
        ) : (
          <div>Loading...</div>
        )}
      </ul>
    </>
  );
};
