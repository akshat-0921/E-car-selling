import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   isLoggedIn: false,
   user: null,
   loading: false,
   error: null,
};

const authSlice = createSlice({
   name: "auth",
   initialState,
   reducers: {
      login(state, action) {
         state.isLoggedIn = true;
         state.user = action.payload;
         state.error = null;
      },
      logout(state) {
         state.isLoggedIn = false;
         state.user = null;
         state.error = null;
      },
      setLoading(state, action) {
         state.loading = action.payload;
      },
      setError(state, action) {
         state.error = action.payload;
      },
      updateUser(state, action) {
         state.user = action.payload;
      },
   },
});

export const { login, logout, setLoading, setError, updateUser } = authSlice.actions;
export default authSlice.reducer;
