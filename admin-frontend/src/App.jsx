import { Routes, Route } from "react-router-dom";
import AdminSignUp from "./components/AdminSignUp";
import { ToastContainer } from "react-toastify";
import AdminLogin from "./components/AdminLogin";

const App = () => {
   // const isAdmin = !!document.cookie.includes('accessToken');

   return (
      <>
         <ToastContainer position="top-right" autoClose={2500} />
         <Routes>
            <Route path="/admin/sign-up" element={<AdminSignUp />} />
            <Route path="/admin/login" element={<AdminLogin />} />
         </Routes>
      </>
   )
}

export default App;
