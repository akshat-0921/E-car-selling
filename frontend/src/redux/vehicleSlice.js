import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAllVehicles, getVehicleById } from '../api/vehicleService';

export const fetchVehicles = createAsyncThunk(
   'vehicle/fetchVehicles',
   async (_, thunkAPI) => {
      try {
         const response = await getAllVehicles();
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
         return response.data.vehicle;
      } catch (error) {
         return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to fetch vehicle details");
      }
   }
);
3
const vehicleSlice = createSlice({
   name: 'vehicle',
   initialState: {
      vehicles: [],
      selectedVehicle: null,
      loading: false,
      error: null,
   },
   reducers: {
      clearSelectedVehicle: (state) => {
         state.selectedVehicle = null;
      }
   },
   extraReducers: (builder) => {
      builder
         .addCase(fetchVehicles.pending, (state) => {
            state.loading = true;
            state.error = null;
         })
         .addCase(fetchVehicles.fulfilled, (state, action) => {
            state.vehicles = action.payload;
            state.loading = false;
         })
         .addCase(fetchVehicles.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = false;
         })

         .addCase(fetchVehicleDetails.pending, (state) => {
            state.loading = true;
            state.error = null;
         })
         .addCase(fetchVehicleDetails.fulfilled, (state, action) => {
            state.selectedVehicle = action.payload;
            state.loading = false;
         })
         .addCase(fetchVehicleDetails.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = false;
         });
   },
});

export const { clearSelectedVehicle } = vehicleSlice.actions;
export default vehicleSlice.reducer;
