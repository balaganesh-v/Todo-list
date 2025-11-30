// src/apiService.js
import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000/todos";

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: { "Content-Type": "application/json" },
});

export const getTodos = async () => {
    try {
        const response = await api.get("/");
        return response.data;
    } catch (error) {
        console.error("Error fetching todos:", error);
        throw error;
    }
};

export const createTodo = async (todo) => {
    try {
        const response = await api.post("/", todo);
        return response.data;
    } catch (error) {
        console.error("Error creating todo:", error);
        throw error;
    }
};

export const updateTodo = async (todoId, todo) => {
    try {
        const response = await api.put(`/${todoId}`, todo);
        return response.data;
    } catch (error) {
        console.error("Error updating todo:", error);
        throw error;
    }
};

export const deleteTodo = async (todoId) => {
    try {
        const response = await api.delete(`/${todoId}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting todo:", error);
        throw error;
    }
};
