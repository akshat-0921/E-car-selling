
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
// import { useSendOtpMutation, useVerifyOtpMutation, useRegisterMutation } from "../../redux/api/authApi"

const SignUpForm = () => {
   const navigate = useNavigate()
   const [step, setStep] = useState(1)
   const [formData, setFormData] = useState({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      otp: "",
   })
   const [errors, setErrors] = useState({})
   const [isOtpSent, setIsOtpSent] = useState(false)
   const [isOtpVerified, setIsOtpVerified] = useState(false)

   const [sendOtp, { isLoading: isSendingOtp }] = useSendOtpMutation()
   const [verifyOtp, { isLoading: isVerifyingOtp }] = useVerifyOtpMutation()
   const [register, { isLoading: isRegistering }] = useRegisterMutation()

   const handleChange = (e) => {
      const { name, value } = e.target
      setFormData({
         ...formData,
         [name]: value,
      })

      // Clear error for this field when user types
      if (errors[name]) {
         setErrors({
            ...errors,
            [name]: "",
         })
      }
   }

   const validateForm = () => {
      const newErrors = {}

      if (step === 1) {
         if (!formData.name.trim()) newErrors.name = "Name is required"
         if (!formData.email.trim()) newErrors.email = "Email is required"
         else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid"
      } else if (step === 2) {
         if (!formData.otp.trim()) newErrors.otp = "OTP is required"
         else if (formData.otp.length !== 6) newErrors.otp = "OTP must be 6 digits"
      } else if (step === 3) {
         if (!formData.password) newErrors.password = "Password is required"
         else if (formData.password.length < 8) newErrors.password = "Password must be at least 8 characters"

         if (!formData.confirmPassword) newErrors.confirmPassword = "Please confirm your password"
         else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match"
      }

      setErrors(newErrors)
      return Object.keys(newErrors).length === 0
   }

   const handleSendOtp = async (e) => {
      e.preventDefault()

      if (!validateForm()) return

      try {
         const response = await sendOtp({ email: formData.email }).unwrap()
         if (response.success) {
            setIsOtpSent(true)
            setStep(2)
         }
      } catch (error) {
         setErrors({
            ...errors,
            general: error.data?.message || "Failed to send OTP. Please try again.",
         })
      }
   }

   const handleVerifyOtp = async (e) => {
      e.preventDefault()

      if (!validateForm()) return

      try {
         const response = await verifyOtp({
            email: formData.email,
            otp: formData.otp,
         }).unwrap()

         if (response.success) {
            setIsOtpVerified(true)
            setStep(3)
         }
      } catch (error) {
         setErrors({
            ...errors,
            otp: error.data?.message || "Invalid OTP. Please try again.",
         })
      }
   }

   const handleRegister = async (e) => {
      e.preventDefault()

      if (!validateForm()) return

      try {
         const response = await register({
            name: formData.name,
            email: formData.email,
            password: formData.password,
         }).unwrap()

         if (response.success) {
            navigate("/login")
         }
      } catch (error) {
         setErrors({
            ...errors,
            general: error.data?.message || "Registration failed. Please try again.",
         })
      }
   }

   return (
      <div className="signup-form-container">
         <h2>Create Your Account</h2>

         {errors.general && <div className="error-message">{errors.general}</div>}

         {step === 1 && (
            <form onSubmit={handleSendOtp}>
               <div className="form-group">
                  <label htmlFor="name">Full Name</label>
                  <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} />
                  {errors.name && <span className="error">{errors.name}</span>}
               </div>

               <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} />
                  {errors.email && <span className="error">{errors.email}</span>}
               </div>

               <button type="submit" className="submit-btn" disabled={isSendingOtp}>
                  {isSendingOtp ? "Sending OTP..." : "Send OTP"}
               </button>
            </form>
         )}

         {step === 2 && (
            <form onSubmit={handleVerifyOtp}>
               <div className="form-group">
                  <label htmlFor="otp">Enter OTP sent to your email</label>
                  <input type="text" id="otp" name="otp" value={formData.otp} onChange={handleChange} maxLength={6} />
                  {errors.otp && <span className="error">{errors.otp}</span>}
               </div>

               <button type="submit" className="submit-btn" disabled={isVerifyingOtp}>
                  {isVerifyingOtp ? "Verifying..." : "Verify OTP"}
               </button>

               <button type="button" className="back-btn" onClick={() => setStep(1)} disabled={isSendingOtp}>
                  Back
               </button>
            </form>
         )}

         {step === 3 && (
            <form onSubmit={handleRegister}>
               <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} />
                  {errors.password && <span className="error">{errors.password}</span>}
               </div>

               <div className="form-group">
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <input
                     type="password"
                     id="confirmPassword"
                     name="confirmPassword"
                     value={formData.confirmPassword}
                     onChange={handleChange}
                  />
                  {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
               </div>

               <button type="submit" className="submit-btn" disabled={isRegistering}>
                  {isRegistering ? "Creating Account..." : "Create Account"}
               </button>

               <button type="button" className="back-btn" onClick={() => setStep(2)} disabled={isVerifyingOtp}>
                  Back
               </button>
            </form>
         )}

         <div className="form-footer">
            <p>
               Already have an account? <Link to="/login">Login</Link>
            </p>
         </div>
      </div>
   )
}

export default SignUpForm
