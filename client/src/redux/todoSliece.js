import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5000/api/todos";

// ✅ Correct token usage in all requests
export const fetchTodos = createAsyncThunk("todos/fetchTodos", async (token) => {
  const response = await axios.get(API_URL, {
    headers: { Authorization: `Bearer ${token}` }, // ✅ Token add kiya
  });
  return response.data;
});

export const addTodo = createAsyncThunk("todos/addTodo", async ({ token, name, description }) => {
  console.log("Frontend Token:", token); // ✅ Debugging token
  const response = await axios.post("http://localhost:5000/api/todos", { name, description }, {
    headers: { Authorization: `Bearer ${token}` }, // ✅ Token correctly set
  });
  return response.data;
});


export const updateTodo = createAsyncThunk("todos/updateTodo", async ({ token, id, data }) => {
  const response = await axios.put(`${API_URL}/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` }, // ✅ Token add kiya
  });
  return response.data;
});

export const deleteTodo = createAsyncThunk("todos/deleteTodo", async ({ token, id }) => {
  await axios.delete(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` }, // ✅ Token add kiya
  });
  return id;
});

const todoSlice = createSlice({
  name: "todos",
  initialState: { todos: [], status: "idle" },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.fulfilled, (state, action) => { state.todos = action.payload; })
      .addCase(addTodo.fulfilled, (state, action) => { state.todos.push(action.payload); })
      .addCase(updateTodo.fulfilled, (state, action) => {
        const index = state.todos.findIndex((todo) => todo._id === action.payload._id);
        if (index !== -1) state.todos[index] = action.payload;
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.todos = state.todos.filter((todo) => todo._id !== action.payload);
      });
  },
});

export default todoSlice.reducer;
