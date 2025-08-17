// src/components/LoginForm.jsx

import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { login, setLoading, setError, fetchCurrentUser } from "../../redux/authSlice";
import { useNavigate } from "react-router-dom";
// --- STYLING: Icons for inputs ---
import { Mail, Lock, Eye, EyeOff, AlertCircle } from "lucide-react";

const LoginForm = () => {
   // --- LOGIC: All state and hooks are preserved ---
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const { loading, error } = useSelector((state) => state.auth);

   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [showPassword, setShowPassword] = useState(false);

   const API = import.meta.env.VITE_BACKEND_URL;

   const onSubmitHandler = async (e) => {
      e.preventDefault();
      dispatch(setLoading(true));
      dispatch(setError(null));

      try {
         const res = await axios.post(`${API}/user/login`, { email, password }, { withCredentials: true });
         dispatch(login(res.data.user));
         alert(res.data.message || "Logged In successfully");
         navigate("/");
      } catch (error) {
         dispatch(setError(error.response?.data?.message || "Login failed"));
         // The alert is preserved from your original code
         alert(error.response?.data?.message || "Failed to login");
      } finally {
         dispatch(setLoading(false));
      }
   };

   return (
      // --- STYLING: Themed form container ---
      <form onSubmit={onSubmitHandler} className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-lg space-y-6">
         <div className="text-center">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Welcome Back!</h2>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">Sign in to continue to DriveIt</p>
         </div>

         {/* --- STYLING: Themed inputs and error message --- */}
         {error && (
            <div className="p-3 rounded-md bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-500/30">
               <div className="flex items-center gap-x-2">
                  <AlertCircle className="h-5 w-5 text-red-500 dark:text-red-400" />
                  <p className="text-sm font-medium text-red-800 dark:text-red-300">{error}</p>
               </div>
            </div>
         )}

         <FormInput id="email" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} icon={Mail} />
         <FormInput id="password" type={showPassword ? "text" : "password"} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} icon={Lock} togglePassword={() => setShowPassword(!showPassword)} showPassword={showPassword} />

         <div className="text-right">
            <button type="button" className="text-sm font-medium text-blue-600 hover:text-blue-500">
               Forgot Password?
            </button>
         </div>

         {/* --- STYLING: Themed submit button --- */}
         <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center items-center rounded-md bg-blue-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-blue-700 transition-colors disabled:bg-slate-400 dark:disabled:bg-slate-700 disabled:cursor-not-allowed"
         >
            {loading ? "Logging in..." : "Login"}
         </button>
      </form>
   );
};

export default LoginForm;

// --- STYLING: Helper component for consistent inputs ---
const FormInput = ({ id, type, placeholder, value, onChange, icon: Icon, togglePassword, showPassword }) => (
   <div className="relative">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
         <Icon className="h-5 w-5 text-slate-400 dark:text-slate-500" />
      </div>
      <input
         id={id} type={type} placeholder={placeholder} required value={value} onChange={onChange}
         className="block w-full rounded-md border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800/50 py-3 pl-10 pr-4 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:focus:border-blue-400 dark:focus:ring-blue-400 text-slate-900 dark:text-white"
      />
      {togglePassword && (
         <button type="button" onClick={togglePassword} className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-500 hover:text-slate-700">
            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
         </button>
      )}
   </div>
);
