// src/App.jsx

import React, { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrentUser } from "./redux/authSlice";
import router from "./router";

// --- STYLING: Themed icon for the initial app loader ---
import { Loader } from "lucide-react";

// --- STYLING: A dedicated component for the full-page initial loading screen ---
const AppLoader = () => (
   <div className="flex flex-col items-center justify-center min-h-screen bg-white dark:bg-slate-900">
      <Loader className="h-12 w-12 text-blue-500 animate-spin" />
      <p className="mt-4 text-lg font-medium text-slate-700 dark:text-slate-300">
         Loading Your Experience...
      </p>
   </div>
);

function App() {
   // --- LOGIC: All Redux and effect logic is preserved ---
   const dispatch = useDispatch();
   const { loading } = useSelector((state) => state.auth);

   useEffect(() => {
      dispatch(fetchCurrentUser());
   }, [dispatch]);

   // --- STYLING: The loading state now uses the themed AppLoader ---
   if (loading) {
      return <AppLoader />;
   }

   // --- LOGIC: The main app rendering is preserved ---
   return (
      <>
         <RouterProvider router={router} />
         {/* --- STYLING: ToastContainer is now theme-aware --- */}
         <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="auto" // Automatically switches between light and dark
         />
      </>
   );
}

export default App;
