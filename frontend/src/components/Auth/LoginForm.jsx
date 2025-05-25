import { useState, useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { login, setLoading, setError } from "../../redux/authSlice";

const LoginForm = () => {
   const dispatch = useDispatch();
   const { loading, error, user } = useSelector((state) => state.auth);

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
      } catch (error) {
         dispatch(setError(error.response?.data?.message || "Login failed"));
         alert(error.response?.data?.message || "Failed to login");
      } finally {
         dispatch(setLoading(false));
      }
   };

   // useEffect(() => {
   //    if (user) console.log("User from Redux store changed:", user);
   // }, [user]);

   return (
      <form onSubmit={onSubmitHandler} className="bg-white p-6 rounded-md shadow-md max-w-md mx-auto">
         <h2 className="text-xl font-semibold text-center text-blue-600 mb-4">Login</h2>

         {error && <div className="mb-3 text-red-500 text-sm">{error}</div>}

         <div className="mb-3">
            <input
               type="email"
               placeholder="Email"
               required
               value={email}
               onChange={(e) => setEmail(e.target.value)}
               className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
         </div>

         <div className="mb-3 relative">
            <input
               type={showPassword ? "text" : "password"}
               placeholder="Password"
               required
               value={password}
               onChange={(e) => setPassword(e.target.value)}
               className="w-full px-3 py-2 border border-gray-300 rounded pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
               type="button"
               className="absolute right-3 top-2 text-gray-500 hover:text-gray-700"
               onClick={() => setShowPassword(!showPassword)}
               tabIndex={-1}
            >
               {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
            </button>
         </div>

         <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 mb-3 text-white rounded font-semibold transition ${loading ? "bg-blue-300 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
               }`}
         >
            {loading ? "Logging in..." : "Login"}
         </button>

         <button className="text-sm text-blue-600 underline hover:no-underline" type="button">
            Forgot Password?
         </button>
      </form>
   );
};

export default LoginForm
