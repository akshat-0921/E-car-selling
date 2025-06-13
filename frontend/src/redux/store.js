import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import profileReducer from "./profileSlice";
import vehicleReducer from "./vehicleSlice";
import brandReducer from "./brandSlice"
import showroomReducer from './showroomSlice';

const store = configureStore({
   reducer: {
      auth: authReducer,
      profile: profileReducer,
      vehicle: vehicleReducer,
      brand: brandReducer,
      showroom: showroomReducer,
   },
});

export default store;
