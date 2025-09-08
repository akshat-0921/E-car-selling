import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import AppLayout from "./pages/AppLayout/AppLayout";
import Home from "./pages/Home/Home";
import Auth from "./components/Auth/Auth";
import LoginForm from "./components/Auth/LoginForm";
import SignUpForm from "./components/Auth/SignUpForm";
import Vehicle from "./pages/Vehicle/Vehicle";
import VehicleDetails from "./pages/VehicleDetails/VehicleDetails";
import CarDetailPage from "./pages/CarDetailPage/CarDetailPage";
import SearchPage from "./pages/SearchPage/SearchPage";
import BrandSearchPage from "./pages/BrandSearchPage/BrandSearchPage";
import ShowroomPage from "./pages/Showroom/showRoom";
import CarModelSelectionPage from "./pages/CarModelSelection/carlist";
import TestDriveBookingPage from "./pages/TestDrive/testDrive";
import Profile from "./pages/Profile/Profile";
import SettingsPage from "./pages/Settings/Settings";
import ShowBrands from "./pages/Brands/Brands";
import BrandDetails from "./pages/Brands/BrandDetails";
// import BrandCard from "./components/brandCard/Brandcard";
import Favorites from "./pages/Favorites/Favorites";
import BookingHistoryPage from "./pages/BookingHistory/bookingHistoryPage";

import PaymentPage from "./pages/payment/PaymentPage";

const router = createBrowserRouter([
   {
      path: "/",
      element: <AppLayout />,
      children: [
         { index: true, element: <Home /> },
         { path: "auth", element: <Auth /> },
         { path: "login", element: <LoginForm /> },
         { path: "signup", element: <SignUpForm /> },
         { path: "vehicles", element: <Vehicle /> },
         { path: "vehicles/:vehicleId", element: <VehicleDetails /> },
         { path: "brands/:brandId", element: <BrandDetails /> },
         { path: "car-model", element: <CarDetailPage /> },
         { path: "search", element: <SearchPage /> },
         { path: "brand-search", element: <BrandSearchPage /> },
         { path: "brands", element: <ShowBrands /> },
         { path: "showrooms", element: <ShowroomPage /> },
         { path: "Car-Model-Selection", element: <CarModelSelectionPage /> },
         { path: "Test-Drive", element: <TestDriveBookingPage /> },
         { path: "profile", element: <Profile /> },
         { path: "settings", element: <SettingsPage /> },
         { path: "favorites", element: <Favorites /> },
         { path: "payment", element: <PaymentPage /> },
         { path: "bookings/history", element: <BookingHistoryPage /> },

         // ♻️ Backward compatibility: redirect old path to new
         { path: "booking-history", element: <Navigate to="/bookings/history" replace /> },
      ],
   },
]);


export default router
