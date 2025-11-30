// src/components/TodoList.jsx
import React from "react";
import { useTodos } from "../context/TodoProvider";
import TodoItem from "./TodoItem";

const TodoList = () => {
    const { todos } = useTodos();

    return (
        <div className="w-full max-w-md space-y-2">
            {todos.map(todo => (
                <TodoItem key={todo.id} todo={todo} />
            ))}
        </div>
    );
};

export default TodoList;
