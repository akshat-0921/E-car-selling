import axios from "axios";
import { useState } from "react";
import { FaSearch, FaBars, FaHeart, FaUser, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { logout, setLoading, setError } from '../../redux/authSlice';
import SearchBar from "../Search/SearchBar";


const Navbar = () => {
   const { isLoggedIn, user, loading, error } = useSelector((state) => state.auth);
   const dispatch = useDispatch();

   const [showProfileMenu, setShowProfileMenu] = useState(false);
   const [showMobileMenu, setShowMobileMenu] = useState(false);
   const [searchFocused, setSearchFocused] = useState(false);
   const [openedByHover, setOpenedByHover] = useState(false);
   const [openedByClick, setOpenedByClick] = useState(false);

   const API = import.meta.env.VITE_BACKEND_URL;

   const handleLogout = async () => {
      dispatch(setLoading(true));
      dispatch(setError(null));

      try {
         const res = await axios.post(`${API}/user/logout`, {}, { withCredentials: true });
         dispatch(logout());
         alert(res.data.message || "Logged out successfully");
      } catch (err) {
         dispatch(setError(err?.response?.data?.message || "Logout failed"));
         alert(err?.response?.data?.message || "Logout failed");
      } finally {
         dispatch(setLoading(false));
      }
   };

   return (
      <nav className="bg-gradient-to-r from-gray-900 to-gray-800 text-white shadow-md sticky top-0 z-50">
         {/* Top Bar */}
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
               {/* Logo */}
               <div className="flex-shrink-0 flex items-center">
                  <Link to="/" className="flex items-center">
                     <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-indigo-600">Drive</span>
                     <span className="ml-1 text-lg font-medium">It</span>
                  </Link>
               </div>

               {/* Desktop Search */}
               {/* <div className="hidden md:flex items-center justify-center flex-1 px-8">
                  <div className="relative w-full max-w-xl">
                     <input
                        type="text"
                        placeholder="Search for cars, brands, or models..."
                        className={`w-full py-2 pl-10 pr-4 rounded-full bg-gray-700/60 border ${searchFocused ? "border-indigo-400 ring-2 ring-indigo-400/20" : "border-gray-600"} text-white placeholder-gray-400 focus:outline-none transition-all duration-200`}
                        onFocus={() => setSearchFocused(true)}
                        onBlur={() => setSearchFocused(false)}
                     />
                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaSearch className="text-gray-400" />
                     </div>
                  </div>
               </div> */}

               {/* Desktop Search */}
               <div className="hidden md:flex items-center justify-center flex-1 px-8">
                  <SearchBar
                     className="w-full max-w-xl"
                     placeholder="Search for cars, brands, or models..."
                  />
               </div>



               {/* Desktop Links */}
               <div className="hidden md:flex items-center space-x-6">
                  <Link to="/brands" className="text-gray-300 hover:text-white font-medium">Brands</Link>
                  <Link to="/showrooms" className="text-gray-300 hover:text-white font-medium">Showrooms</Link>
                  <Link to="/locations" className="text-gray-300 hover:text-white font-medium">Locations</Link>
                  <Link to="/favorites" className="relative group">
                     <FaHeart className="text-xl text-gray-300 group-hover:text-indigo-400 transition-colors" />
                     <span className="absolute -top-2 -right-2 bg-indigo-500 text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">2</span>
                  </Link>

                  {/* Profile Dropdown */}
                  <div className="relative" onMouseLeave={() => {
                     if (openedByHover && !openedByClick) setShowProfileMenu(false);
                  }}>
                     <button
                        className="flex items-center justify-center h-8 w-8 rounded-full bg-gray-700 hover:bg-indigo-600 transition-colors"
                        onClick={() => {
                           setOpenedByClick(prev => !prev);
                           setShowProfileMenu(prev => !prev);
                           setOpenedByHover(false);
                        }}
                        onMouseEnter={() => {
                           setShowProfileMenu(true);
                           setOpenedByHover(true);
                        }}
                     >
                        <FaUser className="text-sm" />
                     </button>

                     {showProfileMenu && (
                        <div className="absolute right-0 mt-2 w-56 bg-white text-gray-800 rounded-lg shadow-lg overflow-hidden z-50 border border-gray-200 animate-fadeIn">
                           {isLoggedIn ? (
                              <>
                                 <div className="p-3 border-b border-gray-200 bg-gray-50">
                                    <p className="font-medium">{user?.name || "User"}</p>
                                    <p className="text-xs text-gray-500">{user?.email}</p>
                                 </div>
                                 <div className="py-1">
                                    <Link to="/profile" className="flex items-center px-4 py-2 hover:bg-gray-100">
                                       <span className="w-8">👤</span> View Profile
                                    </Link>
                                    <Link to="/settings" className="flex items-center px-4 py-2 hover:bg-gray-100">
                                       <span className="w-8">⚙️</span> Settings
                                    </Link>
                                    <Link to="/favorites" className="flex items-center px-4 py-2 hover:bg-gray-100">
                                       <span className="w-8">❤️</span> Favorites
                                    </Link>
                                 </div>
                                 <div className="border-t border-gray-200">
                                    <button
                                       onClick={handleLogout}
                                       className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 flex items-center"
                                       disabled={loading}
                                    >
                                       <span className="w-8">🚪</span>
                                       <span>{loading ? "Logging out..." : "Logout"}</span>
                                    </button>
                                 </div>
                                 {error && <p className="text-sm text-red-500 px-4 py-1">{error}</p>}
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
               </div>

               {/* Mobile Hamburger */}
               <div className="md:hidden flex items-center space-x-4">
                  <Link to="/favorites" className="relative">
                     <FaHeart className="text-xl text-gray-300" />
                     <span className="absolute -top-2 -right-2 bg-indigo-500 text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">2</span>
                  </Link>
                  <button
                     onClick={() => setShowMobileMenu(!showMobileMenu)}
                     className="text-gray-300 hover:text-white focus:outline-none"
                  >
                     {showMobileMenu ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
                  </button>
               </div>
            </div>
         </div>
      </nav>
   );
};

export default Navbar;
