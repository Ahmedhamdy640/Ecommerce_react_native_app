import { createSlice } from "@reduxjs/toolkit";

interface LockState {
  isLocked: boolean;
}

const initialState: LockState = {
  isLocked: true,
};

const lockSlice = createSlice({
  name: "lock",
  initialState,
  reducers: {
    lockApp: (state) => {
      state.isLocked = true;
    },
    unlockApp: (state) => {
      state.isLocked = false;
    },
  },
});

export const { lockApp, unlockApp } = lockSlice.actions;
export default lockSlice.reducer;
