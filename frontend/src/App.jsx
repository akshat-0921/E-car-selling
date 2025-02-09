
import { createBrowserRouter, BrowserRouter as Router, Route, Routes, RouterProvider } from "react-router-dom";
import Home from "./pages/Home/Home";
import Auth from "./components/Auth/Auth";
<<<<<<< HEAD
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
=======
import CarDetailPage from "./pages/CarDetailPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignUpForm />}></Route>
        <Route path="/auth" element={<Auth />}></Route>
        <Route path="/car-model" element={<CarDetailPage />} />
      </Routes>
    </Router>
  );
>>>>>>> 0649243768202d59cebbf83434226c942a48b926
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
