import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   isLoggedIn: false,
   admin: null,
   accessToken: null
};

const adminSlice = createSlice({
   name: "admin",
   initialState,
   reducers: {
      setAdminLogin(state, action) {
         state.isLoggedIn = true;
         state.admin = action.payload.admin;
         state.accessToken = action.payload.accessToken || null;
      },
      setAdminLogout(state) {
         state.isLoggedIn = false;
         state.admin = null;
         state.accessToken = null;
      },
   }
});

export const { setAdminLogin, setAdminLogout } = adminSlice.actions;
export default adminSlice.reducer;
