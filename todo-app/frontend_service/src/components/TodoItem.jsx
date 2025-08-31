import React, { useState } from "react";
import { useTodos } from "./TodoContext";
import "../index.css"

function TodoItem({ todo }) {
  const { toggleComplete, removeTodo, updateTodo } = useTodos();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todo.title);
  const [editedDescription, setEditedDescription] = useState(todo.description);

  const handleSave = async () => {
    await updateTodo(todo.id, {
      title: editedTitle,
      description: editedDescription,
    });
    setIsEditing(false);
  };

  return (
    <li className="bg-white shadow-sm border border-gray-200 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-start space-x-3 w-full">
        {/* Checkbox */}
        <input type="checkbox" checked={todo.completed} onChange={() => toggleComplete(todo.id, !todo.completed)}
          className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mt-1"/>

        {/* Content */}
        <div className="flex-1">
          {isEditing ? (
            <div className="space-y-2">
              <input type="text" value={editedTitle} onChange={(event) => setEditedTitle(event.target.value)}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"/>

              <input type="text" value={editedDescription}
                onChange={(event) => setEditedDescription(event.target.value)}className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" />
            </div>
          ) : (
            <div>
              <h3 className={`font-semibold text-lg ${ todo.completed ? "line-through text-gray-400" : "text-gray-800"}`}>
                {todo.title}
              </h3>
              <p className={`text-sm ${ todo.completed ? "line-through text-gray-400" : "text-gray-600" }`}>
                {todo.description}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-2 mt-3 sm:mt-0 sm:ml-4">
        {isEditing ? (
          <button onClick={handleSave} className="px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600 transition">
            Save
          </button>
        ) : (
          <button onClick={() => setIsEditing(true)} className="px-3 py-1 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition">
            Edit
          </button>
        )}
        <button onClick={() => removeTodo(todo.id)} className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition" >
          Delete
        </button>
      </div>
    </li>
  );
}

export default TodoItem;
