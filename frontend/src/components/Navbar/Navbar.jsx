import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
// import { useSelector, useDispatch } from "react-redux"
// import { selectIsAuthenticated, selectCurrentUser } from "../../redux/slices/authSlice"
// import { useLogoutMutation } from "../../redux/api/authApi"

const Navbar = () => {
   const [isMenuOpen, setIsMenuOpen] = useState(false)
   const isAuthenticated = useSelector(selectIsAuthenticated)
   const user = useSelector(selectCurrentUser)
   const navigate = useNavigate()
   const dispatch = useDispatch()

   const [logout] = useLogoutMutation()

   const toggleMenu = () => {
      setIsMenuOpen(!isMenuOpen)
   }

   const handleLogout = async () => {
      try {
         await logout().unwrap()
         navigate("/login")
      } catch (error) {
         console.error("Logout failed:", error)
      }
   }

   // Close menu when clicking outside
   useEffect(() => {
      const handleClickOutside = (event) => {
         if (isMenuOpen && !event.target.closest(".navbar-menu")) {
            setIsMenuOpen(false)
         }
      }

      document.addEventListener("mousedown", handleClickOutside)
      return () => {
         document.removeEventListener("mousedown", handleClickOutside)
      }
   }, [isMenuOpen])

   return (
      <nav className="navbar">
         <div className="navbar-container">
            <Link to="/" className="navbar-logo">
               E-Car
            </Link>

            <div className="navbar-links">
               <Link to="/" className="navbar-link">
                  Home
               </Link>
               <Link to="/brands" className="navbar-link">
                  Brands
               </Link>
               <Link to="/vehicles" className="navbar-link">
                  Vehicles
               </Link>
               <Link to="/showrooms" className="navbar-link">
                  Showrooms
               </Link>
               <Link to="/about" className="navbar-link">
                  About
               </Link>
               <Link to="/contact" className="navbar-link">
                  Contact
               </Link>
            </div>

            <div className="navbar-auth">
               {isAuthenticated ? (
                  <div className="user-menu">
                     <button className="user-menu-button" onClick={toggleMenu}>
                        {user?.name || "User"}
                     </button>

                     {isMenuOpen && (
                        <div className="navbar-menu">
                           <Link to="/profile" className="menu-item">
                              Profile
                           </Link>
                           <Link to="/orders" className="menu-item">
                              My Orders
                           </Link>
                           {user?.role === "admin" && (
                              <Link to="/admin/dashboard" className="menu-item">
                                 Admin Dashboard
                              </Link>
                           )}
                           <button onClick={handleLogout} className="menu-item logout-btn">
                              Logout
                           </button>
                        </div>
                     )}
                  </div>
               ) : (
                  <>
                     <Link to="/login" className="auth-btn login-btn">
                        Login
                     </Link>
                     <Link to="/register" className="auth-btn register-btn">
                        Register
                     </Link>
                  </>
               )}
            </div>

            <button className="mobile-menu-btn" onClick={toggleMenu}>
               <span className="menu-icon"></span>
            </button>

            {isMenuOpen && (
               <div className="mobile-menu">
                  <Link to="/" className="mobile-link">
                     Home
                  </Link>
                  <Link to="/brands" className="mobile-link">
                     Brands
                  </Link>
                  <Link to="/vehicles" className="mobile-link">
                     Vehicles
                  </Link>
                  <Link to="/showrooms" className="mobile-link">
                     Showrooms
                  </Link>
                  <Link to="/about" className="mobile-link">
                     About
                  </Link>
                  <Link to="/contact" className="mobile-link">
                     Contact
                  </Link>

                  {isAuthenticated ? (
                     <>
                        <Link to="/profile" className="mobile-link">
                           Profile
                        </Link>
                        <Link to="/orders" className="mobile-link">
                           My Orders
                        </Link>
                        {user?.role === "admin" && (
                           <Link to="/admin/dashboard" className="mobile-link">
                              Admin Dashboard
                           </Link>
                        )}
                        <button onClick={handleLogout} className="mobile-link logout-btn">
                           Logout
                        </button>
                     </>
                  ) : (
                     <>
                        <Link to="/login" className="mobile-link">
                           Login
                        </Link>
                        <Link to="/register" className="mobile-link">
                           Register
                        </Link>
                     </>
                  )}
               </div>
            )}
         </div>
      </nav>
   )
}

export default Navbar
