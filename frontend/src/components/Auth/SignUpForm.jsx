import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const SignUpForm = () => {
   const [firstName, setFirstName] = useState("");
   const [lastName, setLastName] = useState("");
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [showPassword, setShowPassword] = useState(false);
   const [otp, setOtp] = useState("");
   const [otpSent, setOtpSent] = useState(false);
   const [phoneNumber, setPhoneNumber] = useState("");
   const navigate = useNavigate();

   const API = import.meta.env.VITE_BACKEND_URL;

   const sendOtpHandler = async () => {
      if (!email) return alert("Please enter your email to receive OTP!");
      try {
         const res = await axios.post(`${API}/user/send-otp`, { email });
         alert("OTP sent to your email!");
         setOtpSent(true);
      } catch (error) {
         console.log(error);
         alert(error.response?.data?.message || "Failed to send OTP");
      }
   };

   const submitHandler = async (e) => {
      e.preventDefault();

      if (!otpSent) {
         alert("Please send OTP to your email first!");
         return;
      }

      if (!otp || otp.length !== 6) {
         alert("Please enter a valid 6 digit OTP");
         return;
      }

      try {
         const res = await axios.post(`${API}/user/register`, {
            firstName,
            lastName,
            email,
            phoneNumber,
            password,
            otp,
         });

         alert(res.data.message || "Registered successfully!");
         navigate("/login");
      } catch (error) {
         alert(error.response?.data?.message || "Registration failed");
      }
   };

   return (
      <form
         onSubmit={submitHandler}
         className="bg-white p-8 rounded-2xl shadow-lg max-w-md mx-auto mt-10"
      >
         <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">Sign Up</h2>

         <div className="flex flex-col sm:flex-row gap-4 mb-4">
            <input
               type="text"
               placeholder="First Name"
               required
               value={firstName}
               onChange={(e) => setFirstName(e.target.value)}
               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
               type="text"
               placeholder="Last Name"
               required
               value={lastName}
               onChange={(e) => setLastName(e.target.value)}
               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
         </div>

         <div className="mb-4">
            <input
               type="email"
               placeholder="Email"
               required
               value={email}
               onChange={(e) => setEmail(e.target.value)}
               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
         </div>

         <div className="mb-4">
            <input
               type="text"
               placeholder="Phone Number"
               required
               value={phoneNumber}
               onChange={(e) => setPhoneNumber(e.target.value)}
               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
         </div>

         <div className="mb-4 relative">
            <input
               type={showPassword ? "text" : "password"}
               placeholder="Password"
               required
               value={password}
               onChange={(e) => setPassword(e.target.value)}
               className="w-full px-4 py-2 border border-gray-300 rounded-lg pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
               type="button"
               className="absolute right-4 top-2.5 text-gray-500 hover:text-gray-700"
               onClick={() => setShowPassword(!showPassword)}
               tabIndex={-1}
            >
               {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
            </button>
         </div>

         {!otpSent ? (
            <button
               type="button"
               onClick={sendOtpHandler}
               className="w-full py-2 mb-4 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition"
            >
               Send OTP
            </button>
         ) : (
            <div className="mb-4">
               <input
                  type="text"
                  placeholder="Enter OTP"
                  required
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
               />
            </div>
         )}

         <button
            type="submit"
            className={`w-full py-2 font-semibold rounded-lg shadow text-white transition ${otpSent ? "bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500" : "bg-gray-400 cursor-not-allowed"}`}
            disabled={!otpSent}
         >
            Sign Up
         </button>
      </form>
   );
};

export default SignUpForm;
