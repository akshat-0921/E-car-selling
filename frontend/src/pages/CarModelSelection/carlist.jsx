import { useState } from "react"

const carModels = [
    {
        name: "Audi A4",
        price: "₹45L - ₹52L",
        rating: 4.5,
        reviews: 230,
        image: "https://via.placeholder.com/150",
        specs: ["Petrol", "Automatic", "5 Seater", "190 BHP"],
    },
    {
        name: "BMW 3 Series",
        price: "₹48L - ₹55L",
        rating: 4.7,
        reviews: 280,
        image: "https://via.placeholder.com/150",
        specs: ["Petrol", "Automatic", "5 Seater", "255 BHP"],
    },
]

const showrooms = [
    { name: "Audi Delhi", rating: 4.8, address: "Ring Road, Delhi" },
    { name: "BMW Gurugram", rating: 4.6, address: "Sector 29, Gurugram" },
    { name: "Premium Auto Noida", rating: 4.5, address: "Sector 18, Noida" },
]

const CarModelSelectionPage = () => {
    const [hoveredIndex, setHoveredIndex] = useState(null)

    return (
        <div className="bg-gray-50 py-12">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
                <h1 className="text-4xl font-bold text-gray-800 mb-8">Select a Car Model</h1>

                <div className="space-y-6">
                    {carModels.map((car, index) => (
                        <div
                            key={car.name}
                            className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md"
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                        >
                            <div className="p-6">
                                <div className="flex flex-wrap items-center justify-between gap-4">
                                    <div className="text-xl font-bold text-gray-800">{car.name}</div>
                                    <div className="font-medium text-gray-700">{car.price}</div>
                                    <div className="flex items-center gap-1 bg-yellow-50 px-3 py-1 rounded-full">
                                        <span className="text-yellow-500">★</span>
                                        <span className="font-medium">{car.rating}</span>
                                    </div>
                                    <div className="text-sm text-gray-500">{car.reviews} reviews</div>
                                    <button className="text-indigo-600 hover:text-indigo-800 font-medium flex items-center gap-1">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-4 w-4"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                        </svg>
                                        Add to Compare
                                    </button>
                                </div>

                                {hoveredIndex === index && (
                                    <div className="mt-6 grid md:grid-cols-2 gap-6 pt-6 border-t border-gray-100">
                                        <div className="bg-gray-100 rounded-lg overflow-hidden">
                                            <img src={car.image || "/placeholder.svg"} alt={car.name} className="w-full h-48 object-cover" />
                                        </div>
                                        <div>
                                            <h4 className="text-lg font-semibold text-gray-800 mb-3">Specifications:</h4>
                                            <ul className="grid grid-cols-2 gap-2">
                                                {car.specs.map((spec, i) => (
                                                    <li key={i} className="flex items-center gap-2 text-gray-700">
                                                        <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
                                                        {spec}
                                                    </li>
                                                ))}
                                            </ul>
                                            <div className="mt-6">
                                                <button className="bg-indigo-600 text-white px-6 py-2.5 rounded-lg hover:bg-indigo-700 transition shadow-sm hover:shadow flex items-center gap-2">
                                                    View Offers
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="h-4 w-4"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                    >
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Mileage Table */}
                <div className="mt-16">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Mileage Comparison</h2>
                    <div className="overflow-hidden bg-white shadow-sm rounded-xl border border-gray-200">
                        <table className="w-full table-auto">
                            <thead>
                                <tr className="bg-gray-50 text-left">
                                    <th className="px-6 py-4 font-semibold text-gray-800">Model</th>
                                    <th className="px-6 py-4 font-semibold text-gray-800">City Mileage</th>
                                    <th className="px-6 py-4 font-semibold text-gray-800">Highway Mileage</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                <tr className="hover:bg-gray-50">
                                    <td className="px-6 py-4 font-medium text-gray-800">Audi A4</td>
                                    <td className="px-6 py-4 text-gray-700">15 km/l</td>
                                    <td className="px-6 py-4 text-gray-700">18 km/l</td>
                                </tr>
                                <tr className="hover:bg-gray-50">
                                    <td className="px-6 py-4 font-medium text-gray-800">BMW 3 Series</td>
                                    <td className="px-6 py-4 text-gray-700">14 km/l</td>
                                    <td className="px-6 py-4 text-gray-700">17 km/l</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Nearby Showrooms */}
                <div className="mt-16">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Nearby Showrooms</h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        {showrooms
                            .sort((a, b) => b.rating - a.rating)
                            .map((s, i) => (
                                <div
                                    key={i}
                                    className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition"
                                >
                                    <div className="flex justify-between items-start mb-3">
                                        <h3 className="font-bold text-lg text-gray-800">{s.name}</h3>
                                        <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-md">
                                            <span className="text-yellow-500">★</span>
                                            <span className="font-medium">{s.rating}</span>
                                        </div>
                                    </div>
                                    <p className="text-gray-600">{s.address}</p>
                                    <button className="mt-4 w-full text-indigo-600 border border-indigo-600 px-4 py-2 rounded-lg hover:bg-indigo-50 transition text-sm font-medium">
                                        Get Directions
                                    </button>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CarModelSelectionPage
