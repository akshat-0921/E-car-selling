import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

import authReducer from "./authSlice";
import profileReducer from "./profileSlice";
import vehicleReducer from "./vehicleSlice";
import brandReducer from "./brandSlice";
import showroomReducer from "./showroomSlice";
import favoritesReducer from "./favoritesSlice";
import bookingReducer from "./bookingSlice";

const authPersistConfig = {
   key: "auth",
   storage,
   whitelist: ["isLoggedIn", "user"], // persist only what you need
};

const rootReducer = combineReducers({
   auth: persistReducer(authPersistConfig, authReducer),
   profile: profileReducer,
   vehicle: vehicleReducer,
   brand: brandReducer,
   showroom: showroomReducer,
   favorites: favoritesReducer,
   booking: bookingReducer,
});

const store = configureStore({
   reducer: rootReducer,
   middleware: (getDefault) =>
      getDefault({
         serializableCheck: false, // redux-persist writes non-serializable values
      }),
});

export const persistor = persistStore(store);
export default store;


// import { configureStore } from "@reduxjs/toolkit";
// import authReducer from "./authSlice";
// import profileReducer from "./profileSlice";
// import vehicleReducer from "./vehicleSlice";
// import brandReducer from "./brandSlice";
// import showroomReducer from "./showroomSlice";
// import favoritesReducer from "./favoritesSlice";
// import bookingReducer from "./bookingSlice";

// const store = configureStore({
//    reducer: {
//       auth: authReducer,
//       profile: profileReducer,
//       vehicle: vehicleReducer,
//       brand: brandReducer,
//       showroom: showroomReducer,
//       favorites: favoritesReducer,
//       booking: bookingReducer,
//    },
// });

// export default store;
