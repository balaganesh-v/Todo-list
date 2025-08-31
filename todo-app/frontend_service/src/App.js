import React from "react";
import { TodoProvider } from "./components/TodoContext";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import "./index.css";

function App() {
  return (
    <TodoProvider>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
        <div className="w-full max-w-3xl bg-white shadow-lg rounded-2xl p-8">
          {/* Header */}
          <header className="mb-6 text-center">
            <h1 className="text-4xl font-bold text-blue-600">🪶 Todo App</h1>
          </header>

          {/* Form */}
          <TodoForm />

          {/* List */}
          <TodoList />
        </div>
      </div>
    </TodoProvider>
  );
}

export default App;
