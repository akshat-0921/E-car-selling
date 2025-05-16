import { createBrowserRouter, BrowserRouter as Router, Routes, Route, RouterProvider } from "react-router-dom";
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
import SearchPage from "./pages/SearchPage";
import BrandSearchPage from "./pages/BrandSearchPage";

function App() {
   return (
      <Router>
         <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/signup" element={<SignUpForm />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/car-model" element={<CarDetailPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/brand-search" element={<BrandSearchPage />} />
         </Routes>
      </Router>
   );

   import { createBrowserRouter, BrowserRouter as Router, Route, Routes, RouterProvider } from "react-router-dom";
   import Home from "./pages/Home/Home";
   import Auth from "./components/Auth/Auth";
   import Vehicle from "./pages/Vehicle/Vehicle";
   import VehicleDetails from "./pages/VehicleDetails/VehicleDetails";
   import AppLayout from "./pages/AppLayout/AppLayout";

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
