import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllBrands } from "../api/brandApi";

export const getAllBrandsThunk = createAsyncThunk(
   'brand/getAll',
   async (_, thunkAPI) => {
      try {
         const response = await getAllBrands()
         return response
      } catch (error) {
         return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to load brands")
      }
   }
)

const initialState = {
   brands: [],
   selectedBrand: null,
   loading: false,
   error: null,
}

const brandSlice = createSlice({
   name: 'brand',
   initialState,
   reducers: {
      clearSelectedBrand: (state) => {
         state.selectedBrand = null
      }
   },
   extraReducers: (builder) => {
      builder
         .addCase(getAllBrandsThunk.pending, (state) => {
            state.loading = true;
            state.error = null;
         })
         .addCase(getAllBrandsThunk.fulfilled, (state, action) => {
            state.brands = action.payload;
            state.loading = false;
         })
         .addCase(getAllBrandsThunk.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = false;
         })

   }
}
)

export const { clearSelectedBrand } = brandSlice.actions
export default brandSlice.reducer