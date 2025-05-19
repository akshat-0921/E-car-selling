import React, { useState } from "react";
import { ChevronRight, Filter, Car, Fuel } from "lucide-react";

const SearchPage = () => {
    const [filters, setFilters] = useState({
        budget: "",
        bodyType: "",
        fuel: "",
        seating: "",
    });

    return (
        <div className="min-h-screen bg-slate-50 p-6 flex flex-col md:flex-row gap-6">
            {/* Filters Sidebar */}
            <div className="w-full md:w-1/4 bg-white p-5 rounded-xl shadow-md">
                <h2 className="flex items-center gap-2 text-xl font-semibold mb-4">
                    <Filter className="h-5 w-5" />
                    Filters
                </h2>

                <div className="space-y-4">
                    {/* Budget */}
                    <div>
                        <label className="block text-sm font-medium mb-1">By Budget</label>
                        <select
                            value={filters.budget}
                            onChange={(e) => setFilters({ ...filters, budget: e.target.value })}
                            className="w-full border rounded px-3 py-2"
                        >
                            <option value="">Select Budget</option>
                            <option value="5L">Up to ₹5 Lakh</option>
                            <option value="10L">₹5L - ₹10L</option>
                            <option value="20L">₹10L - ₹20L</option>
                            <option value="50L">₹20L - ₹50L</option>
                        </select>
                    </div>

                    {/* Body Type */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Body Type</label>
                        <select
                            value={filters.bodyType}
                            onChange={(e) => setFilters({ ...filters, bodyType: e.target.value })}
                            className="w-full border rounded px-3 py-2"
                        >
                            <option value="">Select Type</option>
                            <option value="SUV">SUV</option>
                            <option value="Sedan">Sedan</option>
                            <option value="Hatchback">Hatchback</option>
                        </select>
                    </div>

                    {/* Fuel Type */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Fuel Type</label>
                        <select
                            value={filters.fuel}
                            onChange={(e) => setFilters({ ...filters, fuel: e.target.value })}
                            className="w-full border rounded px-3 py-2"
                        >
                            <option value="">Select Fuel</option>
                            <option value="Petrol">Petrol</option>
                            <option value="Diesel">Diesel</option>
                            <option value="Electric">Electric</option>
                        </select>
                    </div>

                    {/* Seating Capacity */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Seating Capacity</label>
                        <select
                            value={filters.seating}
                            onChange={(e) => setFilters({ ...filters, seating: e.target.value })}
                            className="w-full border rounded px-3 py-2"
                        >
                            <option value="">Select Seating</option>
                            <option value="2">2-Seater</option>
                            <option value="5">5-Seater</option>
                            <option value="7">7-Seater</option>
                        </select>
                    </div>

                    <button className="w-full bg-blue-600 text-white py-2 rounded mt-4 hover:bg-blue-700 transition">
                        Apply Filters
                    </button>
                </div>
            </div>

            {/* Right Section */}
            <div className="w-full md:w-3/4 space-y-6">
                {/* Comparison Section */}
                <div className="bg-white p-5 rounded-xl shadow-md">
                    <h2 className="text-xl font-semibold mb-4">Compare Cars</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {[
                            { icon: <Car className="h-4 w-4" />, label: "By Brand" },
                            { icon: <span className="font-mono text-sm">₹</span>, label: "By Budget" },
                            { icon: <Car className="h-4 w-4" />, label: "By Body Type" },
                            { icon: <Fuel className="h-4 w-4" />, label: "By Fuel Type" },
                        ].map((item, idx) => (
                            <button key={idx} className="flex justify-between items-center border px-4 py-3 rounded hover:bg-slate-100">
                                <span className="flex items-center gap-2">{item.icon} {item.label}</span>
                                <ChevronRight className="h-4 w-4 opacity-50" />
                            </button>
                        ))}
                    </div>
                </div>

                {/* Featured Sections */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Most Searched Cars */}
                    <div className="bg-white p-5 rounded-xl shadow-md">
                        <h3 className="text-lg font-semibold mb-4">Most Searched Cars</h3>
                        <ul className="space-y-3">
                            {["Audi Q5", "BMW 5 Series", "Hyundai Creta"].map((car, index) => (
                                <li key={index} className="flex items-center gap-3">
                                    <span className="bg-gray-200 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">{index + 1}</span>
                                    {car}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Cars with Offers */}
                    <div className="bg-white p-5 rounded-xl shadow-md">
                        <h3 className="text-lg font-semibold mb-4">Cars with Exciting Offers</h3>
                        <ul className="space-y-3">
                            <li className="flex justify-between items-center">
                                <span>Honda City</span>
                                <span className="text-red-600 font-semibold text-sm bg-red-100 px-2 py-1 rounded">₹50,000 Off</span>
                            </li>
                            <li className="flex justify-between items-center">
                                <span>Maruti Swift</span>
                                <span className="text-gray-700 text-sm border px-2 py-1 rounded">Free Insurance</span>
                            </li>
                            <li className="flex justify-between items-center">
                                <span>Toyota Fortuner</span>
                                <span className="text-red-600 font-semibold text-sm bg-red-100 px-2 py-1 rounded">₹1 Lakh Off</span>
                            </li>
                        </ul>
                    </div>

                    {/* Newly Added Cars */}
                    <div className="md:col-span-2 bg-white p-5 rounded-xl shadow-md">
                        <h3 className="text-lg font-semibold mb-4">Newly Added Cars</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            {["Mercedes Benz EQS", "Tata Punch EV", "Skoda Kushaq"].map((car, index) => (
                                <div key={index} className="text-center border rounded p-4 hover:bg-slate-50 transition">
                                    <div className="w-16 h-16 mx-auto bg-slate-100 rounded-full flex items-center justify-center mb-3">
                                        <Car className="h-8 w-8 text-slate-500" />
                                    </div>
                                    <p className="font-medium">{car}</p>
                                    <span className="inline-block mt-2 text-xs bg-gray-200 text-gray-700 px-2 py-0.5 rounded">New</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchPage;
