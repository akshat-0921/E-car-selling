import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white py-8">
            <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                    <h3 className="text-xl font-semibold mb-4">E-Car Selling</h3>
                    <p>Find, book, and service your dream car with ease.</p>
                </div>

                <div>
                    <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
                    <ul className="space-y-2">
                        <li><a href="/" className="hover:text-orange-400">Home</a></li>
                        <li><a href="/about" className="hover:text-orange-400">About Us</a></li>
                        <li><a href="/contact" className="hover:text-orange-400">Contact</a></li>
                        <li><a href="/services" className="hover:text-orange-400">Services</a></li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
                    <p className="flex items-center gap-2"><FaPhone /> +91 9670510079</p>
                    <p className="flex items-center gap-2"><FaEnvelope /> driveit587@gmail.com</p>
                    <p className="flex items-center gap-2"><FaMapMarkerAlt /> 123 Car Lane, Auto City, India</p>

                    <div className="flex gap-4 mt-4">
                        <a href="#" className="text-gray-400 hover:text-white"><FaFacebookF /></a>
                        <a href="#" className="text-gray-400 hover:text-white"><FaTwitter /></a>
                        <a href="#" className="text-gray-400 hover:text-white"><FaInstagram /></a>
                    </div>
                </div>
            </div>

            <div className="text-center text-sm text-gray-400 mt-6">
                © {new Date().getFullYear()} E-Car Selling. All Rights Reserved.
            </div>
        </footer>
    );
};

export default Footer;
