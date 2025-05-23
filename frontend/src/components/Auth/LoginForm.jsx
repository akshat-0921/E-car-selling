import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "../../redux/authSlice";

const LoginForm = () => {
   const dispatch = useDispatch();

   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [showPassword, setShowPassword] = useState(false);

   const API = import.meta.env.VITE_BACKEND_URL;

   const onSubmitHandler = async (e) => {
      e.preventDefault();
      try {
         const res = await axios.post(`${API}/user/login`, { email, password }, { withCredentials: true })
         dispatch(login(res.data.user))
         console.log(res.data)
         alert(res.data.message || "Logged In successfully")
      } catch (error) {
         alert(error.response?.data?.message || "Failed to login")
      }
   };

   return (
      <form onSubmit={onSubmitHandler} className="bg-white p-6 rounded-md shadow-md max-w-md mx-auto">
         <h2 className="text-xl font-semibold text-center text-blue-600 mb-4">Login</h2>

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
            className="w-full py-2 mb-3 bg-blue-600 text-white rounded font-semibold hover:bg-blue-700 transition"
         >

            Login
         </button>

         <button className="text-sm text-blue-600 underline hover:no-underline" type="button">
            Forgot Password?
         </button>
      </form>
   );
};

export default LoginForm
