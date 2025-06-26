import { Routes, Route } from "react-router-dom";
import AdminSignUp from "./components/AdminSignUp";
import { ToastContainer } from "react-toastify";
import AdminLogin from "./components/AdminLogin";
import AdminHome from "./pages/AdminHome";
import AdminNavbar from "./components/AdminNavbar";

const App = () => {
   // const isAdmin = !!document.cookie.includes('accessToken');

   return (
      <>
         <ToastContainer position="top-right" autoClose={2500} />
         <AdminNavbar />
         <Routes>
            <Route path="/" element={<AdminHome />} />
            <Route path="/admin/sign-up" element={<AdminSignUp />} />
            <Route path="/admin/login" element={<AdminLogin />} />
         </Routes>
      </>
   )
}

export default App;
