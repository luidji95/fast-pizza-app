import { createSlice } from "@reduxjs/toolkit";
import { act } from "react";

const initialState = {
  username: "",
  currentUser: false,
  address: "",
  phoneNumber: "",
};

const userSlice = createSlice({
  name: "User",
  initialState,
  reducers: {
    setUsername(state, action) {
      state.username = action.payload;
    },
    setPhoneNumber(state, action) {
      state.phoneNumber = action.payload;
    },
    setAddress(state, action) {
      state.address = action.payload;
    },
    setUserConfirmed(state) {
      state.currentUser = true;
    },
  },
});

export const { setUsername, setPhoneNumber, setAddress, setUserConfirmed } =
  userSlice.actions;
export default userSlice.reducer;
