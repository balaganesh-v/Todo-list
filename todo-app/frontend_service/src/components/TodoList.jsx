import React from "react";
import { useTodos } from "./TodoContext";
import TodoItem from "./TodoItem";
import "../index.css"

function TodoList() {
  const { todos } = useTodos();

  return (
    <div className="max-w-2xl w-full mx-auto mt-8">
      {todos.length === 0 ? (
        <p className="text-center text-gray-500 text-lg italic">
          No todos yet! ✨
        </p>
      ) : (
        <ul className="space-y-3">
          {todos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </ul>
      )}
    </div>
  );
}

export default TodoList;
