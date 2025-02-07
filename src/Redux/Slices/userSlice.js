import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: "",
  currentUser: false,
};

const userSlice = createSlice({
  name: "User",
  initialState,
  reducers: {
    setUsername(state, action) {
      state.username = action.payload;
    },
    setUserConfirmed(state) {
      state.currentUser = true;
    },
  },
});

export default userSlice.reducer;
export const { setUsername, setUserConfirmed } = userSlice.actions;
