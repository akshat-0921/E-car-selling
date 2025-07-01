import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAllVehicles, getVehicleById } from '../api/vehicleService';
import { fetchVehiclesByBrand } from "../api/brandApi";

export const fetchVehicles = createAsyncThunk(
   'vehicle/fetchVehicles',
   async (filters = {}, thunkAPI) => {
      try {
         const response = await getAllVehicles(filters);
         return response;
      } catch (error) {
         return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to fetch vehicles");
      }
   }
);

export const fetchVehicleDetails = createAsyncThunk(
   'vehicle/fetchVehicleDetails',
   async (id, thunkAPI) => {
      try {
         const response = await getVehicleById(id);
         return response;
      } catch (error) {
         return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to fetch vehicle details");
      }
   }
);

export const fetchVehiclesByBrandThunk = createAsyncThunk(
   'brand/vehicles',
   async (id, thunkAPI) => {
      try {
         const response = await fetchVehiclesByBrand(id)
         return response
      } catch (error) {
         return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to load brands")
      }
   }
)

const initialState = {
   vehicles: [],
   selectedVehicle: null,

   // Separate loading & error states
   allLoading: false,
   allError: null,

   detailsLoading: false,
   detailsError: null,

   brandLoading: false,
   brandError: null,
};

3
const vehicleSlice = createSlice({
   name: 'vehicle',
   initialState: initialState,
   reducers: {
      clearSelectedVehicle: (state) => {
         state.selectedVehicle = null;
      }
   },
   extraReducers: (builder) => {
      builder
         // For all vehicles
         .addCase(fetchVehicles.pending, (state) => {
            state.allLoading = true;
            state.allError = null;
         })
         .addCase(fetchVehicles.fulfilled, (state, action) => {
            state.vehicles = action.payload;
            state.allLoading = false;
         })
         .addCase(fetchVehicles.rejected, (state, action) => {
            state.allError = action.payload;
            state.allLoading = false;
         })

         // For vehicle details
         .addCase(fetchVehicleDetails.pending, (state) => {
            state.detailsLoading = true;
            state.detailsError = null;
         })
         .addCase(fetchVehicleDetails.fulfilled, (state, action) => {
            state.selectedVehicle = action.payload;
            state.detailsLoading = false;
         })
         .addCase(fetchVehicleDetails.rejected, (state, action) => {
            state.detailsError = action.payload;
            state.detailsLoading = false;
         })

         // For vehicles by brand
         .addCase(fetchVehiclesByBrandThunk.pending, (state) => {
            state.brandLoading = true;
            state.brandError = null;
         })
         .addCase(fetchVehiclesByBrandThunk.fulfilled, (state, action) => {
            state.vehicles = action.payload;
            state.brandLoading = false;
         })
         .addCase(fetchVehiclesByBrandThunk.rejected, (state, action) => {
            state.brandError = action.payload;
            state.brandLoading = false;
         })

   },
});

export const { clearSelectedVehicle } = vehicleSlice.actions;
export default vehicleSlice.reducer;
