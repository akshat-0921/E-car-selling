import { createAsyncThunk, createSlice, isRejectedWithValue } from "@reduxjs/toolkit";
import { getCurrentUser, updateUserProfile } from "../api/authService";

export const fetchCurrentUser = createAsyncThunk(
   'auth/fetchCurrentUser',
   async (_, thunkAPI) => {
      try {
         const response = await getCurrentUser()
         return response
      } catch (error) {
         return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to load user");
      }
   }
)

export const updateUserThunk = createAsyncThunk(
   'auth/updateUser',
   async (userData, thunkAPI) => {
      try {
         const response = await updateUserProfile(userData)
         return response
      } catch (error) {
         return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to update user");
      }
   }
)


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
   extraReducers: (builder) => {
      builder
         //load user
         .addCase(fetchCurrentUser.pending, (state) => {
            state.loading = true
            state.error = false
         })
         .addCase(fetchCurrentUser.fulfilled, (state, action) => {
            state.isLoggedIn = true;
            state.user = action.payload;
            state.loading = false;
            state.error = null;
         })
         .addCase(fetchCurrentUser.rejected, (state, action) => {
            state.isLoggedIn = false;
            state.user = null;
            state.loading = false;
            state.error = action.payload;
         })

         //update user
         .addCase(updateUserThunk.pending, (state) => {
            state.loading = true;
            state.error = null;
         })
         .addCase(updateUserThunk.fulfilled, (state, action) => {
            state.user = action.payload;
            state.loading = false;
         })
         .addCase(updateUserThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
         });
   }
});

export const { login, logout, setLoading, setError, updateUser } = authSlice.actions;
export default authSlice.reducer;
