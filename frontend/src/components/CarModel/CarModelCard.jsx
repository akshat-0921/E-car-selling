// src/components/CarModelCard.jsx

import React from "react";
// --- LOGIC: Asset import is preserved ---
import carImage from "../assets/bmw.png";
// --- STYLING: Icons for visual enhancement ---
import { Gauge, Zap, Cog, Fuel, ShieldCheck, Tag, CalendarCheck } from "lucide-react";

// Helper component for displaying specs
const SpecItem = ({ icon: Icon, label, value }) => (
    <div className="flex items-center gap-3">
        <Icon className="h-6 w-6 text-blue-500" />
        <div>
            <p className="text-sm text-slate-500 dark:text-slate-400">{label}</p>
            <p className="font-semibold text-slate-800 dark:text-slate-200">{value}</p>
        </div>
    </div>
);

const CarModelCard = () => {
    return (
        // --- STYLING: Main container with theme-aware background ---
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2">

                {/* --- STYLING: Left Section: Car Image --- */}
                <div className="flex items-center justify-center p-4 lg:p-8 h-[50vh] lg:h-screen">
                    <img
                        src={carImage}
                        alt="Car Model"
                        className="max-w-full max-h-full object-contain transition-transform duration-500 hover:scale-105"
                    />
                </div>

                {/* --- STYLING: Right Section: Car Details with themed elements --- */}
                <div className="flex flex-col justify-center p-8 lg:p-12">
                    <div>
                        <p className="font-semibold text-blue-600 dark:text-blue-400">BMW M-Series</p>
                        <h1 className="mt-1 text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
                            Car Model Name {/* e.g., Audi A6 */}
                        </h1>
                        <p className="mt-4 text-2xl text-slate-700 dark:text-slate-300">
                            Price Range: <span className="font-bold">₹XX,XX,XXX - ₹XX,XX,XXX</span>
                        </p>
                    </div>

                    <div className="my-8 grid grid-cols-2 gap-x-6 gap-y-6">
                        <SpecItem icon={Zap} label="Engine" value="2.0L TFSI" />
                        <SpecItem icon={Cog} label="Transmission" value="Automatic" />
                        <SpecItem icon={Gauge} label="Mileage" value="15 km/l" />
                        <SpecItem icon={Fuel} label="Fuel Type" value="Petrol" />
                    </div>

                    <div className="flex flex-wrap items-center gap-4">
                        <button className="px-6 py-3 rounded-md text-base font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-sm">
                            Book Now
                        </button>
                        <button className="px-6 py-3 rounded-md text-base font-semibold text-blue-600 dark:text-blue-400 border border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                            View Offers
                        </button>
                    </div>

                    <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800 space-y-3 text-slate-600 dark:text-slate-400">
                        <p className="flex items-center gap-x-2">
                            <ShieldCheck className="w-5 h-5 text-green-500" />
                            <span>Booking Charge: <span className="font-semibold text-slate-800 dark:text-slate-200">₹50,000</span></span>
                        </p>
                        <p className="flex items-center gap-x-2">
                            <CalendarCheck className="w-5 h-5 text-green-500" />
                            <span>Nearest Showroom: <span className="font-semibold text-slate-800 dark:text-slate-200">XYZ Showroom, City</span></span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CarModelCard;
