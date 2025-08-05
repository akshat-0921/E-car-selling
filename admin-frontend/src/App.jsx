import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAdminLogin, setAdminLogout } from "./slices/adminSlice";
import axiosInstance from "./api/axiosInstance";

import AdminSignUp from "./components/AdminSignUp";
import { ToastContainer } from "react-toastify";
import AdminLogin from "./components/AdminLogin";
import AdminHome from "./pages/AdminHome";
import AdminNavbar from "./components/AdminNavbar";
import BrandList from "./pages/Brand/BrandList";
import AddBrand from "./pages/Brand/BrandForm";
import VehicleList from "./pages/Vehicle/LoadVehicle";
import AddVehicle from "./pages/Vehicle/AddVehicle";
import ShowroomList from "./pages/Showroom/ShowroomList";
import AddShowroom from "./pages/Showroom/AddShowroom";
import ShowroomDetail from "./pages/Showroom/ShowroomDetail";

const App = () => {
   const dispatch = useDispatch();
   const isLoggedIn = useSelector((state) => state.admin.isLoggedIn);

   useEffect(() => {
      const tryRefresh = async () => {
         try {
            const res = await axiosInstance.post("/admin/refresh-token");
            dispatch(setAdminLogin({
               admin: res.data.admin,
               accessToken: res.data.accessToken,
            }));
         } catch (err) {
            dispatch(setAdminLogout());
         }
      };
      tryRefresh();
   }, [dispatch]);

   return (
      <>
         {/* <ToastContainer position="top-right" autoClose={2500} /> */}
         <AdminNavbar />
         <Routes>
            {/* Public routes */}
            <Route path="/admin/sign-up" element={<AdminSignUp />} />
            <Route path="/admin/login" element={<AdminLogin />} />

            {/* Always render home (it will show message if not logged in) */}
            <Route path="/" element={<AdminHome />} />

            {/* Protected routes */}
            {isLoggedIn && (
               <>
                  <Route path="/admin/brands" element={<BrandList />} />
                  <Route path="/admin/brand/add" element={<AddBrand />} />
                  <Route path="/admin/brand/:brandId/vehicles" element={<VehicleList />} />
                  <Route path="/admin/brand/:brandId/add-vehicle" element={<AddVehicle />} />
                  <Route path="/admin/showrooms" element={<ShowroomList />} />
                  <Route path="/admin/showrooms/add" element={<AddShowroom />} />
                  <Route path="/admin/showrooms/:showroomId" element={<ShowroomDetail />} />
               </>
            )}
         </Routes>
      </>
   );
};

export default App;
