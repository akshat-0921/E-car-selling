import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import profileReducer from "./profileSlice";
import vehicleReducer from "./vehicleSlice";

const store = configureStore({
   reducer: {
      auth: authReducer,
      profile: profileReducer,
      vehicle: vehicleReducer,
   },
});

export default store;
