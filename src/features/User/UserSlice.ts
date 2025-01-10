import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface UsersState {
  userdata: any;
  token: any;
}

const initialState: UsersState = {
  userdata: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")!)
    : null,
  token: localStorage.getItem("token")
    ? JSON.parse(localStorage.getItem("token")!)
    : null,
};
// const initialState: UsersState = {
//   userdata: null,
//   token: null,
// };
export const userSlice = createSlice({
  name: "User",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<any>) => {
      state.userdata = action.payload;
      localStorage.setItem("user", JSON.stringify(state.userdata));
    },
    setToken: (state, action: PayloadAction<any>) => {
      state.token = action.payload;
      localStorage.setItem("token", JSON.stringify(state.token));
    },
    logout: (state) => {
      state.userdata = null;
      state.token = null;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      console.log("Logged out successfully");
    },
  },
});

// Export the new logout action
export const { setUser, setToken, logout } = userSlice.actions;

export default userSlice.reducer;
