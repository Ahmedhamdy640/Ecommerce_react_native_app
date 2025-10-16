import { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { User } from "../types/UserType";

const initialState: {
  accessToken: string | null;
  currentUserData: User | null;
} = {
  accessToken: null,
  currentUserData: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.accessToken = action.payload.accessToken;
    },
    currentUserData: (state, action: PayloadAction<User>) => {
      state.currentUserData = action.payload;
    },
    logout: (state) => {
      state.accessToken = null;
      state.currentUserData = null;
    },
  },
});

export const { loginSuccess, logout, currentUserData } = authSlice.actions;

export default authSlice.reducer;
