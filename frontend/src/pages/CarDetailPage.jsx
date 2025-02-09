import React from "react";
import Navbar from "../components/Navbar/Navbar";
import CarModelCard from "../components/CarModelCard";
import Footer from "../components/Footer";

const CarDetailPage = () => {
    return (
        <>
            <Navbar />
            <div>
                <CarModelCard />
            </div>
            <Footer />
        </>
    );
};

export default CarDetailPage;
