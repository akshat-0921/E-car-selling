// src/components/Navbar/Navbar.jsx

import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { logout, setLoading, setError } from '../../redux/authSlice';
import SearchBar from "../Search/SearchBar";
// --- STYLING: Replaced react-icons with a consistent, modern icon set ---
import { Menu, X, Heart, User, Settings, LogOut, Car, LogIn, UserPlus } from 'lucide-react';

const Navbar = () => {
   // --- LOGIC: Unchanged ---
   const { isLoggedIn, user, loading, error } = useSelector((state) => state.auth);
   const dispatch = useDispatch();

   const [showProfileMenu, setShowProfileMenu] = useState(false);
   const [showMobileMenu, setShowMobileMenu] = useState(false);
   const [searchFocused, setSearchFocused] = useState(false); // Note: This state is from your original code, but not used in the SearchBar component we styled. It is preserved here.
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
      <>
         {/* --- STYLING: Main nav bar with theme-aware, blurred background --- */}
         <nav className="sticky top-0 z-50 w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg border-b border-slate-200 dark:border-slate-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
               <div className="flex items-center justify-between h-16">

                  {/* --- STYLING: Logo updated with theme colors --- */}
                  <div className="flex-shrink-0 flex items-center">
                     <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-slate-900 dark:text-white">
                        <Car className="h-7 w-7 text-blue-600" />
                        DriveIt
                     </Link>
                  </div>

                  {/* --- STYLING: Central navigation links for desktop --- */}
                  <div className="hidden md:flex items-center gap-x-6">
                     <Link to="/brands" className="font-medium text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Brands</Link>
                     <Link to="/showrooms" className="font-medium text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Showrooms</Link>
                     <Link to="/vehicles" className="font-medium text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">All Cars</Link>
                  </div>

                  {/* --- STYLING: Right-side action icons for desktop --- */}
                  <div className="hidden md:flex items-center gap-x-5">
                     <SearchBar placeholder="Search by brand..." />
                     <Link to="/favorites" className="relative group p-2">
                        <Heart className="h-6 w-6 text-slate-500 dark:text-slate-400 group-hover:text-red-500 dark:group-hover:text-red-400 transition-colors" />
                        {/* Optional: Add a count badge if you have the data */}
                        {/* <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">3</span> */}
                     </Link>

                     {/* --- STYLING: Profile Dropdown (logic is preserved) --- */}
                     <div className="relative" onMouseLeave={() => { if (openedByHover && !openedByClick) setShowProfileMenu(false); }}>
                        <button
                           className="flex items-center justify-center h-9 w-9 rounded-full bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors"
                           onClick={() => { setOpenedByClick(prev => !prev); setShowProfileMenu(prev => !prev); setOpenedByHover(false); }}
                           onMouseEnter={() => { setShowProfileMenu(true); setOpenedByHover(true); }}
                        >
                           <User className="h-5 w-5 text-slate-600 dark:text-slate-300" />
                        </button>

                        {showProfileMenu && (
                           <div className="absolute right-0 mt-2 w-64 origin-top-right rounded-xl shadow-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none">
                              <div className="py-1">
                                 {isLoggedIn ? (
                                    <>
                                       <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-700">
                                          <p className="text-sm font-semibold text-slate-900 dark:text-white">Signed in as</p>
                                          <p className="text-sm text-slate-600 dark:text-slate-400 truncate">{user?.email}</p>
                                       </div>
                                       <div className="p-1">
                                          <DropdownLink to="/profile" icon={User} text="My Profile" />
                                          <DropdownLink to="/favorites" icon={Heart} text="My Favorites" />
                                          <DropdownLink to="/settings" icon={Settings} text="Account Settings" />
                                       </div>
                                       <div className="p-1 border-t border-slate-200 dark:border-slate-700">
                                          <button onClick={handleLogout} disabled={loading} className="w-full text-left flex items-center gap-x-2 px-3 py-2 rounded-md text-sm text-red-600 dark:text-red-400 hover:bg-slate-100 dark:hover:bg-slate-700/50 disabled:opacity-50">
                                             <LogOut className="w-4 h-4" />
                                             {loading ? "Logging out..." : "Logout"}
                                          </button>
                                       </div>
                                    </>
                                 ) : (
                                    <div className="p-4 space-y-3">
                                       <Link to="/auth?mode=login" className="w-full flex items-center justify-center gap-x-2 px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-md font-medium transition">
                                          <LogIn className="w-4 h-4" /> Login
                                       </Link>
                                       <Link to="/auth?mode=signup" className="w-full flex items-center justify-center gap-x-2 px-4 py-2 text-blue-600 dark:text-blue-400 border border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md font-medium transition">
                                          <UserPlus className="w-4 h-4" /> Sign Up
                                       </Link>
                                    </div>
                                 )}
                              </div>
                           </div>
                        )}
                     </div>
                  </div>

                  {/* --- STYLING: Mobile hamburger button --- */}
                  <div className="md:hidden flex items-center">
                     <button onClick={() => setShowMobileMenu(!showMobileMenu)} className="p-2 rounded-md text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800">
                        {showMobileMenu ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                     </button>
                  </div>
               </div>
            </div>
         </nav>

         {/* --- STYLING: Mobile Menu Panel --- */}
         {showMobileMenu && (
            <div className="md:hidden fixed inset-0 top-16 z-40 bg-white dark:bg-slate-900 p-4 space-y-6">
               <SearchBar />
               <nav className="flex flex-col space-y-2">
                  <MobileLink to="/" text="Home" onNavigate={() => setShowMobileMenu(false)} />
                  <MobileLink to="/brands" text="Brands" onNavigate={() => setShowMobileMenu(false)} />
                  <MobileLink to="/showrooms" text="Showrooms" onNavigate={() => setShowMobileMenu(false)} />
                  <MobileLink to="/vehicles" text="All Cars" onNavigate={() => setShowMobileMenu(false)} />
                  <MobileLink to="/favorites" text="My Favorites" onNavigate={() => setShowMobileMenu(false)} />
               </nav>
               <div className="border-t border-slate-200 dark:border-slate-700 pt-4">
                  {isLoggedIn ? (
                     <div>
                        <p className="px-4 text-sm font-medium text-slate-500 dark:text-slate-400">Welcome, {user?.name || "User"}</p>
                        <div className="mt-2 space-y-2">
                           <MobileLink to="/profile" text="My Profile" onNavigate={() => setShowMobileMenu(false)} />
                           <button onClick={() => { handleLogout(); setShowMobileMenu(false); }} className="w-full text-left px-4 py-2 text-base font-medium text-red-600 dark:text-red-400 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">Logout</button>
                        </div>
                     </div>
                  ) : (
                     <div className="space-y-3">
                        <Link to="/auth?mode=login" onClick={() => setShowMobileMenu(false)} className="w-full block text-center px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-md font-medium transition">Login</Link>
                        <Link to="/auth?mode=signup" onClick={() => setShowMobileMenu(false)} className="w-full block text-center px-4 py-2 text-blue-600 dark:text-blue-400 border border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md font-medium transition">Sign Up</Link>
                     </div>
                  )}
               </div>
            </div>
         )}
      </>
   );
};

// --- Helper components for cleaner code ---
const DropdownLink = ({ to, icon: Icon, text }) => (
   <Link to={to} className="flex items-center gap-x-2 px-3 py-2 text-sm text-slate-700 dark:text-slate-300 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700/50">
      <Icon className="w-4 h-4" />
      {text}
   </Link>
);

const MobileLink = ({ to, text, onNavigate }) => (
   <Link to={to} onClick={onNavigate} className="block px-4 py-2 text-base font-medium text-slate-700 dark:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">
      {text}
   </Link>
);

export default Navbar;
