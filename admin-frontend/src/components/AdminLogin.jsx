import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import axiosInstance from "../api/axiosInstance";
import { setAdminLogin } from "../slices/adminSlice";

const AdminLogin = () => {

   const dispatch = useDispatch();

   const [form, setForm] = useState({
      email: "",
      password: "",
      // secret: "" // uncomment if required on login as well
   });

   const [loading, setLoading] = useState(false);
   const navigate = useNavigate();
   const API = import.meta.env.VITE_BACKEND_URL;

   const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      try {
         const res = await axiosInstance.post("/admin/login", form);
         toast.success("Login successful")

         dispatch(setAdminLogin({
            admin: res.data.admin,
            accessToken: res.data.tokens?.accessToken,
         }));
         navigate("/"); // or wherever your admin dashboard is

         // navigate("/admin/brands");
      } catch (err) {
         toast.error(err.response?.data?.message || "Login failed");
      }
      setLoading(false);
   };

   return (
      <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white rounded shadow space-y-4">
         <h2 className="text-xl font-bold mb-3">Admin Login</h2>
         <input placeholder="Email" type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} required className="w-full p-2 border rounded" />
         <input placeholder="Password" type="password" value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))} required className="w-full p-2 border rounded" />
         {/* <input placeholder="Admin Secret" value={form.secret} onChange={e => setForm(f => ({ ...f, secret: e.target.value }))} required className="w-full p-2 border rounded" /> */}
         <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
         </button>
      </form>
   );
};

export default AdminLogin;
