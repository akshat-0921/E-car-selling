import React from "react";
import Navbar from "../components/Navbar/Navbar.jsx";
import CarDetail from "../components/CarDetails.jsx";
import Footer from "../components/footer.jsx";

const carData = {
    name: "Audi A6",
    price: "70,00,000",
    image: "https://source.unsplash.com/800x500/?audi,car",
    fuelType: "Petrol",
    transmission: "Automatic",
    mileage: "14",
    topSpeed: "250",
    features: ["Sunroof", "Touchscreen Infotainment", "360-degree Camera", "Wireless Charging", "ADAS Safety System"]
};

const CarDetailPage = () => {
    return (
        <>
            <Navbar />
            <div className="mt-4">
                <CarDetail car={carData} />
            </div>
            <Footer />
        </>
    );
};

export default CarDetailPage;
