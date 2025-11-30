// src/context/TodoProvider.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { getTodos, createTodo, updateTodo, deleteTodo } from "../apiService";

const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        const fetchTodos = async () => {
            try {
                const data = await getTodos();
                setTodos(data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchTodos();
    }, []);

    const addTodo = async (todo) => {
        try {
            const created = await createTodo(todo);
            setTodos(prev => [...prev, created]);
        } catch (error) {
            console.error(error);
        }
    };

    const toggleCompleted = async (todo) => {
        try {
            const updated = await updateTodo(todo.id, { completed: !todo.completed });
            setTodos(prev => prev.map(t => t.id === updated.id ? updated : t));
        } catch (error) {
            console.error(error);
        }
    };

    const removeTodo = async (id) => {
        try {
            await deleteTodo(id);
            setTodos(prev => prev.filter(t => t.id !== id));
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <TodoContext.Provider value={{ todos, addTodo, toggleCompleted, removeTodo }}>
            {children}
        </TodoContext.Provider>
    );
};

export const useTodos = () => useContext(TodoContext);
