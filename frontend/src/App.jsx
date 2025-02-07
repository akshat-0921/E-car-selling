
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Auth from "./components/Auth/Auth";
import Filter from "./components/filter/Filter";
import Vehicle from "./pages/Vehicle/Vehicle";
import VehicleDetails from "./pages/VehicleDetails/VehicleDetails";
import Navbar from "./components/Navbar/Navbar";

function App() {
   return (
      <Router>
         <Navbar />
         <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<Auth />}></Route>
            <Route path="/filter" element={<Filter />}></Route>
            <Route path="/cars" element={<Vehicle />}></Route>
            <Route path="/car-details" element={<VehicleDetails />}></Route>
         </Routes>
      </Router>
   );
}

export default App;
