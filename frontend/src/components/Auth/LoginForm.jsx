import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const LoginForm = () => {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [showPassword, setShowPassword] = useState(false);

   const onSubmitHandler = (e) => {
      e.preventDefault();
   };

   return (
      <div className="flex justify-center items-start min-h-screen bg-gray-100">
         <form onSubmit={onSubmitHandler} className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
            <div className="mb-4">
               <p className="text-2xl font-semibold text-center text-blue-600">Login</p>
               <hr className="my-2" />
            </div>

            <div className="mb-4">
               <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
               <input
                  id="email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  type="email"
                  placeholder="Email"
                  required
                  className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-md shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
               />
            </div>

            <div className="mb-4 relative">
               <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
               <div className="relative">
                  <input
                     id="password"
                     onChange={(e) => setPassword(e.target.value)}
                     value={password}
                     type={showPassword ? "text" : "password"}
                     placeholder="Password"
                     required
                     className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-md shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                     onClick={() => setShowPassword(!showPassword)}
                  >
                     {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                  </button>
               </div>
            </div>

            <div>
               <button
                  type="submit"
                  className="w-1/3 mb-4 py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
               >
                  Login
               </button>
            </div>
            <button className="text-sm text-blue-600 underline hover:no-underline">Forgot Password?</button>
         </form>
      </div>
   );
};

export default LoginForm;
