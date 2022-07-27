import React, { useState } from "react";
import useSwr from "swr";
import { getTodos, addTodo } from "./api";
import "./todo.css";

export const Todos = () => {
  const [text, setText] = useState("");
  const { data, mutate } = useSwr("/api/todos", getTodos);

  console.log(data);
  return (
    <div className="td-container">
      <div className="td-form-container">
        <form className="td-form">
          <input
            onChange={(e) => setText(e.target.value)}
            className="td-input"
            placeholder="Enter tasks"
          />
          <button
            type="submit"
            className="td-button"
            onClick={async (e) => {
              e.preventDefault();
              const newTodo = {
                id: Date.now(),
                name: text,
              };

              // const mutation = async () => {
              try {
                await mutate(addTodo(newTodo), {
                  // rollbackOnError: true,
                  populateCache: true,
                  // revalidate: false,
                });
                console.log("Successfully added the new item.");
              } catch (error) {
                console.log("Failed to add the new item.");
              }
              // };
              // mutation();
            }}
          >
            add
          </button>
        </form>
      </div>
      <ul className="td-list">
        {data !== undefined ? (
          data.map((todo) => (
            <li className="td-list-item" key={todo.id}>
              {todo.name}
            </li>
          ))
        ) : (
          <div></div>
        )}
      </ul>
    </div>
  );
};
