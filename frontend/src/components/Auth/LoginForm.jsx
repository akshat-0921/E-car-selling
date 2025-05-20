import { useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
// import { useLoginMutation } from "../../redux/api/authApi"
// import { useSelector, useDispatch } from "react-redux"
// import { selectIsAuthenticated, selectAuthLoading, selectAuthError, setError } from "../../redux/slices/authSlice"
// import { useForm } from "../../hooks/formValidator" 
// import { validateLoginForm } from "../../utils/validators"

const LoginForm = () => {
   const navigate = useNavigate()
   const dispatch = useDispatch()
   const isAuthenticated = useSelector(selectIsAuthenticated)
   const isLoading = useSelector(selectAuthLoading)
   const error = useSelector(selectAuthError)

   const [login] = useLoginMutation()

   // Initialize form with validation
   const { values, errors, touched, handleChange, handleBlur, validateForm } = useForm(
      { email: "", password: "" },
      validateLoginForm,
   )

   // Redirect if already authenticated
   useEffect(() => {
      if (isAuthenticated) {
         navigate("/")
      }
   }, [isAuthenticated, navigate])

   // Handle form submission
   const handleSubmit = async (e) => {
      e.preventDefault()

      // Validate form before submission
      if (!validateForm()) return

      try {
         await login(values).unwrap()
         navigate("/")
      } catch (err) {
         console.error("Login failed:", err)
      }
   }

   // Clear error
   const clearError = () => {
      dispatch(setError(null))
   }

   return (
      <div className="login-form-container">
         <h2>Login to Your Account</h2>

         {error && (
            <div className="error-message">
               {error}
               <button onClick={clearError} className="close-btn">
                  ×
               </button>
            </div>
         )}

         <form onSubmit={handleSubmit}>
            <div className={`form-group ${errors.email && touched.email ? "has-error" : ""}`}>
               <label htmlFor="email">Email</label>
               <input
                  type="email"
                  id="email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
               />
               {errors.email && touched.email && <div className="error-text">{errors.email}</div>}
            </div>

            <div className={`form-group ${errors.password && touched.password ? "has-error" : ""}`}>
               <label htmlFor="password">Password</label>
               <input
                  type="password"
                  id="password"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
               />
               {errors.password && touched.password && <div className="error-text">{errors.password}</div>}
            </div>

            <button type="submit" className="submit-btn" disabled={isLoading}>
               {isLoading ? "Logging in..." : "Login"}
            </button>
         </form>

         <div className="form-footer">
            <p>
               Don't have an account? <Link to="/register">Register</Link>
            </p>
            <p>
               <Link to="/forgot-password">Forgot Password?</Link>
            </p>
         </div>
      </div>
   )
}

export default LoginForm
