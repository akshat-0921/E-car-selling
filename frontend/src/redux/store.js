import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import profileReducer from "./profileSlice";
import vehicleReducer from "./vehicleSlice";
import brandReducer from "./brandSlice"

const store = configureStore({
   reducer: {
      auth: authReducer,
      profile: profileReducer,
      vehicle: vehicleReducer,
      brand: brandReducer,
   },
});

export default store;
