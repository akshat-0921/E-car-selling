import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

import AppLayout from "./pages/AppLayout/AppLayout"
import Home from "./pages/Home/Home"
import Auth from "./components/Auth/Auth"
import LoginForm from "./components/Auth/LoginForm"
import SignUpForm from "./components/Auth/SignUpForm"
import Vehicle from "./pages/Vehicle/Vehicle"
import VehicleDetails from "./pages/VehicleDetails/VehicleDetails"
import CarDetailPage from "./pages/CarDetailPage/CarDetailPage"
import SearchPage from "./pages/SearchPage/SearchPage"
import BrandSearchPage from "./pages/BrandSearchPage/BrandSearchPage"
import ShowroomPage from "./pages/Showroom/showRoom"
import CarModelSelectionPage from "./pages/CarModelSelection/carlist"
import TestDriveBookingPage from "./pages/TestDrive/testDrive"
import Profile from "./pages/Profile/Profile"

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
         { path: "car-model", element: <CarDetailPage /> },
         { path: "search", element: <SearchPage /> },
         { path: "brand-search", element: <BrandSearchPage /> },
         { path: "showrooms", element: <ShowroomPage /> },
         { path: "Car-Model-Selection", element: <CarModelSelectionPage /> },
         { path: "Test-Drive", element: <TestDriveBookingPage /> },
         { path: "profile", element: <Profile /> },
         { path: "settings", element: <SettingsPage /> }
      ],
   },
])

function App() {
   return (
      <AuthProvider>
         <VehicleProvider>
            <RouterProvider router={router} />
            <ToastContainer position="top-right" autoClose={3000} />
         </VehicleProvider>
      </AuthProvider>
   )
}

export default App
