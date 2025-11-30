// src/components/TodoForm.jsx
import React, { useState } from "react";
import { useTodos } from "../context/TodoProvider";

const TodoForm = () => {
    const { addTodo } = useTodos();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title) return;
        addTodo({ title, description });
        setTitle("");
        setDescription("");
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-2 mb-6 w-full max-w-md">
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={e => setTitle(e.target.value)}
                className="p-2 border rounded w-full"
            />
            <input
                type="text"
                placeholder="Description"
                value={description}
                onChange={e => setDescription(e.target.value)}
                className="p-2 border rounded w-full"
            />
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                Add
            </button>
        </form>
    );
};

export default TodoForm;
