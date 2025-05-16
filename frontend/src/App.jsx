import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./pages/AppLayout/AppLayout";
import Home from "./pages/Home/Home";
import Auth from "./components/Auth/Auth";
import Vehicle from "./pages/Vehicle/Vehicle";
import VehicleDetails from "./pages/VehicleDetails/VehicleDetails";
import SearchPage from "./pages/SearchPage";
import BrandSearchPage from "./pages/BrandSearchPage";

// If you have LoginForm, SignUpForm, CarDetailPage components, import them as needed
import LoginForm from "./components/Auth/LoginForm";
import SignUpForm from "./components/Auth/SignUpForm";
import CarDetailPage from "./pages/CarDetailPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />, // layout with navbar/footer
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
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
