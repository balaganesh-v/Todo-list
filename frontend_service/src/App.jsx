// src/App.jsx
import React from "react";
import { TodoProvider } from "./context/TodoProvider";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import "./index.css";

const App = () => {
    return (
        <TodoProvider>
            <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
                <h1 className="text-3xl font-bold mb-6 text-blue-500">FastAPI TODO App</h1>
                <TodoForm />
                <TodoList />
            </div>
        </TodoProvider>
    );
};

export default App;
