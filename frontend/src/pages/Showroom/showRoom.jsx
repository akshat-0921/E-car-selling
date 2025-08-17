// src/pages/ShowroomPage.jsx (example path)

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { showroomAPI } from "../../api";
import { toast } from "react-toastify";
import NearbyShowrooms from "../../components/NearbyShowrooms/NearbyShowrooms";

// --- STYLING: Icons for visual enhancement ---
import { Phone, MapPin, Star, Calendar, ArrowRight, Loader, ServerCrash } from "lucide-react";

// --- STYLING: Helper components for loading and empty states ---
const LoadingState = () => (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <Loader className="h-12 w-12 text-slate-400 dark:text-slate-500 animate-spin" />
        <p className="mt-4 text-lg font-medium text-slate-700 dark:text-slate-300">Loading Showrooms...</p>
    </div>
);
const EmptyState = ({ message }) => (
    <div className="col-span-full flex flex-col items-center justify-center py-20 text-center">
        <ServerCrash className="h-12 w-12 text-slate-400 dark:text-slate-500" />
        <p className="mt-4 text-lg font-medium text-slate-700 dark:text-slate-300">{message}</p>
    </div>
);

const ShowroomPage = () => {
    // --- LOGIC: All state and hooks are preserved ---
    const navigate = useNavigate();
    const [showrooms, setShowrooms] = useState([]);
    const [brands, setBrands] = useState([]);
    const [filterBrand, setFilterBrand] = useState("all");
    const [sort, setSort] = useState("top");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchShowrooms = async () => {
            try {
                setLoading(true);
                const { data } = await showroomAPI.getAllShowrooms();
                if (data.success) {
                    setShowrooms(data.showrooms || []);
                    const uniqueBrands = [...new Set(data.showrooms.map((s) => s.brand?.name || s.brand || "Unknown"))];
                    setBrands(uniqueBrands);
                } else {
                    toast.error(data.message || "Failed to fetch showrooms");
                }
            } catch (error) {
                console.error("Error fetching showrooms:", error);
                toast.error(error.response?.data?.message || "Failed to fetch showrooms");
            } finally {
                setLoading(false);
            }
        };
        fetchShowrooms();
    }, []);

    const filteredShowrooms = showrooms
        .filter((s) => {
            if (filterBrand === "all") return true;
            const brandName = s.brand?.name || s.brand || "";
            return brandName.toLowerCase().includes(filterBrand.toLowerCase());
        })
        .sort((a, b) => {
            if (sort === "top") return (b.rating || 0) - (a.rating || 0);
            return (a.name || "").localeCompare(b.name || "");
        });

    const handleBookTestDrive = (showroomId) => {
        navigate(`/Test-Drive?showroom=${showroomId}`);
    };

    return (
        // --- STYLING: Themed page container ---
        <div className="bg-slate-50 dark:bg-slate-900 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
                {/* Nearby Showrooms Section */}
                <div className="mb-16">
                    <NearbyShowrooms />
                </div>

                {/* Header + Filters */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10 pb-8 border-b border-slate-200 dark:border-slate-800">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">All Car Showrooms</h1>
                        <p className="text-slate-600 dark:text-slate-400 mt-1">Find the best authorized dealerships in your area.</p>
                    </div>
                    <div className="flex flex-wrap gap-4">
                        <select
                            value={filterBrand}
                            onChange={(e) => setFilterBrand(e.target.value)}
                            className="form-select rounded-md border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        >
                            <option value="all">All Brands</option>
                            {brands.map((brand, i) => (
                                <option key={i} value={brand.toLowerCase()}>{brand}</option>
                            ))}
                        </select>
                        <select
                            value={sort}
                            onChange={(e) => setSort(e.target.value)}
                            className="form-select rounded-md border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        >
                            <option value="top">Sort by: Top Rated</option>
                            <option value="name">Sort by: Name</option>
                        </select>
                    </div>
                </div>

                {/* Showroom Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {loading ? (
                        <div className="col-span-full"><LoadingState /></div>
                    ) : filteredShowrooms.length === 0 ? (
                        <EmptyState message="No showrooms found matching your criteria." />
                    ) : (
                        filteredShowrooms.map((showroom) => (
                            <ShowroomCard key={showroom._id} showroom={showroom} onBookTestDrive={handleBookTestDrive} />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

// --- STYLING: A dedicated component for the showroom card for cleaner code ---
const ShowroomCard = ({ showroom, onBookTestDrive }) => (
    <div className="group bg-white dark:bg-slate-800/50 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5">
        <div className="relative">
            <img
                src={showroom.image || "/placeholder.svg?height=200&width=300"}
                alt={showroom.name}
                className="w-full h-48 object-cover"
            />
            <div className="absolute top-3 right-3 flex items-center gap-1 bg-yellow-100 dark:bg-yellow-900/50 px-2 py-1 rounded-full text-xs font-semibold">
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                <span className="text-yellow-800 dark:text-yellow-300">{showroom.rating || "N/A"}</span>
            </div>
        </div>
        <div className="p-6 flex-1 flex flex-col">
            <div className="flex-1">
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">{showroom.name}</h2>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 flex items-start gap-2">
                    <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    {showroom.address}
                </p>
            </div>
            <div className="mt-6 flex gap-3">
                <a
                    href={`tel:${showroom.phone}`}
                    className="flex-1 text-center px-4 py-2 text-sm font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-700/50 rounded-md hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                >
                    Call Now
                </a>
                <button
                    onClick={() => onBookTestDrive(showroom._id)}
                    className="flex-1 flex items-center justify-center gap-x-2 text-sm font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
                >
                    <Calendar className="h-4 w-4" /> Book Drive
                </button>
            </div>
        </div>
    </div>
);

export default ShowroomPage;
