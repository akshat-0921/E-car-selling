import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import BrandCard from "../components/BrandCard";
import ServiceCard from "../components/ServiceCard";
import Footer from "../components/Footer";
import FeatureCard from "../components/FeatureCard";

const Home = () => {
    const navigate = useNavigate();

    return (
        <>
            <Navbar />
            <div className="text-center mt-24">
                <h1 className="text-2xl font-bold text-gray-800">Select Your Car Brand</h1>
                <BrandCard />
            </div>

            <div className="text-center mt-10">
                <h2 className="text-xl font-semibold text-gray-700">Book a Car Service</h2>
                <ServiceCard />
            </div>

            <div className="text-center mt-8">
                <button
                    className="bg-indigo-500 text-white px-6 py-2 rounded hover:bg-indigo-600 transition"
                    onClick={() => navigate("/car-model")}
                >
                    View Car Model Details
                </button>
            </div>

            <FeatureCard />
            <Footer />
        </>
    );
};

export default Home;
