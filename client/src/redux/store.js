// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import todoReducer from './todoSliece';

const store = configureStore({
  reducer: {
    auth: authReducer,
    todos: todoReducer,
  },
});

export default store;
