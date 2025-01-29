// src/redux/authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { token: null }, // Yeh fix hai
  reducers: {
    loginSuccess: (state, action) => {
      state.token = action.payload.token; // Token ko sahi se store kar rahe hain
    },
    logout: (state) => {
      state.token = null;
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
