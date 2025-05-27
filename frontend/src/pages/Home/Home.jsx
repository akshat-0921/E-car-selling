import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import BrandCard from "../../components/brandCard/Brandcard"
import FeatureCard from "../../components/FeatureCard/Featurecard"
import HeroSlider from "../../components/HeroSlider/slider"
import { vehicleAPI } from "../../api"

const Home = () => {
    const navigate = useNavigate()
    const [featuredVehicles, setFeaturedVehicles] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchFeaturedVehicles = async () => {
            try {
                setLoading(true)
                const response = await vehicleAPI.getAllVehicles({ featured: true, limit: 4 })
                if (response.data.success) {
                    setFeaturedVehicles(response.data.vehicles || [])
                } else {
                    console.error("Failed to fetch featured vehicles:", response.data.message)
                }
            } catch (error) {
                console.error("Error fetching featured vehicles:", error)
            } finally {
                setLoading(false)
            }
        }

        fetchFeaturedVehicles()
    }, [])

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
            {/* Hero Slider Section */}
            <HeroSlider />

            {/* Car Brand Section */}
            <section className="container mx-auto py-16 px-4 sm:px-6">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-800 mb-4">Select Your Car Brand</h1>
                    <div className="h-1 w-24 bg-rose-500 mx-auto rounded-full"></div>
                </div>
                <BrandCard />
            </section>

            {/* Featured Vehicles Section (optional) */}
            {featuredVehicles.length > 0 && (
                <section className="container mx-auto py-12 px-4 sm:px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-800 mb-4">Featured Vehicles</h2>
                        <div className="h-1 w-24 bg-rose-500 mx-auto rounded-full"></div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {featuredVehicles.map((vehicle) => (
                            <div
                                key={vehicle._id}
                                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer"
                                onClick={() => navigate(`/vehicles/${vehicle._id}`)}
                            >
                                <img
                                    src={
                                        vehicle.image ||
                                        (vehicle.images && vehicle.images.length > 0 ? vehicle.images[0] : "/placeholder.svg")
                                    }
                                    alt={vehicle.name}
                                    className="w-full h-48 object-cover"
                                />
                                <div className="p-4">
                                    <h3 className="text-lg font-semibold">
                                        {vehicle.brand && typeof vehicle.brand === "object" ? vehicle.brand.name : vehicle.brand}{" "}
                                        {vehicle.name}
                                    </h3>
                                    <p className="text-green-600 font-medium">₹{vehicle.price?.toLocaleString() || "N/A"}</p>
                                    <div className="mt-2 text-sm text-gray-600">
                                        <p>
                                            {vehicle.fuelType || "N/A"} • {vehicle.transmission || "N/A"}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="text-center mt-8">
                        <button
                            onClick={() => navigate("/vehicles")}
                            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
                        >
                            View All Vehicles
                        </button>
                    </div>
                </section>
            )}

            {/* Navigation Buttons Section */}
            <section className="container mx-auto py-12 px-4 sm:px-6">
                <div className="max-w-3xl mx-auto">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <button
                            onClick={() => navigate("/car-model")}
                            className="group relative overflow-hidden rounded-lg bg-white p-6 shadow-lg transition-all duration-300 hover:shadow-xl"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-rose-500 to-rose-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <div className="relative z-10 flex flex-col items-center space-y-3">
                                <span className="text-xl font-semibold text-gray-800 group-hover:text-white transition-colors duration-300">
                                    View Car Model Details
                                </span>
                                <span className="text-sm text-gray-500 group-hover:text-white/80 transition-colors duration-300">
                                    Explore our extensive catalog of car models
                                </span>
                            </div>
                        </button>

                        <button
                            onClick={() => navigate("/search")}
                            className="group relative overflow-hidden rounded-lg bg-white p-6 shadow-lg transition-all duration-300 hover:shadow-xl"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-sky-500 to-sky-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <div className="relative z-10 flex flex-col items-center space-y-3">
                                <span className="text-xl font-semibold text-gray-800 group-hover:text-white transition-colors duration-300">
                                    Search for Cars
                                </span>
                                <span className="text-sm text-gray-500 group-hover:text-white/80 transition-colors duration-300">
                                    Find your perfect car with our advanced search
                                </span>
                            </div>
                        </button>

                        <button
                            onClick={() => navigate("/brand-search")}
                            className="group relative overflow-hidden rounded-lg bg-white p-6 shadow-lg transition-all duration-300 hover:shadow-xl"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <div className="relative z-10 flex flex-col items-center space-y-3">
                                <span className="text-xl font-semibold text-gray-800 group-hover:text-white transition-colors duration-300">
                                    Explore by Brand
                                </span>
                                <span className="text-sm text-gray-500 group-hover:text-white/80 transition-colors duration-300">
                                    Discover cars from your favorite manufacturers
                                </span>
                            </div>
                        </button>

                        <button
                            onClick={() => navigate("/showrooms")}
                            className="group relative overflow-hidden rounded-lg bg-white p-6 shadow-lg transition-all duration-300 hover:shadow-xl"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-violet-500 to-violet-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <div className="relative z-10 flex flex-col items-center space-y-3">
                                <span className="text-xl font-semibold text-gray-800 group-hover:text-white transition-colors duration-300">
                                    View Nearby Showrooms
                                </span>
                                <span className="text-sm text-gray-500 group-hover:text-white/80 transition-colors duration-300">
                                    Find dealerships and showrooms in your area
                                </span>
                            </div>
                        </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
                        <button
                            onClick={() => navigate("/Car-Model-Selection")}
                            className="group relative overflow-hidden rounded-lg bg-white p-6 shadow-lg transition-all duration-300 hover:shadow-xl"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-amber-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <div className="relative z-10 flex flex-col items-center space-y-3">
                                <span className="text-xl font-semibold text-gray-800 group-hover:text-white transition-colors duration-300">
                                    Select Car Model
                                </span>
                                <span className="text-sm text-gray-500 group-hover:text-white/80 transition-colors duration-300">
                                    Choose from our wide range of car models
                                </span>
                            </div>
                        </button>

                        <button
                            onClick={() => navigate("/Test-Drive")}
                            className="group relative overflow-hidden rounded-lg bg-white p-6 shadow-lg transition-all duration-300 hover:shadow-xl"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-orange-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <div className="relative z-10 flex flex-col items-center space-y-3">
                                <span className="text-xl font-semibold text-gray-800 group-hover:text-white transition-colors duration-300">
                                    Test Drive
                                </span>
                                <span className="text-sm text-gray-500 group-hover:text-white/80 transition-colors duration-300">
                                    Schedule a test drive for your favorite car
                                </span>
                            </div>
                        </button>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-16">
                <FeatureCard />
            </section>
        </div>
    )
}

export default Home