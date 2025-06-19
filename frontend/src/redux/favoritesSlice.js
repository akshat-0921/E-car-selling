import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { vehicleAPI } from "../api";

export const fetchFavorites = createAsyncThunk("favorites/fetch", async (_, thunkAPI) => {
    try {
        const res = await vehicleAPI.getFavorites();
        return res.data.favorites || []; // assumes API returns { favorites: [...] }
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to fetch favorites");
    }
});

export const addFavorite = createAsyncThunk("favorites/add", async (vehicleId, thunkAPI) => {
    try {
        await vehicleAPI.addToFavorites(vehicleId);
        thunkAPI.dispatch(fetchFavorites());
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to add favorite");
    }
});

export const removeFavorite = createAsyncThunk("favorites/remove", async (vehicleId, thunkAPI) => {
    try {
        await vehicleAPI.removeFromFavorites(vehicleId);
        thunkAPI.dispatch(fetchFavorites());
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to remove favorite");
    }
});

const favoritesSlice = createSlice({
    name: "favorites",
    initialState: {
        favorites: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchFavorites.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchFavorites.fulfilled, (state, action) => {
                state.favorites = action.payload;
                state.loading = false;
            })
            .addCase(fetchFavorites.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default favoritesSlice.reducer;
