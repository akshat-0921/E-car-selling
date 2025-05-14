import { useState } from "react";
import { FaSearch, FaBars, FaHeart, FaUser } from "react-icons/fa";

const Navbar = () => {
   const [showProfileMenu, setShowProfileMenu] = useState(false);

   return (
      <nav className="flex items-center justify-between p-4 bg-gray-800 text-white">
         {/* Left Section: Menu Icon */}
         <div className="navbar-left">
            <FaBars className="text-xl cursor-pointer" />
         </div>

         {/* Center Section: Search Bar */}
         <div className="flex items-center space-x-2">
            <input
               type="text"
               placeholder="Search for cars..."
               className="p-2 w-64 bg-gray-700 rounded-md text-white focus:outline-none"
            />
            <FaSearch className="text-xl cursor-pointer" />
         </div>

         {/* Right Section: Tags and Profile */}
         <div className="flex items-center space-x-4">
            <span className="cursor-pointer hover:text-blue-500">Brand</span>
            <span className="cursor-pointer hover:text-blue-500">Showroom</span>
            <span className="cursor-pointer hover:text-blue-500">Location</span>
            <FaHeart className="text-xl cursor-pointer" />

            {/* Profile Dropdown */}
            <div className="relative">
               <FaUser
                  className="text-xl cursor-pointer"
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
               />
               {showProfileMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-gray-700 text-white rounded-md shadow-lg">
                     <p className="p-2 cursor-pointer hover:bg-gray-600">View Profile</p>
                     <p className="p-2 cursor-pointer hover:bg-gray-600">Settings</p>
                     <p className="p-2 cursor-pointer hover:bg-gray-600">Logout</p>
                  </div>
               )}
            </div>
         </div>
      </nav>
   );
};

export default Navbar;
