import React from "react";
import Navbar from "../components/Navbar/Navbar";
import BrandCard from "../components/BrandCard";
import ServiceCard from "../components/ServiceCard";
import Footer from "../components/Footer"; // Import Footer

const Home = () => {
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

            <Footer /> {/* Add Footer */}
        </>
    );
};

export default Home;
