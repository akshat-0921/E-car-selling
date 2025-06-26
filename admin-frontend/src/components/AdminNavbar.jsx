import { useSelector, useDispatch } from "react-redux";
import { setAdminLogout } from "../slices/adminSlice";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const AdminNavbar = () => {
   const { isLoggedIn, admin } = useSelector((state) => state.admin);
   const dispatch = useDispatch();
   const navigate = useNavigate();


   const API = import.meta.env.VITE_BACKEND_URL;

   const handleLogout = async () => {
      // Optionally call logout API here
      await axios.post(`${API}/admin/logout`)
      dispatch(setAdminLogout());
      toast.success("Logged out!");
      navigate("/admin/login");
   };

   return (
      <nav className="flex items-center justify-between px-6 py-3 bg-gray-900 text-white">
         <div>
            <Link to="/admin" className="font-bold text-lg">Admin Panel</Link>
         </div>
         <div className="flex items-center space-x-4">
            {isLoggedIn ? (
               <>
                  <span>Welcome, {admin?.firstName || "Admin"}</span>
                  <button onClick={handleLogout} className="bg-red-500 px-3 py-1 rounded hover:bg-red-700">
                     Logout
                  </button>
               </>
            ) : (
               <>
                  <Link to="/admin/login" className="bg-blue-500 px-3 py-1 rounded hover:bg-blue-700">Login</Link>
                  <Link to="/admin/sign-up" className="bg-green-500 px-3 py-1 rounded hover:bg-green-700">Sign Up</Link>
               </>
            )}
         </div>
      </nav>
   );
};

export default AdminNavbar;
