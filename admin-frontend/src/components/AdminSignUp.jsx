import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";

const AdminSignUp = () => {
   const navigate = useNavigate();

   const [form, setForm] = useState({
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      secret: "",
      password: "",
   });

   const [loading, setLoading] = useState(false);

   const API = import.meta.env.VITE_BACKEND_URL;

   const onChange = (e) => {
      setForm((prev) => ({
         ...prev,
         [e.target.name]: e.target.value
      }));
   };


   const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      try {
         await axiosInstance.post("/admin/register", form);
         toast.success("Admin account created! Please login.");
         navigate("/admin/login");
      } catch (err) {
         toast.error(err?.response?.data?.message || "Signup failed. Try again.");
      }
      setLoading(false);
   };

   return (
      <form
         onSubmit={handleSubmit}
         className="mt-10 max-w-md mx-auto p-6 bg-white rounded shadow space-y-4"
      >
         <h2 className="text-xl font-bold mb-3">Admin Sign Up</h2>
         <input
            name="firstName"
            placeholder="First Name"
            value={form.firstName}
            onChange={onChange}
            required
            className="w-full p-2 border rounded"
         />
         <input
            name="lastName"
            placeholder="Last Name"
            value={form.lastName}
            onChange={onChange}
            required
            className="w-full p-2 border rounded"
         />
         <input
            name="email"
            placeholder="Email"
            type="email"
            value={form.email}
            onChange={onChange}
            required
            className="w-full p-2 border rounded"
         />
         <input
            name="phoneNumber"
            placeholder="Phone Number"
            value={form.phoneNumber}
            onChange={onChange}
            required
            className="w-full p-2 border rounded"
         />
         <input
            name="password"
            placeholder="Password"
            type="password"
            value={form.password}
            onChange={onChange}
            required
            className="w-full p-2 border rounded"
         />
         <input
            name="secret"
            placeholder="Admin Secret"
            value={form.secret}
            onChange={onChange}
            required
            className="w-full p-2 border rounded"
         />

         <button
            type="submit"
            className="w-full bg-green-600 text-white p-2 rounded"
            disabled={loading}
         >
            {loading ? "Signing up..." : "Sign Up"}
         </button>
      </form>
   );
};

export default AdminSignUp;
