import {
    FaFacebookF,
    FaTwitter,
    FaInstagram,
    FaLinkedinIn,
    FaPhone,
    FaEnvelope,
    FaMapMarkerAlt,
    FaChevronRight,
} from "react-icons/fa"
import { Link } from "react-router-dom"

const Footer = () => {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="bg-gradient-to-b from-gray-900 to-gray-800 text-white">
            {/* Main Footer */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Company Info */}
                    <div>
                        <div className="flex items-center mb-6">
                            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-indigo-600">
                                E-Car
                            </span>
                            <span className="ml-1 text-lg font-medium text-white">Selling</span>
                        </div>
                        <p className="text-gray-300 mb-6 leading-relaxed">
                            Find, book, and service your dream car with ease. We provide the best car buying experience in India with
                            trusted dealers and transparent pricing.
                        </p>
                        <div className="flex space-x-4">
                            <a
                                href="#"
                                className="h-10 w-10 rounded-full bg-gray-700 hover:bg-indigo-600 flex items-center justify-center transition-colors duration-300"
                            >
                                <FaFacebookF className="text-white" />
                            </a>
                            <a
                                href="#"
                                className="h-10 w-10 rounded-full bg-gray-700 hover:bg-indigo-600 flex items-center justify-center transition-colors duration-300"
                            >
                                <FaTwitter className="text-white" />
                            </a>
                            <a
                                href="#"
                                className="h-10 w-10 rounded-full bg-gray-700 hover:bg-indigo-600 flex items-center justify-center transition-colors duration-300"
                            >
                                <FaInstagram className="text-white" />
                            </a>
                            <a
                                href="#"
                                className="h-10 w-10 rounded-full bg-gray-700 hover:bg-indigo-600 flex items-center justify-center transition-colors duration-300"
                            >
                                <FaLinkedinIn className="text-white" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold mb-6 relative inline-block">
                            Quick Links
                            <span className="absolute bottom-0 left-0 w-1/2 h-0.5 bg-indigo-500"></span>
                        </h3>
                        <ul className="space-y-3">
                            {[
                                { name: "Home", path: "/" },
                                { name: "About Us", path: "/about" },
                                { name: "Car Brands", path: "/brands" },
                                { name: "Showrooms", path: "/showrooms" },
                                { name: "Contact Us", path: "/contact" },
                                { name: "Services", path: "/services" },
                            ].map((link, index) => (
                                <li key={index}>
                                    <Link to={link.path} className="text-gray-300 hover:text-white flex items-center group">
                                        <FaChevronRight className="mr-2 text-xs text-indigo-400 group-hover:translate-x-1 transition-transform" />
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h3 className="text-lg font-semibold mb-6 relative inline-block">
                            Our Services
                            <span className="absolute bottom-0 left-0 w-1/2 h-0.5 bg-indigo-500"></span>
                        </h3>
                        <ul className="space-y-3">
                            {[
                                { name: "New Car Sales", path: "/services/new-cars" },
                                { name: "Used Car Sales", path: "/services/used-cars" },
                                { name: "Car Financing", path: "/services/financing" },
                                { name: "Car Insurance", path: "/services/insurance" },
                                { name: "Car Service", path: "/services/service" },
                            ].map((service, index) => (
                                <li key={index}>
                                    <Link to={service.path} className="text-gray-300 hover:text-white flex items-center group">
                                        <FaChevronRight className="mr-2 text-xs text-indigo-400 group-hover:translate-x-1 transition-transform" />
                                        {service.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-lg font-semibold mb-6 relative inline-block">
                            Contact Us
                            <span className="absolute bottom-0 left-0 w-1/2 h-0.5 bg-indigo-500"></span>
                        </h3>
                        <ul className="space-y-4">
                            <li className="flex items-start">
                                <FaPhone className="text-indigo-400 mt-1 mr-3" />
                                <div>
                                    <p className="text-white font-medium">Phone</p>
                                    <p className="text-gray-300">+91 9670510079</p>
                                </div>
                            </li>
                            <li className="flex items-start">
                                <FaEnvelope className="text-indigo-400 mt-1 mr-3" />
                                <div>
                                    <p className="text-white font-medium">Email</p>
                                    <p className="text-gray-300">driveit587@gmail.com</p>
                                </div>
                            </li>
                            <li className="flex items-start">
                                <FaMapMarkerAlt className="text-indigo-400 mt-1 mr-3" />
                                <div>
                                    <p className="text-white font-medium">Address</p>
                                    <p className="text-gray-300">123 Car Lane, Auto City, India</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Newsletter */}
            <div className="border-t border-gray-700">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="flex flex-col md:flex-row md:items-center justify-between">
                        <div className="mb-4 md:mb-0">
                            <h4 className="text-lg font-semibold text-white mb-1">Subscribe to Our Newsletter</h4>
                            <p className="text-gray-400 text-sm">Get the latest updates on new cars and exclusive offers</p>
                        </div>
                        <div className="flex w-full md:w-auto">
                            <input
                                type="email"
                                placeholder="Your email address"
                                className="px-4 py-2 w-full md:w-64 bg-gray-700 border border-gray-600 rounded-l-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white"
                            />
                            <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-r-md transition-colors">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Copyright */}
            <div className="bg-gray-950 py-4">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <p className="text-gray-400 text-sm">© {currentYear} E-Car Selling. All Rights Reserved.</p>
                        <div className="mt-2 md:mt-0">
                            <ul className="flex space-x-6 text-sm text-gray-400">
                                <li>
                                    <a href="/privacy" className="hover:text-white">
                                        Privacy Policy
                                    </a>
                                </li>
                                <li>
                                    <a href="/terms" className="hover:text-white">
                                        Terms of Service
                                    </a>
                                </li>
                                <li>
                                    <a href="/cookies" className="hover:text-white">
                                        Cookie Policy
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
