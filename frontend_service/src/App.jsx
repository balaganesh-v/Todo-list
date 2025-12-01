// src/App.jsx
import React from "react";
import { TodoProvider } from "./context/TodoProvider";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import NavBar from "./components/NavBar";
import "./index.css";

const App = () => {
    return (
        <TodoProvider>
            <NavBar />
            <div className="min-h-screen bg-white flex justify-center mt-20">
                <div className="flex flex-col items-center p-6">
                    <h1 className="text-3xl font-bold mb-6 text-gray-700">FastAPI ToDo App</h1>
                    <TodoForm />
                    <TodoList />
                </div>
            </div>
        </TodoProvider>


    );
};

export default App;
