import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import profileReducer from "./profileSlice";
import vehicleReducer from "./vehicleSlice";
import brandReducer from "./brandSlice";
import showroomReducer from "./showroomSlice";
import favoritesReducer from "./favoritesSlice";
import bookingReducer from "./bookingSlice";

const store = configureStore({
   reducer: {
      auth: authReducer,
      profile: profileReducer,
      vehicle: vehicleReducer,
      brand: brandReducer,
      showroom: showroomReducer,
      favorites: favoritesReducer,
      booking: bookingReducer,
   },
});

export default store;
