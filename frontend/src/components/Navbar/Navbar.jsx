import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
// import { useSelector, useDispatch } from "react-redux"
// import { selectIsAuthenticated, selectCurrentUser } from "../../redux/slices/authSlice"
// import { useLogoutMutation } from "../../redux/api/authApi"

const Navbar = () => {
   const [showProfileMenu, setShowProfileMenu] = useState(false)
   const [showMobileMenu, setShowMobileMenu] = useState(false)
   const [searchFocused, setSearchFocused] = useState(false)
   const [openedByHover, setOpenedByHover] = useState(false)
   const [openedByClick, setOpenedByClick] = useState(false)
   const [isLoggedIn, setIsLoggedIn] = useState(true)

   const handleLogout = () => {
      setIsLoggedIn(false)
   }

   return (
      <nav className="navbar">
         <div className="navbar-container">
            <Link to="/" className="navbar-logo">
               E-Car
            </Link>
         </div>
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

         {/* Desktop Menu Items */}
         <div className="hidden md:flex items-center space-x-6">
            <Link
               to="/brands"
               className="text-gray-300 hover:text-white hover:underline underline-offset-4 decoration-indigo-500 decoration-2 font-medium transition-all"
            >
               Brands
            </Link>
            <Link
               to="/showrooms"
               className="text-gray-300 hover:text-white hover:underline underline-offset-4 decoration-indigo-500 decoration-2 font-medium transition-all"
            >
               Showrooms
            </Link>
            <Link
               to="/locations"
               className="text-gray-300 hover:text-white hover:underline underline-offset-4 decoration-indigo-500 decoration-2 font-medium transition-all"
            >
               Locations
            </Link>
            <Link to="/favorites" className="relative group">
               <FaHeart className="text-xl text-gray-300 group-hover:text-indigo-400 transition-colors" />
               <span className="absolute -top-2 -right-2 bg-indigo-500 text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">
                  2
               </span>
            </Link>

            {/* Profile Dropdown */}
            <div className="relative"
               onMouseLeave={() => {
                  if (openedByHover && !openedByClick) setShowProfileMenu(false)
               }}
            >
               <button
                  className="flex items-center justify-center h-8 w-8 rounded-full bg-gray-700 hover:bg-indigo-600 transition-colors"
                  onClick={() => {
                     setOpenedByClick(prev => !prev)
                     if (openedByClick)
                        setShowProfileMenu(true)
                     else
                        setShowProfileMenu(false)
                     setOpenedByHover(false)
                  }}
                  onMouseEnter={() => {
                     setShowProfileMenu(true)
                     setOpenedByHover(true)
                  }}
               >
                  <FaUser className="text-sm" />
               </button>
               {/* 
                     {showProfileMenu && (
                        <div className="absolute right-0 mt-2 w-56 bg-white text-gray-800 rounded-lg shadow-lg overflow-hidden z-50 border border-gray-200 animate-fadeIn">
                           <div className="p-3 border-b border-gray-200 bg-gray-50">
                              <p className="font-medium">John Doe</p>
                              <p className="text-xs text-gray-500">john@gmail.com</p>
                           </div>
                           <div className="py-1">
                              <Link to="/profile" className="flex items-center px-4 py-2 hover:bg-gray-100">
                                 <span className="w-8">👤</span>
                                 <span>View Profile</span>
                              </Link>
                              <Link to="/settings" className="flex items-center px-4 py-2 hover:bg-gray-100">
                                 <span className="w-8">⚙️</span>
                                 <span>Settings</span>
                              </Link>
                              <Link to="/favorites" className="flex items-center px-4 py-2 hover:bg-gray-100">
                                 <span className="w-8">❤️</span>
                                 <span>Favorites</span>
                              </Link>
                           </div>
                           <div className="border-t border-gray-200">
                              <button className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 flex items-center">
                                 <span className="w-8">🚪</span>
                                 <span>Logout</span>
                              </button>
                           </div>


                        </div>
                     )} */}

               {showProfileMenu && (
                  <div className="absolute right-0 mt-2 w-56 bg-white text-gray-800 rounded-lg shadow-lg overflow-hidden z-50 border border-gray-200 animate-fadeIn">
                     {isLoggedIn ? (
                        <>
                           <div className="p-3 border-b border-gray-200 bg-gray-50">
                              <p className="font-medium">John Doe</p>
                              <p className="text-xs text-gray-500">john@gmail.com</p>
                           </div>
                           <div className="py-1">
                              <Link to="/profile" className="flex items-center px-4 py-2 hover:bg-gray-100">
                                 <span className="w-8">👤</span>
                                 <span>View Profile</span>
                              </Link>
                              <Link to="/settings" className="flex items-center px-4 py-2 hover:bg-gray-100">
                                 <span className="w-8">⚙️</span>
                                 <span>Settings</span>
                              </Link>
                              <Link to="/favorites" className="flex items-center px-4 py-2 hover:bg-gray-100">
                                 <span className="w-8">❤️</span>
                                 <span>Favorites</span>
                              </Link>
                           </div>
                           <div className="border-t border-gray-200">
                              <button
                                 onClick={handleLogout}
                                 className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 flex items-center"
                              >
                                 <span className="w-8">🚪</span>
                                 <span>Logout</span>
                              </button>
                           </div>
                        </>
                     ) : (
                        <>
                           <div className="p-3 border-b border-gray-200 bg-gray-50">
                              <p className="font-medium">Welcome!</p>
                              <p className="text-xs text-gray-500">Access your account</p>
                           </div>
                           <div className="py-2 px-4 space-y-2">
                              <Link
                                 to="/auth?mode=login"
                                 className="w-full block text-center px-4 py-2 text-white bg-indigo-600 hover:bg-indigo-700 rounded-md font-medium transition"
                              >
                                 Login
                              </Link>
                              <Link
                                 to="/auth?mode=signup"
                                 className="w-full block text-center px-4 py-2 text-indigo-600 border border-indigo-600 hover:bg-indigo-50 rounded-md font-medium transition"
                              >
                                 Sign Up
                              </Link>
                           </div>
                        </>
                     )}
                  </div>
               )}

            </div>
            : (
            <>
               <Link to="/login" className="auth-btn login-btn">
                  Login
               </Link>
               <Link to="/register" className="auth-btn register-btn">
                  Register
               </Link>
            </>
            )
         </div>

         {/* Mobile Menu */}
         {
            showMobileMenu && (
               <div className="md:hidden bg-gray-800 shadow-lg animate-slideDown">
                  <div className="px-4 pt-2 pb-3 space-y-1 border-b border-gray-700">
                     <div className="relative mb-3 mt-2">
                        <input
                           type="text"
                           placeholder="Search for cars..."
                           className="w-full py-2 pl-10 pr-4 rounded-md bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-indigo-500"
                        />
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                           <FaSearch className="text-gray-400" />
                        </div>
                     </div>
                     <Link
                        to="/brands"
                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700"
                     >
                        Brands
                     </Link>
                     <Link
                        to="/showrooms"
                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700"
                     >
                        Showrooms
                     </Link>
                     <Link
                        to="/locations"
                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700"
                     >
                        Locations
                     </Link>
                  </div>
                  <div className="pt-4 pb-3 border-t border-gray-700">
                     <div className="flex items-center px-4">
                        <div className="flex-shrink-0">
                           <div className="h-10 w-10 rounded-full bg-gray-700 flex items-center justify-center">
                              <FaUser className="text-gray-300" />
                           </div>
                        </div>
                        <div className="ml-3">
                           <div className="text-base font-medium text-white">John Doe</div>
                           <div className="text-sm font-medium text-gray-400">john@gmail.com</div>
                        </div>
                     </div>
                     <div className="mt-3 px-2 space-y-1">
                        <Link
                           to="/profile"
                           className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700"
                        >
                           Your Profile
                        </Link>
                        <Link
                           to="/settings"
                           className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700"
                        >
                           Settings
                        </Link>
                        <button className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700">
                           Sign out
                        </button>
                     </div>
                  </div>
               </div>
            )
         }
      </nav>
   )
}

export default Navbar
