
import { useState } from "react"
import { FaEye, FaEyeSlash } from "react-icons/fa"
import { toast } from "react-toastify"
import { authAPI } from "../../api"

const SignUpForm = () => {
   const [firstName, setFirstName] = useState("")
   const [lastName, setLastName] = useState("")
   const [email, setEmail] = useState("")
   const [password, setPassword] = useState("")
   const [showPassword, setShowPassword] = useState(false)
   const [otp, setOtp] = useState("")
   const [otpSent, setOtpSent] = useState(false)
   const [verified, setVerified] = useState(false)
   const [loading, setLoading] = useState(false)

   // Send OTP to user's email
   const sendOtpHandler = async () => {
      if (!email) {
         toast.error("Please enter your email to receive OTP!")
         return
      }

      try {
         setLoading(true)
         const response = await authAPI.sendOtp(email)
         if (response.data.success) {
            setOtpSent(true)
            toast.success("OTP sent to your email!")
         } else {
            toast.error(response.data.message || "Failed to send OTP")
         }
      } catch (error) {
         console.error("Error sending OTP:", error)
         toast.error(error.response?.data?.message || "Failed to send OTP")
      } finally {
         setLoading(false)
      }
   }

   // Verify OTP
   const verifyOtpHandler = async () => {
      if (!otp) {
         toast.error("Please enter the OTP")
         return
      }

      try {
         setLoading(true)
         const response = await authAPI.verifyOtp({ email, otp })
         if (response.data.success) {
            setVerified(true)
            toast.success("OTP Verified!")
         } else {
            toast.error(response.data.message || "Invalid OTP, please try again.")
         }
      } catch (error) {
         console.error("Error verifying OTP:", error)
         toast.error(error.response?.data?.message || "Invalid OTP, please try again.")
      } finally {
         setLoading(false)
      }
   }

   // Submit signup form
   const submitHandler = async (e) => {
      e.preventDefault()
      if (!verified) {
         toast.error("Please verify your OTP first!")
         return
      }

      try {
         setLoading(true)
         const userData = { firstName, lastName, email, password }
         const response = await authAPI.signup(userData)
         if (response.data.success) {
            toast.success("Registration successful! Please login.")
            // Redirect to login page or handle as needed
         } else {
            toast.error(response.data.message || "Registration failed")
         }
      } catch (error) {
         console.error("Error during signup:", error)
         toast.error(error.response?.data?.message || "Registration failed")
      } finally {
         setLoading(false)
      }
   }

   return (
      <div className="flex justify-center items-start min-h-screen bg-gray-100">
         <form onSubmit={submitHandler} className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
            <div className="mb-4">
               <p className="text-2xl font-semibold text-center text-blue-600">Sign Up</p>
               <hr className="my-2" />
            </div>

            <div className="mb-4">
               <label className="block text-sm font-medium text-gray-700">First Name:</label>
               <input
                  onChange={(e) => setFirstName(e.target.value)}
                  value={firstName}
                  type="text"
                  placeholder="First Name"
                  required
                  className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
               />
            </div>

            <div className="mb-4">
               <label className="block text-sm font-medium text-gray-700">Last Name:</label>
               <input
                  onChange={(e) => setLastName(e.target.value)}
                  value={lastName}
                  type="text"
                  placeholder="Last Name"
                  required
                  className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
               />
            </div>

            <div className="mb-4">
               <label className="block text-sm font-medium text-gray-700">Email:</label>
               <input
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  type="email"
                  placeholder="Email"
                  required
                  className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
               />
            </div>

            <div className="mb-4 relative">
               <label className="block text-sm font-medium text-gray-700">Password</label>
               <div className="relative">
                  <input
                     onChange={(e) => setPassword(e.target.value)}
                     value={password}
                     type={showPassword ? "text" : "password"}
                     placeholder="Password"
                     required
                     className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                  />
                  <button
                     type="button"
                     className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                     onClick={() => setShowPassword(!showPassword)}
                  >
                     {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                  </button>
               </div>
            </div>

            {!otpSent ? (
               <button
                  type="button"
                  onClick={sendOtpHandler}
                  disabled={loading}
                  className="w-1/3 py-2 bg-green-500 text-white font-semibold rounded-md shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 mb-4 disabled:bg-gray-400 disabled:cursor-not-allowed"
               >
                  {loading ? "Sending..." : "Send OTP"}
               </button>
            ) : (
               <>
                  <div className="mb-4">
                     <label className="block text-sm font-medium text-gray-700">Enter OTP:</label>
                     <input
                        onChange={(e) => setOtp(e.target.value)}
                        value={otp}
                        type="text"
                        placeholder="Enter OTP"
                        required
                        className="w-1/3 mt-2 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                     />
                  </div>

                  <button
                     type="button"
                     onClick={verifyOtpHandler}
                     disabled={loading}
                     className="w-1/3 py-2 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4 disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                     {loading ? "Verifying..." : "Verify OTP"}
                  </button>
               </>
            )}
            <div>
               <button
                  type="submit"
                  disabled={!verified || loading}
                  className={`w-1/3 py-2 text-white font-semibold rounded-md shadow-md focus:outline-none focus:ring-2 ${verified ? "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500" : "bg-gray-400 cursor-not-allowed"
                     } disabled:bg-gray-400 disabled:cursor-not-allowed`}
               >
                  {loading ? "Signing Up..." : "Sign Up"}
               </button>
            </div>
         </form>
      </div>
   )
}

export default SignUpForm
