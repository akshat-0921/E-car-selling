
import { useState, useEffect } from "react"
import { Phone, MapPin, Star, Calendar } from "lucide-react"
import { showroomAPI } from "../../api"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"

const ShowroomPage = () => {
    const navigate = useNavigate()
    const [showrooms, setShowrooms] = useState([])
    const [filterBrand, setFilterBrand] = useState("all")
    const [sort, setSort] = useState("top")
    const [loading, setLoading] = useState(true)
    const [brands, setBrands] = useState([])

    useEffect(() => {
        const fetchShowrooms = async () => {
            try {
                setLoading(true)
                const response = await showroomAPI.getAllShowrooms()
                if (response.data.success) {
                    setShowrooms(response.data.showrooms || [])

                    // Extract unique brands from showrooms
                    const uniqueBrands = [
                        ...new Set(
                            response.data.showrooms.map((s) => {
                                const brandName = s.brand?.name || s.brand || "Unknown"
                                return brandName
                            }),
                        ),
                    ]

                    setBrands(uniqueBrands)
                } else {
                    toast.error(response.data.message || "Failed to fetch showrooms")
                }
            } catch (error) {
                console.error("Error fetching showrooms:", error)
                toast.error(error.response?.data?.message || "Failed to fetch showrooms")
            } finally {
                setLoading(false)
            }
        }

        fetchShowrooms()
    }, [])

    const filteredShowrooms = showrooms
        .filter((s) => {
            if (filterBrand === "all") return true
            const brandName = s.brand?.name || s.brand || ""
            return brandName.toLowerCase().includes(filterBrand.toLowerCase())
        })
        .sort((a, b) => {
            if (sort === "top") {
                return (b.rating || 0) - (a.rating || 0)
            } else {
                const nameA = a.name || ""
                const nameB = b.name || ""
                return nameA.localeCompare(nameB)
            }
        })

    const handleBookTestDrive = (showroomId) => {
        navigate(`/Test-Drive?showroom=${showroomId}`)
    }

    return (
        <div className="bg-slate-50 min-h-screen">
            <div className="max-w-6xl mx-auto p-6 pt-16">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-800">Car Dealers Near You</h1>
                        <p className="text-slate-500 mt-1">Find the best car showrooms in your area</p>
                    </div>

                    <div className="flex flex-wrap gap-3">
                        <select
                            value={filterBrand}
                            onChange={(e) => setFilterBrand(e.target.value)}
                            className="border border-gray-300 rounded px-4 py-2 bg-white text-sm"
                        >
                            <option value="all">All Brands</option>
                            {brands.map((brand, index) => (
                                <option key={index} value={brand.toLowerCase()}>
                                    {brand}
                                </option>
                            ))}
                        </select>

                        <select
                            value={sort}
                            onChange={(e) => setSort(e.target.value)}
                            className="border border-gray-300 rounded px-4 py-2 bg-white text-sm"
                        >
                            <option value="top">Top Rated</option>
                            <option value="name">Name</option>
                        </select>
                    </div>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <p className="text-gray-500">Loading showrooms...</p>
                    </div>
                ) : filteredShowrooms.length === 0 ? (
                    <div className="flex justify-center items-center h-64">
                        <p className="text-gray-500">No showrooms found matching your criteria</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredShowrooms.map((showroom) => (
                            <div
                                key={showroom._id || showroom.id}
                                className="bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition-all"
                            >
                                <div className="relative">
                                    <img
                                        src={showroom.image || "/placeholder.svg?height=200&width=300"}
                                        alt={showroom.name}
                                        className="w-full h-48 object-cover"
                                    />
                                    <div className="absolute top-3 right-3 bg-yellow-100 text-yellow-800 text-xs font-semibold px-2 py-1 rounded flex items-center gap-1">
                                        <Star className="h-3 w-3 fill-yellow-500 stroke-yellow-500" />
                                        <span>{showroom.rating || "N/A"}</span>
                                    </div>
                                </div>

                                <div className="p-4">
                                    <h2 className="text-lg font-semibold text-slate-800">{showroom.name}</h2>
                                    <p className="text-sm text-slate-500 mt-1 flex items-center gap-1">
                                        <MapPin className="h-4 w-4" />
                                        {showroom.address}
                                    </p>
                                </div>

                                <div className="px-4 pb-4 flex gap-2">
                                    <a
                                        href={`tel:${showroom.phone}`}
                                        className="flex-1 bg-white border border-gray-300 text-slate-700 text-sm px-3 py-2 rounded flex items-center justify-center gap-1 hover:bg-gray-100"
                                    >
                                        <Phone className="h-4 w-4" />
                                        Call
                                    </a>
                                    <button
                                        className="flex-1 bg-blue-600 text-white text-sm px-3 py-2 rounded flex items-center justify-center gap-1 hover:bg-blue-700"
                                        onClick={() => handleBookTestDrive(showroom._id || showroom.id)}
                                    >
                                        <Calendar className="h-4 w-4" />
                                        Book Test Drive
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default ShowroomPage
