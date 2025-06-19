import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { bookingAPI } from "../api";

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

const bookingSlice = createSlice({
    name: "booking",
    initialState: {
        loading: false,
        error: null,
        success: false,
        booking: null,
    },
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
            });
    },
});

export const { clearBookingState } = bookingSlice.actions;
export default bookingSlice.reducer;
