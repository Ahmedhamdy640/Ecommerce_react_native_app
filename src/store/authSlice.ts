import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accessToken: null,
  user: null,
  currentUserData: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.user = action.payload;
    },
    currentUserData: (state, action) => {
      state.currentUserData = action.payload;
    },
    logout: (state) => {
      state.accessToken = null;
      state.user = null;
      state.currentUserData = null;
    },
  },
});

export const { loginSuccess, logout, currentUserData } = authSlice.actions;

export default authSlice.reducer;
