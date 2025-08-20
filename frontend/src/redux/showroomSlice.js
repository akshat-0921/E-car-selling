// src/redux/showroomSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { showroomAPI } from '../api';

export const fetchAllShowrooms = createAsyncThunk(
    'showroom/fetchAll',
    async (_, { rejectWithValue }) => {
        try {
            const response = await showroomAPI.getAllShowrooms();
            // Ensure the backend response has the expected structure
            if (response.data && response.data.success) {
                return response.data.showrooms;
            }
            // If the structure is wrong, reject it
            return rejectWithValue('Invalid response structure from server.');
        } catch (error) {
            // Log the detailed error for debugging
            console.error("Error fetching showrooms:", error.response?.data || error.message);
            return rejectWithValue(error.response?.data?.message || "Failed to fetch showrooms");
        }
    }
);

const showroomSlice = createSlice({
    name: 'showroom',
    initialState: {
        showrooms: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllShowrooms.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllShowrooms.fulfilled, (state, action) => {
                state.loading = false;
                state.showrooms = action.payload;
            })
            .addCase(fetchAllShowrooms.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default showroomSlice.reducer;
