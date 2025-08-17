import React from "react";
import carImage from "../assets/bmw.png";

const CarModelCard = () => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-100 to-white flex flex-col md:flex-row">
            {/* Left Section: Car Image */}
            <div className="md:w-1/2 flex items-center justify-center p-4 bg-white">
                <img
                    src={carImage}
                    alt="Car Model"
                    className="w-4/5 max-h-screen object-contain transition-transform duration-500 hover:scale-105"
                />
            </div>
            {/* Right Section: Car Details */}
            <div className="md:w-1/2 p-8 flex flex-col justify-center bg-white bg-opacity-90 backdrop-blur-md shadow-inner">
                <h1 className="text-4xl font-extrabold text-gray-800 mb-4">
                    Car Model Name {/* e.g., Audi A6 */}
                </h1>
                <p className="text-2xl text-gray-600 mb-6">
                    Price Range: <span className="font-semibold">₹XX,XX,XXX - ₹XX,XX,XXX</span>
                </p>
                <div className="grid grid-cols-2 gap-4 text-lg text-gray-700 mb-6">
                    <div>
                        <p>
                            <span className="font-bold">Engine:</span> {/* 2.0L TFSI */}
                        </p>
                        <p>
                            <span className="font-bold">Mileage:</span> {/* 15 km/l */}
                        </p>
                    </div>
                    <div>
                        <p>
                            <span className="font-bold">Transmission:</span> {/* Automatic */}
                        </p>
                        <p>
                            <span className="font-bold">Fuel Type:</span> {/* Petrol */}
                        </p>
                    </div>
                </div>
                <div className="mb-6 text-lg text-gray-700">
                    <p>
                        <span className="font-bold">Top Speed:</span>
                    </p>
                    <p>
                        <span className="font-bold">0-1000 km/h:</span> {/* 6.8 sec */}
                    </p>
                </div>
                <div className="flex flex-wrap gap-4 mb-6">
                    <button className="bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-600 transition">
                        View Offers
                    </button>
                    <button className="bg-red-500 text-white px-6 py-3 rounded-full hover:bg-red-600 transition">
                        Add to Wishlist
                    </button>
                    <button className="bg-green-500 text-white px-6 py-3 rounded-full hover:bg-green-600 transition">
                        Book Now
                    </button>
                </div>
                <div className="text-lg text-gray-700">
                    <p>
                        <span className="font-bold">Nearest Showroom:</span>{" "}
                        {/* XYZ Showroom, City */}
                    </p>
                    <p>
                        <span className="font-bold">Booking Charge:</span> ₹{/* 50,000 */}
                    </p>
                    <p className="mt-2 italic text-sm text-gray-500">
                        {/* Feature: Showroom Customer Service available 24/7 */}
                        Showroom Customer Service: 24/7 assistance available.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default CarModelCard;
