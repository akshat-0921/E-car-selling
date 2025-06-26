// src/pages/AdminHome.jsx
import { useSelector } from "react-redux";

const AdminHome = () => {
   const { isLoggedIn, admin } = useSelector((s) => s.admin);
   return (
      <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow text-center">
         <h1 className="text-3xl font-bold mb-4">Welcome to the Admin Panel</h1>
         {isLoggedIn ? (
            <p className="text-lg">Hello, <b>{admin?.firstName || "Admin"}</b>! You are logged in.</p>
         ) : (
            <p className="text-lg">Please log in to access admin features.</p>
         )}
      </div>
   );
};

export default AdminHome;
