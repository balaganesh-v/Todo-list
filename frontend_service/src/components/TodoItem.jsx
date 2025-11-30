// src/components/TodoItem.jsx
import React, { useState, useEffect } from "react";
import { useTodos } from "../context/TodoProvider";
import { updateTodo } from "../apiService";

const TodoItem = ({ todo }) => {
    const { toggleCompleted, removeTodo } = useTodos();
    const [showPopup, setShowPopup] = useState(false);
    const [editTitle, setEditTitle] = useState(todo.title);
    const [editDesc, setEditDesc] = useState(todo.description);
    const [completed, setCompleted] = useState(todo.completed);

    // Sync local state with todo prop changes
    useEffect(() => {
        setEditTitle(todo.title);
        setEditDesc(todo.description);
        setCompleted(todo.completed);
    }, [todo]);

    // Handle checkbox toggle
    const handleCheckbox = async () => {
        try {
            const updated = await updateTodo(todo.id, {
                title: editTitle,
                description: editDesc,
                completed: !completed,
            });
            setCompleted(updated.completed);
            toggleCompleted(updated); // update context state
        } catch (err) {
            console.error("Error updating todo:", err);
        }
    };

    // Handle save from popup
    const handleSave = async () => {
        try {
            const updated = await updateTodo(todo.id, {
                title: editTitle,
                description: editDesc,
                completed,
            });
            toggleCompleted(updated);
            setShowPopup(false);
        } catch (err) {
            console.error("Error saving:", err);
        }
    };

    return (
        <>
            {/* Todo Item */}
            <div
                className={`flex items-center justify-between p-4 rounded-xl shadow-md transition-all duration-300 hover:shadow-xl border-l-4 ${completed ? "border-green-500 bg-green-50" : "border-blue-500 bg-white"
                    }`}
            >
                <div className="flex items-center gap-3">
                    {/* Editable checkbox */}
                    <input
                        type="checkbox"
                        checked={completed}
                        onChange={handleCheckbox}
                        className="h-5 w-5 cursor-pointer accent-blue-500"
                    />

                    {/* Todo content */}
                    <div>
                        <div
                            className={`font-semibold text-lg ${completed ? "line-through text-gray-400" : "text-gray-800"
                                }`}
                        >
                            {editTitle}
                        </div>
                        <div className="text-gray-500 text-sm">{editDesc}</div>
                    </div>
                </div>

                {/* Buttons */}
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setShowPopup(true)}
                        className="text-blue-600 hover:text-blue-800 font-medium transition"
                    >
                        Edit
                    </button>
                    <button
                        onClick={() => removeTodo(todo.id)}
                        className="text-red-500 hover:text-red-700 font-medium transition"
                    >
                        Delete
                    </button>
                </div>
            </div>

            {/* Popup (Modal) */}
            {showPopup && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
                    <div className="bg-white rounded-xl shadow-2xl w-80 p-6 animate-fadeIn">
                        <h2 className="text-2xl font-bold mb-4 text-gray-800">Edit Todo</h2>

                        <input
                            type="text"
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                            className="w-full border border-gray-300 rounded px-3 py-2 mb-3 focus:ring-2 focus:ring-blue-400 outline-none transition"
                            placeholder="Title"
                        />

                        <textarea
                            value={editDesc}
                            onChange={(e) => setEditDesc(e.target.value)}
                            className="w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:ring-2 focus:ring-blue-400 outline-none transition"
                            rows="3"
                            placeholder="Description"
                        ></textarea>

                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setShowPopup(false)}
                                className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSave}
                                className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default TodoItem;
