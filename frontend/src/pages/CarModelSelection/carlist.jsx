import React, { useState } from "react";

const carModels = [
    {
        name: "Audi A4",
        price: "₹45L - ₹52L",
        rating: 4.5,
        reviews: 230,
        image: "https://via.placeholder.com/150",
        specs: ["Petrol", "Automatic", "5 Seater", "190 BHP"]
    },
    {
        name: "BMW 3 Series",
        price: "₹48L - ₹55L",
        rating: 4.7,
        reviews: 280,
        image: "https://via.placeholder.com/150",
        specs: ["Petrol", "Automatic", "5 Seater", "255 BHP"]
    }
];

const showrooms = [
    { name: "Audi Delhi", rating: 4.8, address: "Ring Road, Delhi" },
    { name: "BMW Gurugram", rating: 4.6, address: "Sector 29, Gurugram" },
    { name: "Premium Auto Noida", rating: 4.5, address: "Sector 18, Noida" }
];

const CarModelSelectionPage = () => {
    const [hoveredIndex, setHoveredIndex] = useState(null);

    return (
        <>
            <div className="max-w-6xl mx-auto p-6 mt-16">
                <h1 className="text-3xl font-bold mb-6">Select a Car Model</h1>

                <div className="grid gap-6">
                    {carModels.map((car, index) => (
                        <div
                            key={car.name}
                            className="border rounded-lg shadow-md p-4 hover:bg-gray-50 transition cursor-pointer"
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                        >
                            <div className="flex items-center justify-between">
                                <div className="text-lg font-semibold">{car.name}</div>
                                <div>{car.price}</div>
                                <div className="text-yellow-500">⭐ {car.rating}</div>
                                <div>{car.reviews} reviews</div>
                                <div className="text-blue-600 hover:underline">Add to Compare</div>
                            </div>
                            {hoveredIndex === index && (
                                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <img src={car.image} alt={car.name} className="w-full max-w-xs rounded" />
                                    <div>
                                        <h4 className="text-lg font-semibold mb-2">Specifications:</h4>
                                        <ul className="list-disc ml-4">
                                            {car.specs.map((spec, i) => <li key={i}>{spec}</li>)}
                                        </ul>
                                        <div className="mt-4">
                                            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">View Offers</button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Mileage Table */}
                <div className="mt-12">
                    <h2 className="text-2xl font-semibold mb-4">Mileage Comparison</h2>
                    <table className="w-full table-auto border-collapse">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="border px-4 py-2">Model</th>
                                <th className="border px-4 py-2">City Mileage</th>
                                <th className="border px-4 py-2">Highway Mileage</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="border px-4 py-2">Audi A4</td>
                                <td className="border px-4 py-2">15 km/l</td>
                                <td className="border px-4 py-2">18 km/l</td>
                            </tr>
                            <tr>
                                <td className="border px-4 py-2">BMW 3 Series</td>
                                <td className="border px-4 py-2">14 km/l</td>
                                <td className="border px-4 py-2">17 km/l</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* Nearby Showrooms */}
                <div className="mt-12">
                    <h2 className="text-2xl font-semibold mb-4">Nearby Showrooms (Sorted by Rating)</h2>
                    <ul className="space-y-3">
                        {showrooms.sort((a, b) => b.rating - a.rating).map((s, i) => (
                            <li key={i} className="p-4 bg-white border rounded shadow">
                                <div className="flex justify-between">
                                    <div>
                                        <div className="font-semibold">{s.name}</div>
                                        <div className="text-sm text-gray-600">{s.address}</div>
                                    </div>
                                    <div className="text-yellow-500">⭐ {s.rating}</div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
};

export default CarModelSelectionPage;
