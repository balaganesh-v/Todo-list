import React, { useState } from "react";
import { useTodos } from "./TodoContext";
import { analyzeTask } from "../apiService";   // 👈 import AI API
import "../index.css";

function TodoForm() {
  const { addTodo } = useTodos();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [completed, setCompleted] = useState(false);
  const [aiInput, setAiInput] = useState("");  // 👈 for natural text

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (title.trim() !== "") {
      await addTodo({ title, description, completed });
      setTitle("");
      setDescription("");
      setCompleted(false);
    }
  };

  const handleAI = async () => {
    if (!aiInput.trim()) return;
    const result = await analyzeTask(aiInput);

    try {
      const parsed = JSON.parse(result.ai_result);  // AI returns JSON string
      setTitle(parsed.title || "");
      setDescription(parsed.description || "");
      setCompleted(parsed.completed || false);

      // Optionally auto-save directly:
      await addTodo(parsed);

      setAiInput("");
    } catch (err) {
      alert("AI could not parse the task properly. Try again!");
    }
  };

  return (
    <div className="space-y-6">
      {/* --- AI Section --- */}
      <div className="bg-yellow-50 border border-yellow-300 p-4 rounded-lg">
        <h2 className="text-lg font-semibold text-gray-700 mb-2">
          Add Todo with AI
        </h2>
        <div className="flex space-x-2">
          <input
            type="text"
            placeholder='e.g. "Write report due tomorrow, not completed yet"'
            value={aiInput}
            onChange={(e) => setAiInput(e.target.value)}
            className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:outline-none"
          />
          <button
            onClick={handleAI}
            className="bg-yellow-500 text-white px-4 rounded-lg hover:bg-yellow-600 transition"
          >
            AI Add
          </button>
        </div>
      </div>

      {/* --- Manual Form Section --- */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-2xl p-6 max-w-md w-full mx-auto space-y-4"
      >
        <h2 className="text-xl font-semibold text-gray-500 text-center mb-4">
          Add a Todo (Manual)
        </h2>

        <input
          type="text"
          placeholder="Enter todo title..."
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          required
          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />

        <input
          type="text"
          placeholder="Enter description..."
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />

        <label className="flex items-center space-x-2 text-gray-700">
          <input
            type="checkbox"
            checked={completed}
            onChange={(event) => setCompleted(event.target.checked)}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <span>Completed</span>
        </label>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition duration-300 font-medium"
        >
          Add Todo
        </button>
      </form>
    </div>
  );
}

export default TodoForm;
