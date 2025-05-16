import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer";

const BrandSearchPage = () => {
    const navigate = useNavigate();

    // Dummy data, replace with actual database values
    const brandDetails = {
        name: "Audi",
        carsAvailable: 8,
        rating: 4.6,
        description: "Audi is a German luxury car manufacturer known for premium vehicles with cutting-edge technology and performance.",
        highlights: [
            "Luxurious interiors",
            "Advanced infotainment system",
            "Quattro all-wheel drive",
            "High resale value"
        ],
        faqs: [
            {
                question: "What is the starting price of Audi cars in India?",
                answer: "The starting price is around ₹43 lakhs."
            },
            {
                question: "Are Audi cars good for long drives?",
                answer: "Yes, they are equipped with comfort and performance features ideal for long-distance travel."
            }
        ]
    };

    return (
        <>
            <Navbar />
            <div className="max-w-5xl mx-auto p-6 mt-16 bg-white shadow-md rounded-lg">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">{brandDetails.name} Cars in India</h1>
                <p className="text-gray-700 text-lg mb-2">
                    Available Models: <span className="font-semibold">{brandDetails.carsAvailable}</span>
                </p>
                <p className="text-yellow-500 text-md mb-4">⭐ {brandDetails.rating} / 5 Rating</p>
                <p className="text-gray-600 mb-6">{brandDetails.description}</p>

                <button
                    className="bg-indigo-600 text-white px-5 py-2 rounded-md hover:bg-indigo-700 transition mb-6"
                    onClick={() => navigate("/car-model")}
                >
                    View Car Model Card
                </button>

                <div className="mb-6">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-2">Key Highlights</h2>
                    <ul className="list-disc list-inside text-gray-700">
                        {brandDetails.highlights.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h2 className="text-2xl font-semibold text-gray-800 mb-2">FAQs</h2>
                    {brandDetails.faqs.map((faq, index) => (
                        <div key={index} className="mb-4">
                            <p className="font-semibold text-gray-700">Q: {faq.question}</p>
                            <p className="text-gray-600">A: {faq.answer}</p>
                        </div>
                    ))}
                </div>
            </div>

            <Footer />
        </>
    );
};

export default BrandSearchPage;