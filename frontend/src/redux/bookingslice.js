import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { bookingAPI } from "../api";

// (optional) still here if used elsewhere
export const createBooking = createAsyncThunk(
   "booking/createBooking",
   async ({ showroomId, vehicleId, payload }, thunkAPI) => {
      try {
         const res = await bookingAPI.createBooking(showroomId, vehicleId, payload);
         return res.data.booking;
      } catch (error) {
         return thunkAPI.rejectWithValue(error.response?.data?.msg || "Booking failed");
      }
   }
);

// ✅ Correctly call bookingAPI.getHistory()
export const fetchBookingHistory = createAsyncThunk(
   "booking/fetchHistory",
   async (_, thunkAPI) => {
      try {
         const res = await bookingAPI.getHistory();
         return res.data.bookings || [];
      } catch (error) {
         return thunkAPI.rejectWithValue(error.response?.data?.msg || "Failed to fetch booking history");
      }
   }
);

const initialState = {
   loading: false,
   error: null,
   success: false,
   booking: null,

   history: [],
   historyLoading: false,
   historyError: null,
};

const bookingSlice = createSlice({
   name: "booking",
   initialState,
   reducers: {
      clearBookingState: (state) => {
         state.loading = false;
         state.error = null;
         state.success = false;
         state.booking = null;
      },
   },
   extraReducers: (builder) => {
      builder
         .addCase(createBooking.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.success = false;
         })
         .addCase(createBooking.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.booking = action.payload;
         })
         .addCase(createBooking.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
         })

         // ✅ History cases
         .addCase(fetchBookingHistory.pending, (state) => {
            state.historyLoading = true;
            state.historyError = null;
         })
         .addCase(fetchBookingHistory.fulfilled, (state, action) => {
            state.historyLoading = false;
            state.history = action.payload;
         })
         .addCase(fetchBookingHistory.rejected, (state, action) => {
            state.historyLoading = false;
            state.historyError = action.payload;
         });
   },
});

export const { clearBookingState } = bookingSlice.actions;
export default bookingSlice.reducer;
