
import { createBrowserRouter, BrowserRouter as Router, Route, Routes, RouterProvider } from "react-router-dom";
import Home from "./pages/Home/Home";
import Auth from "./components/Auth/Auth";
import Vehicle from "./pages/Vehicle/Vehicle";
import VehicleDetails from "./pages/VehicleDetails/VehicleDetails";
import Navbar from "./components/Navbar/Navbar";
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

// function App() {
//    return (
//       <Router>
//          <Navbar />
//          <Routes>
//             <Route path="/" element={<Home />} />
//             <Route path="/auth" element={<Auth />}></Route>
//             <Route path="/vehicles" element={<Vehicle />}></Route>
//             <Route path="/car-details" element={<VehicleDetails />}></Route>
//          </Routes>
//       </Router>


//    );
// }

export default App;
