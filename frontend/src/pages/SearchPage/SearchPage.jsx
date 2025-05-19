import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchPage = () => {
    const navigate = useNavigate();
    const [filters, setFilters] = useState({
        budget: "",
        bodyType: "",
        fuel: "",
        seating: "",
    });

    return (
        <div className="min-h-screen bg-gray-100 p-6 flex">
            {/* Left Sidebar - Filters */}
            <div className="w-1/4 bg-white shadow-lg p-6 rounded-lg">
                <h2 className="text-xl font-bold mb-4">Filters</h2>

                <div className="mb-4">
                    <label className="font-semibold">By Budget</label>
                    <select
                        className="w-full p-2 border rounded mt-1"
                        onChange={(e) => setFilters({ ...filters, budget: e.target.value })}
                    >
                        <option value="">Select Budget</option>
                        <option value="5L">Up to ₹5 Lakh</option>
                        <option value="10L">₹5L - ₹10L</option>
                        <option value="20L">₹10L - ₹20L</option>
                        <option value="50L">₹20L - ₹50L</option>
                    </select>
                </div>

                <div className="mb-4">
                    <label className="font-semibold">Body Type</label>
                    <select
                        className="w-full p-2 border rounded mt-1"
                        onChange={(e) => setFilters({ ...filters, bodyType: e.target.value })}
                    >
                        <option value="">Select Type</option>
                        <option value="SUV">SUV</option>
                        <option value="Sedan">Sedan</option>
                        <option value="Hatchback">Hatchback</option>
                    </select>
                </div>

                <div className="mb-4">
                    <label className="font-semibold">Fuel Type</label>
                    <select
                        className="w-full p-2 border rounded mt-1"
                        onChange={(e) => setFilters({ ...filters, fuel: e.target.value })}
                    >
                        <option value="">Select Fuel</option>
                        <option value="Petrol">Petrol</option>
                        <option value="Diesel">Diesel</option>
                        <option value="Electric">Electric</option>
                    </select>
                </div>

                <div className="mb-4">
                    <label className="font-semibold">Seating Capacity</label>
                    <select
                        className="w-full p-2 border rounded mt-1"
                        onChange={(e) => setFilters({ ...filters, seating: e.target.value })}
                    >
                        <option value="">Select Seating</option>
                        <option value="2">2-Seater</option>
                        <option value="5">5-Seater</option>
                        <option value="7">7-Seater</option>
                    </select>
                </div>

                <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition">
                    Apply Filters
                </button>
            </div>

            {/* Right Section - Comparison & Featured Cars */}
            <div className="w-3/4 ml-6">
                {/* Comparison Section */}
                <div className="bg-white shadow-lg p-6 rounded-lg mb-6">
                    <h2 className="text-xl font-bold mb-4">Compare Cars</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <button className="bg-gray-200 py-2 rounded hover:bg-gray-300">
                            By Brand
                        </button>
                        <button className="bg-gray-200 py-2 rounded hover:bg-gray-300">
                            By Budget
                        </button>
                        <button className="bg-gray-200 py-2 rounded hover:bg-gray-300">
                            By Body Type
                        </button>
                        <button className="bg-gray-200 py-2 rounded hover:bg-gray-300">
                            By Fuel Type
                        </button>
                    </div>
                </div>

                {/* Featured Sections */}
                <div className="grid grid-cols-2 gap-6">
                    {/* Most Searched Cars */}
                    <div className="bg-white shadow-lg p-6 rounded-lg">
                        <h3 className="text-lg font-semibold mb-4">Most Searched Cars</h3>
                        <ul className="list-disc pl-4 text-gray-700">
                            <li>Audi Q5</li>
                            <li>BMW 5 Series</li>
                            <li>Hyundai Creta</li>
                        </ul>
                    </div>

                    {/* Cars with Exciting Offers */}
                    <div className="bg-white shadow-lg p-6 rounded-lg">
                        <h3 className="text-lg font-semibold mb-4">Cars with Exciting Offers</h3>
                        <ul className="list-disc pl-4 text-gray-700">
                            <li>Honda City – ₹50,000 Discount</li>
                            <li>Maruti Swift – Free Insurance</li>
                            <li>Toyota Fortuner – ₹1 Lakh Discount</li>
                        </ul>
                    </div>

                    {/* Newly Added Cars */}
                    <div className="col-span-2 bg-white shadow-lg p-6 rounded-lg">
                        <h3 className="text-lg font-semibold mb-4">Newly Added Cars</h3>
                        <ul className="list-disc pl-4 text-gray-700">
                            <li>Mercedes Benz EQS</li>
                            <li>Tata Punch EV</li>
                            <li>Skoda Kushaq</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchPage;
