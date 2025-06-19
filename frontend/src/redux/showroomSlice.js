import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { showroomAPI } from '../api';

export const fetchAllShowrooms = createAsyncThunk(
    'showroom/fetchAll',
    async (_, thunkAPI) => {
        try {
            const response = await showroomAPI.getAllShowrooms();
            return response.data.showrooms;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to fetch showrooms");
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
                state.showrooms = action.payload;
                state.loading = false;
            })
            .addCase(fetchAllShowrooms.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default showroomSlice.reducer;


// lukas build- tough boots, war axe, hunter strike, thunderbelt, dominance ice and queen wings
