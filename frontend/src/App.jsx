import React from "react"
import { RouterProvider } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import { fetchCurrentUser } from "./redux/authSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ClipLoader from "react-spinners/ClipLoader";

import router from "./router"

function App() {
   const dispatch = useDispatch();
   const { loading, isLoggedIn, error } = useSelector((state) => state.auth);

   useEffect(() => {
      dispatch(fetchCurrentUser());
   }, [dispatch]);

   if (loading) {
      return (
         <div className="flex items-center justify-center min-h-screen">
            <ClipLoader size={50} color="#2563eb" /> {/* Blue spinner */}
         </div>
      );
   }

   return (
      <>
         <RouterProvider router={router} />
         {/* <ToastContainer position="top-right" autoClose={3000} /> */}
      </>
   )
}

export default App
