import React, { useState } from "react";
import { FaSearch, FaBars, FaHeart, FaUser } from "react-icons/fa";
import "./Navbar.css";

const Navbar = () => {
    const [showProfileMenu, setShowProfileMenu] = useState(false);

    return (
        <nav className="navbar">
            {/* Left Section */}
            <div className="navbar-left">
                <FaBars className="menu-icon" />
            </div>

            {/* Center Section */}
            <div className="navbar-center">
                <input type="text" placeholder="Search for cars..." className="search-input" />
                <FaSearch className="search-icon" />
            </div>

            {/* Right Section */}
            <div className="navbar-right">
                <span className="tag">Brand</span>
                <span className="tag">Showroom</span>
                <span className="tag">Location</span>
                <FaHeart className="icon" />

                <div className="profile-container">
                    <FaUser className="icon profile-icon" onClick={() => setShowProfileMenu(!showProfileMenu)} />
                    {showProfileMenu && (
                        <div className="profile-dropdown">
                            <p>View Profile</p>
                            <p>Settings</p>
                            <p>Logout</p>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar