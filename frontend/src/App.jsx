
import { createBrowserRouter, BrowserRouter as Router, Route, Routes, RouterProvider } from "react-router-dom";
import Home from "./pages/Home/Home";
import Auth from "./components/Auth/Auth";
import Vehicle from "./pages/Vehicle/Vehicle";
import VehicleDetails from "./pages/VehicleDetails/VehicleDetails";
import AppLayout from "./pages/AppLayout/AppLayout";
import Profile from "./pages/Profile/Profile";

const router = createBrowserRouter([
   {
      path: "/",
      element: < AppLayout />,
      children: [
         {
            path: "/",
            element: <Home />
         },
         {
            path: "/profile",
            element: <Profile />
         },
         {
            path: "/auth",
            element: <Auth />
         },
         {
            path: "/vehicles",
            element: <Vehicle />
         },
         {
            path: "/vehicles/:vehicleId",
            element: <VehicleDetails />
         },
      ]
   }
])

function App() {
   return <RouterProvider router={router} />
}

export default App;
