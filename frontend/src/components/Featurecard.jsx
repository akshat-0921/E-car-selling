import React from "react";
import { FaCar, FaRegCalendarCheck, FaTools, FaMoneyBillWave, FaShieldAlt, FaHeadset } from "react-icons/fa"; // FaHeadset for Customer Service

const features = [
    {
        icon: <FaHeadset className="text-4xl text-red-500" />, // New Feature
        title: "Showroom Customer Service",
        description: "Get 24/7 support at showrooms to assist with your car purchases and services.",
    },
    {
        icon: <FaCar className="text-4xl text-blue-500" />,
        title: "Wide Range of Cars",
        description: "Explore a diverse collection of electric cars from top brands.",
    },
    {
        icon: <FaRegCalendarCheck className="text-4xl text-green-500" />,
        title: "Easy Test Drive Booking",
        description: "Book test drives effortlessly based on your preferred date and time.",
    },
    {
        icon: <FaTools className="text-4xl text-yellow-500" />,
        title: "Car Servicing",
        description: "Get your car serviced at trusted showrooms with certified professionals.",
    },
    {
        icon: <FaMoneyBillWave className="text-4xl text-orange-500" />,
        title: "Flexible Payment Options",
        description: "Secure and flexible payment methods for hassle-free transactions.",
    },
    {
        icon: <FaShieldAlt className="text-4xl text-purple-500" />,
        title: "Secure & Reliable",
        description: "Data security and reliable support to ensure a smooth experience.",
    },
];

const FeatureCard = () => {
    return (
        <div className="max-w-6xl mx-auto px-6 py-12">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
                Why Choose <span className="text-blue-500">DriveIt?</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {features.map((feature, index) => (
                    <div
                        key={index}
                        className="bg-white shadow-xl rounded-lg p-6 hover:shadow-2xl transition-transform transform hover:scale-105 border-t-4 border-blue-500 hover:border-green-500"
                    >
                        <div className="flex justify-center items-center mb-4">
                            {feature.icon}
                        </div>
                        <h3 className="text-xl font-semibold text-gray-700 text-center mb-2">
                            {feature.title}
                        </h3>
                        <p className="text-gray-600 text-center">{feature.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FeatureCard;
