
import { useState, useEffect, useContext } from "react"
import { ChevronRight, Filter, Car, Fuel } from "lucide-react"
import { vehicleAPI } from "../../api"
import { VehicleContext } from "../../context/VehicleContext"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"

const SearchPage = () => {
    const navigate = useNavigate()
    const { getVehiclesData } = useContext(VehicleContext)
    const [filters, setFilters] = useState({
        budget: "",
        bodyType: "",
        fuel: "",
        seating: "",
    })
    const [mostSearched, setMostSearched] = useState([])
    const [offersVehicles, setOffersVehicles] = useState([])
    const [newVehicles, setNewVehicles] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)

                // Fetch most searched vehicles
                const mostSearchedResponse = await vehicleAPI.getAllVehicles({ sort: "popularity", limit: 3 })
                if (mostSearchedResponse.data.success) {
                    setMostSearched(mostSearchedResponse.data.vehicles || [])
                }

                // Fetch vehicles with offers
                const offersResponse = await vehicleAPI.getAllVehicles({ hasOffers: true, limit: 3 })
                if (offersResponse.data.success) {
                    setOffersVehicles(offersResponse.data.vehicles || [])
                }

                // Fetch newly added vehicles
                const newVehiclesResponse = await vehicleAPI.getAllVehicles({ sort: "createdAt", limit: 3 })
                if (newVehiclesResponse.data.success) {
                    setNewVehicles(newVehiclesResponse.data.vehicles || [])
                }
            } catch (error) {
                console.error("Error fetching search page data:", error)
                toast.error("Failed to load search data")
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [])

    const handleFilterChange = (e) => {
        const { name, value } = e.target
        setFilters({
            ...filters,
            [name]: value,
        })
    }

    const handleApplyFilters = () => {
        // Convert filters to API-compatible format
        const apiFilters = {}

        if (filters.budget) {
            switch (filters.budget) {
                case "5L":
                    apiFilters.maxPrice = 500000
                    break
                case "10L":
                    apiFilters.minPrice = 500000
                    apiFilters.maxPrice = 1000000
                    break
                case "20L":
                    apiFilters.minPrice = 1000000
                    apiFilters.maxPrice = 2000000
                    break
                case "50L":
                    apiFilters.minPrice = 2000000
                    apiFilters.maxPrice = 5000000
                    break
            }
        }

        if (filters.bodyType) {
            apiFilters.bodyType = filters.bodyType
        }

        if (filters.fuel) {
            apiFilters.fuelType = filters.fuel
        }

        if (filters.seating) {
            apiFilters.seating = filters.seating
        }

        // Apply filters and navigate to vehicles page
        getVehiclesData(apiFilters)
        navigate("/vehicles")
    }

    const handleCompareClick = (type) => {
        // Handle comparison navigation based on type
        switch (type) {
            case "brand":
                navigate("/brand-search")
                break
            case "budget":
                navigate("/vehicles?compare=budget")
                break
            case "bodyType":
                navigate("/vehicles?compare=bodyType")
                break
            case "fuelType":
                navigate("/vehicles?compare=fuelType")
                break
            default:
                navigate("/vehicles")
        }
    }

    return (
        <div className="min-h-screen bg-slate-50 p-6 flex flex-col md:flex-row gap-6">
            {/* Filters Sidebar */}
            <div className="w-full md:w-1/4 bg-white p-5 rounded-xl shadow-md">
                <h2 className="flex items-center gap-2 text-xl font-semibold mb-4">
                    <Filter className="h-5 w-5" />
                    Filters
                </h2>

                <div className="space-y-4">
                    {/* Budget */}
                    <div>
                        <label className="block text-sm font-medium mb-1">By Budget</label>
                        <select
                            name="budget"
                            value={filters.budget}
                            onChange={handleFilterChange}
                            className="w-full border rounded px-3 py-2"
                        >
                            <option value="">Select Budget</option>
                            <option value="5L">Up to ₹5 Lakh</option>
                            <option value="10L">₹5L - ₹10L</option>
                            <option value="20L">₹10L - ₹20L</option>
                            <option value="50L">₹20L - ₹50L</option>
                        </select>
                    </div>

                    {/* Body Type */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Body Type</label>
                        <select
                            name="bodyType"
                            value={filters.bodyType}
                            onChange={handleFilterChange}
                            className="w-full border rounded px-3 py-2"
                        >
                            <option value="">Select Type</option>
                            <option value="SUV">SUV</option>
                            <option value="Sedan">Sedan</option>
                            <option value="Hatchback">Hatchback</option>
                        </select>
                    </div>

                    {/* Fuel Type */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Fuel Type</label>
                        <select
                            name="fuel"
                            value={filters.fuel}
                            onChange={handleFilterChange}
                            className="w-full border rounded px-3 py-2"
                        >
                            <option value="">Select Fuel</option>
                            <option value="Petrol">Petrol</option>
                            <option value="Diesel">Diesel</option>
                            <option value="Electric">Electric</option>
                        </select>
                    </div>

                    {/* Seating Capacity */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Seating Capacity</label>
                        <select
                            name="seating"
                            value={filters.seating}
                            onChange={handleFilterChange}
                            className="w-full border rounded px-3 py-2"
                        >
                            <option value="">Select Seating</option>
                            <option value="2">2-Seater</option>
                            <option value="5">5-Seater</option>
                            <option value="7">7-Seater</option>
                        </select>
                    </div>

                    <button
                        className="w-full bg-blue-600 text-white py-2 rounded mt-4 hover:bg-blue-700 transition"
                        onClick={handleApplyFilters}
                    >
                        Apply Filters
                    </button>
                </div>
            </div>

            {/* Right Section */}
            <div className="w-full md:w-3/4 space-y-6">
                {loading ? (
                    <div className="bg-white p-5 rounded-xl shadow-md flex justify-center items-center h-64">
                        <p className="text-gray-500">Loading search data...</p>
                    </div>
                ) : (
                    <>
                        {/* Comparison Section */}
                        <div className="bg-white p-5 rounded-xl shadow-md">
                            <h2 className="text-xl font-semibold mb-4">Compare Cars</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {[
                                    { icon: <Car className="h-4 w-4" />, label: "By Brand", type: "brand" },
                                    { icon: <span className="font-mono text-sm">₹</span>, label: "By Budget", type: "budget" },
                                    { icon: <Car className="h-4 w-4" />, label: "By Body Type", type: "bodyType" },
                                    { icon: <Fuel className="h-4 w-4" />, label: "By Fuel Type", type: "fuelType" },
                                ].map((item, idx) => (
                                    <button
                                        key={idx}
                                        className="flex justify-between items-center border px-4 py-3 rounded hover:bg-slate-100"
                                        onClick={() => handleCompareClick(item.type)}
                                    >
                                        <span className="flex items-center gap-2">
                                            {item.icon} {item.label}
                                        </span>
                                        <ChevronRight className="h-4 w-4 opacity-50" />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Featured Sections */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Most Searched Cars */}
                            <div className="bg-white p-5 rounded-xl shadow-md">
                                <h3 className="text-lg font-semibold mb-4">Most Searched Cars</h3>
                                <ul className="space-y-3">
                                    {mostSearched.length > 0 ? (
                                        mostSearched.map((car, index) => (
                                            <li
                                                key={car._id || index}
                                                className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded"
                                                onClick={() => navigate(`/vehicles/${car._id}`)}
                                            >
                                                <span className="bg-gray-200 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                                                    {index + 1}
                                                </span>
                                                {car.brand && typeof car.brand === "object" ? car.brand.name : car.brand} {car.name}
                                            </li>
                                        ))
                                    ) : (
                                        <li className="text-gray-500">No data available</li>
                                    )}
                                </ul>
                            </div>

                            {/* Cars with Offers */}
                            <div className="bg-white p-5 rounded-xl shadow-md">
                                <h3 className="text-lg font-semibold mb-4">Cars with Exciting Offers</h3>
                                <ul className="space-y-3">
                                    {offersVehicles.length > 0 ? (
                                        offersVehicles.map((car, index) => (
                                            <li
                                                key={car._id || index}
                                                className="flex justify-between items-center cursor-pointer hover:bg-gray-50 p-2 rounded"
                                                onClick={() => navigate(`/vehicles/${car._id}`)}
                                            >
                                                <span>
                                                    {car.brand && typeof car.brand === "object" ? car.brand.name : car.brand} {car.name}
                                                </span>
                                                <span className="text-red-600 font-semibold text-sm bg-red-100 px-2 py-1 rounded">
                                                    {car.offerAmount ? `₹${car.offerAmount.toLocaleString()} Off` : "Special Offer"}
                                                </span>
                                            </li>
                                        ))
                                    ) : (
                                        <li className="text-gray-500">No offers available</li>
                                    )}
                                </ul>
                            </div>

                            {/* Newly Added Cars */}
                            <div className="md:col-span-2 bg-white p-5 rounded-xl shadow-md">
                                <h3 className="text-lg font-semibold mb-4">Newly Added Cars</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    {newVehicles.length > 0 ? (
                                        newVehicles.map((car, index) => (
                                            <div
                                                key={car._id || index}
                                                className="text-center border rounded p-4 hover:bg-slate-50 transition cursor-pointer"
                                                onClick={() => navigate(`/vehicles/${car._id}`)}
                                            >
                                                <div className="w-16 h-16 mx-auto bg-slate-100 rounded-full flex items-center justify-center mb-3">
                                                    <Car className="h-8 w-8 text-slate-500" />
                                                </div>
                                                <p className="font-medium">
                                                    {car.brand && typeof car.brand === "object" ? car.brand.name : car.brand} {car.name}
                                                </p>
                                                <span className="inline-block mt-2 text-xs bg-gray-200 text-gray-700 px-2 py-0.5 rounded">
                                                    New
                                                </span>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="col-span-3 text-center text-gray-500">No new vehicles available</div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

export default SearchPage
