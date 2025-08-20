// In src/redux/bookingSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// Assuming you have an `api/index.js` that exports a configured `bookingAPI` object
import { bookingAPI } from "../api";

// This thunk is for creating a new booking (e.g., for test drives or other types)
export const createBooking = createAsyncThunk(
    "booking/createBooking",
    async ({ showroomId, vehicleId, payload }, thunkAPI) => {
        try {
            const response = await bookingAPI.createBooking(showroomId, vehicleId, payload);
            return response.data.booking;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data?.msg || "Booking failed");
        }
    }
);

// NEW: This thunk fetches the booking history for the logged-in user
export const fetchBookingHistory = createAsyncThunk(
    "booking/fetchHistory",
    async (_, thunkAPI) => {
        try {
            // This corresponds to the GET /api/booking/history route we created
            const response = await bookingAPI.getHistory();
            return response.data.bookings;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data?.msg || "Failed to fetch booking history");
        }
    }
);

const initialState = {
    // State for creating a single booking
    loading: false,
    error: null,
    success: false,
    booking: null,
    // NEW: Separate state for the booking history list
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
            // Cases for createBooking
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

            // NEW: Cases for fetchBookingHistory
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
