// src/components/Footer/Footer.jsx

import { Link } from "react-router-dom";
// --- STYLING: Replaced react-icons with a consistent, modern icon set ---
import {
    Facebook, Twitter, Instagram, Linkedin, Phone, Mail, MapPin, Car, Send
} from "lucide-react";

// --- Helper components for cleaner, reusable code ---
const FooterLink = ({ to, children }) => (
    <li>
        <Link to={to} className="text-slate-400 hover:text-white hover:pl-1 transition-all duration-200">
            {children}
        </Link>
    </li>
);

const SocialLink = ({ href, icon: Icon }) => (
    <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="h-10 w-10 flex items-center justify-center rounded-full bg-slate-800 text-slate-400 hover:bg-blue-600 hover:text-white transition-colors"
    >
        <Icon className="w-5 h-5" />
    </a>
);


const Footer = () => {
    // --- LOGIC: Unchanged ---
    const currentYear = new Date().getFullYear();

    const quickLinks = [
        { name: "Home", path: "/" }, { name: "About Us", path: "/about" }, { name: "Car Brands", path: "/brands" },
        { name: "Showrooms", path: "/showrooms" }, { name: "Contact Us", path: "/contact" }, { name: "Services", path: "/services" },
    ];

    const servicesLinks = [
        { name: "New Car Sales", path: "/services/new-cars" }, { name: "Used Car Sales", path: "/services/used-cars" },
        { name: "Car Financing", path: "/services/financing" }, { name: "Car Insurance", path: "/services/insurance" },
        { name: "Car Service", path: "/services/service" },
    ];

    return (
        // --- STYLING: Main footer with a navy blue theme ---
        <footer className="bg-slate-900 text-slate-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* --- STYLING: Main footer content grid --- */}
                <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* --- Company Info Column --- */}
                    <div className="space-y-4">
                        <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-white">
                            <Car className="h-7 w-7 text-blue-500" />
                            E-Car Selling
                        </Link>
                        <p className="text-slate-400 leading-relaxed">
                            Find, book, and service your dream car with ease. We provide the best car buying experience with trusted dealers and transparent pricing.
                        </p>
                        <div className="flex space-x-2 pt-2">
                            <SocialLink href="#" icon={Facebook} />
                            <SocialLink href="#" icon={Twitter} />
                            <SocialLink href="#" icon={Instagram} />
                            <SocialLink href="#" icon={Linkedin} />
                        </div>
                    </div>

                    {/* --- Quick Links & Services Columns --- */}
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
                        <ul className="space-y-3">
                            {quickLinks.map((link) => (
                                <FooterLink key={link.name} to={link.path}>{link.name}</FooterLink>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-4">Our Services</h3>
                        <ul className="space-y-3">
                            {servicesLinks.map((service) => (
                                <FooterLink key={service.name} to={service.path}>{service.name}</FooterLink>
                            ))}
                        </ul>
                    </div>

                    {/* --- Contact Info Column --- */}
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-4">Contact Us</h3>
                        <ul className="space-y-4 text-slate-400">
                            <li className="flex items-start gap-3">
                                <Phone className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
                                <span>+91 9670510079</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <Mail className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
                                <span>driveit587@gmail.com</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <MapPin className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
                                <span>123 Car Lane, Auto City, India</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* --- STYLING: Newsletter section with modern form --- */}
                <div className="border-t border-slate-800 py-10 flex flex-col lg:flex-row items-center justify-between gap-6">
                    <div>
                        <h4 className="text-lg font-semibold text-white">Subscribe to Our Newsletter</h4>
                        <p className="text-slate-400 text-sm mt-1">Get the latest updates on new cars and exclusive offers.</p>
                    </div>
                    <form className="w-full max-w-sm flex items-center">
                        <label htmlFor="footer-email" className="sr-only">Email address</label>
                        <input
                            id="footer-email"
                            type="email"
                            placeholder="Enter your email"
                            className="flex-grow py-2.5 px-4 bg-slate-800 border border-slate-700 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                        />
                        <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white p-2.5 rounded-r-md transition-colors">
                            <Send className="w-5 h-5" />
                        </button>
                    </form>
                </div>
            </div>

            {/* --- STYLING: Copyright bar at the bottom --- */}
            <div className="bg-black/50 py-4">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-2">
                    <p className="text-slate-500 text-sm">
                        © {currentYear} E-Car Selling. All Rights Reserved.
                    </p>
                    <div className="flex space-x-4 text-sm text-slate-500">
                        <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;

