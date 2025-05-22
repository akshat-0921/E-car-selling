
import { useState, useEffect } from "react"
import { vehicleAPI, showroomAPI } from "../../api"
import { toast } from "react-toastify"

const CarModelSelectionPage = () => {
    const [hoveredIndex, setHoveredIndex] = useState(null)
    const [carModels, setCarModels] = useState([])
    const [showrooms, setShowrooms] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)

                // Fetch car models
                const carResponse = await vehicleAPI.getAllVehicles({ limit: 10 })
                if (carResponse.data.success) {
                    const models = carResponse.data.vehicles.map((vehicle) => ({
                        _id: vehicle._id,
                        name: vehicle.name,
                        price: `₹${(vehicle.price / 100000).toFixed(1)}L - ₹${((vehicle.price + 700000) / 100000).toFixed(1)}L`,
                        rating: vehicle.rating || (Math.random() * 1.5 + 3.5).toFixed(1), // Fallback to random rating between 3.5-5
                        reviews: vehicle.reviews || Math.floor(Math.random() * 200 + 100), // Fallback to random number of reviews
                        image:
                            vehicle.image || (vehicle.images && vehicle.images.length > 0 ? vehicle.images[0] : "/placeholder.svg"),
                        specs: [
                            vehicle.fuelType || "Petrol",
                            vehicle.transmission || "Automatic",
                            `${vehicle.seating || 5} Seater`,
                            `${vehicle.power || "N/A"} BHP`,
                        ],
                    }))
                    setCarModels(models)
                } else {
                    toast.error(carResponse.data.message || "Failed to fetch car models")
                }

                // Fetch showrooms
                const showroomResponse = await showroomAPI.getAllShowrooms({ limit: 3 })
                if (showroomResponse.data.success) {
                    setShowrooms(showroomResponse.data.showrooms || [])
                } else {
                    toast.error(showroomResponse.data.message || "Failed to fetch showrooms")
                }
            } catch (error) {
                console.error("Error fetching data:", error)
                toast.error(error.response?.data?.message || "Failed to fetch data")
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [])

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <p className="text-gray-500">Loading car models...</p>
            </div>
        )
    }

    return (
        <div className="bg-gray-50 py-12">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
                <h1 className="text-4xl font-bold text-gray-800 mb-8">Select a Car Model</h1>

                <div className="space-y-6">
                    {carModels.length === 0 ? (
                        <div className="text-center py-10">
                            <p className="text-gray-500">No car models available</p>
                        </div>
                    ) : (
                        carModels.map((car, index) => (
                            <div
                                key={car._id || index}
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
                                                <img
                                                    src={car.image || "/placeholder.svg"}
                                                    alt={car.name}
                                                    className="w-full h-48 object-cover"
                                                />
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
                        ))
                    )}
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
                                {carModels.slice(0, 2).map((car, index) => (
                                    <tr key={car._id || index} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 font-medium text-gray-800">{car.name}</td>
                                        <td className="px-6 py-4 text-gray-700">{Math.floor(Math.random() * 5 + 12)} km/l</td>
                                        <td className="px-6 py-4 text-gray-700">{Math.floor(Math.random() * 5 + 15)} km/l</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Nearby Showrooms */}
                <div className="mt-16">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Nearby Showrooms</h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        {showrooms.length === 0 ? (
                            <div className="col-span-3 text-center py-10">
                                <p className="text-gray-500">No showrooms available</p>
                            </div>
                        ) : (
                            showrooms
                                .sort((a, b) => (b.rating || 0) - (a.rating || 0))
                                .map((s, i) => (
                                    <div
                                        key={s._id || i}
                                        className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition"
                                    >
                                        <div className="flex justify-between items-start mb-3">
                                            <h3 className="font-bold text-lg text-gray-800">{s.name}</h3>
                                            <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-md">
                                                <span className="text-yellow-500">★</span>
                                                <span className="font-medium">{s.rating || "N/A"}</span>
                                            </div>
                                        </div>
                                        <p className="text-gray-600">{s.address}</p>
                                        <button className="mt-4 w-full text-indigo-600 border border-indigo-600 px-4 py-2 rounded-lg hover:bg-indigo-50 transition text-sm font-medium">
                                            Get Directions
                                        </button>
                                    </div>
                                ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CarModelSelectionPage
