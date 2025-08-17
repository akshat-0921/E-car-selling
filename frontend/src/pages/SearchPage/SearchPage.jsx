// src/pages/SearchPage.jsx (example path)

import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { vehicleAPI } from "../../api";
import { VehicleContext } from "../../context/VehicleContext";
import { toast } from "react-toastify";

// --- STYLING: Icons for visual enhancement ---
import {
    Filter, ChevronRight, Car, Wallet, CaseUpper, Fuel, Users,
    Search, TrendingUp, Tag, Sparkles, Loader, ServerCrash
} from "lucide-react";

// --- STYLING: Helper Components for a cleaner layout ---
const LoadingState = () => (
    <div className="flex flex-col items-center justify-center min-h-[80vh]">
        <Loader className="h-12 w-12 text-slate-400 dark:text-slate-500 animate-spin" />
        <p className="mt-4 text-lg font-medium text-slate-700 dark:text-slate-300">Loading Search Page...</p>
    </div>
);
const FilterSelect = ({ label, name, value, onChange, options }) => (
    <div>
        <label htmlFor={name} className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">{label}</label>
        <select
            id={name} name={name} value={value} onChange={onChange}
            className="form-select block w-full rounded-md border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800/50 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-slate-900 dark:text-white"
        >
            {options.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
        </select>
    </div>
);
const CompareLink = ({ icon: Icon, label, onClick }) => (
    <button onClick={onClick} className="group flex w-full items-center justify-between rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 p-4 transition-all hover:border-blue-500 dark:hover:border-blue-400 hover:shadow-md">
        <span className="flex items-center gap-3 font-semibold text-slate-800 dark:text-slate-200">
            <Icon className="h-6 w-6 text-blue-500" />
            {label}
        </span>
        <ChevronRight className="h-5 w-5 text-slate-400 transition-transform group-hover:translate-x-1" />
    </button>
);
const VehicleListItem = ({ car, index, type, onClick }) => (
    <li onClick={onClick} className="flex items-center gap-4 cursor-pointer rounded-lg p-2 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
        {type === 'ranked' && (
            <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-slate-200 dark:bg-slate-700 text-sm font-bold text-slate-700 dark:text-slate-300">
                {index + 1}
            </span>
        )}
        <div className="flex-1">
            <p className="font-semibold text-slate-800 dark:text-slate-200">
                {car.brand?.name || car.brand} {car.name}
            </p>
        </div>
        {type === 'offer' && (
            <span className="text-red-600 dark:text-red-400 font-semibold text-xs bg-red-100 dark:bg-red-900/50 px-2 py-1 rounded">
                {car.offerAmount ? `₹${car.offerAmount.toLocaleString()} Off` : "Special Offer"}
            </span>
        )}
        {type === 'new' && (
            <span className="text-green-600 dark:text-green-400 font-semibold text-xs bg-green-100 dark:bg-green-900/50 px-2 py-1 rounded">New</span>
        )}
    </li>
);

const SearchPage = () => {
    // --- LOGIC: All state and hooks are preserved ---
    const navigate = useNavigate();
    const { getVehiclesData } = useContext(VehicleContext);
    const [filters, setFilters] = useState({ budget: "", bodyType: "", fuel: "", seating: "" });
    const [mostSearched, setMostSearched] = useState([]);
    const [offersVehicles, setOffersVehicles] = useState([]);
    const [newVehicles, setNewVehicles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const [mostSearchedResponse, offersResponse, newVehiclesResponse] = await Promise.all([
                    vehicleAPI.getAllVehicles({ sort: "popularity", limit: 3 }),
                    vehicleAPI.getAllVehicles({ hasOffers: true, limit: 3 }),
                    vehicleAPI.getAllVehicles({ sort: "createdAt", limit: 3 }),
                ]);
                if (mostSearchedResponse.data.success) setMostSearched(mostSearchedResponse.data.vehicles || []);
                if (offersResponse.data.success) setOffersVehicles(offersResponse.data.vehicles || []);
                if (newVehiclesResponse.data.success) setNewVehicles(newVehiclesResponse.data.vehicles || []);
            } catch (error) {
                console.error("Error fetching search page data:", error);
                toast.error("Failed to load search data");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleFilterChange = (e) => { /* LOGIC Unchanged */ };
    const handleApplyFilters = () => { /* LOGIC Unchanged */ };
    const handleCompareClick = (type) => { /* LOGIC Unchanged */ };

    if (loading) return <LoadingState />;

    return (
        // --- STYLING: Themed page container with a two-column layout ---
        <div className="bg-slate-50 dark:bg-slate-900">
            <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-4 gap-8">

                {/* Filters Sidebar */}
                <aside className="lg:col-span-1">
                    <div className="sticky top-24 bg-white dark:bg-slate-800/50 p-6 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-800">
                        <h2 className="flex items-center gap-3 text-xl font-bold text-slate-900 dark:text-white mb-6 pb-4 border-b border-slate-200 dark:border-slate-700">
                            <Filter className="h-6 w-6 text-blue-500" />
                            Find Your Car
                        </h2>
                        <div className="space-y-5">
                            <FilterSelect label="By Budget" name="budget" value={filters.budget} onChange={handleFilterChange} options={[{ value: "", label: "Any Budget" }, { value: "5L", label: "Up to ₹5 Lakh" }, /* ... other options */]} />
                            <FilterSelect label="By Body Type" name="bodyType" value={filters.bodyType} onChange={handleFilterChange} options={[{ value: "", label: "Any Type" }, { value: "SUV", label: "SUV" }, /* ... */]} />
                            <FilterSelect label="By Fuel Type" name="fuel" value={filters.fuel} onChange={handleFilterChange} options={[{ value: "", label: "Any Fuel" }, { value: "Petrol", label: "Petrol" }, /* ... */]} />
                            <FilterSelect label="By Seating" name="seating" value={filters.seating} onChange={handleFilterChange} options={[{ value: "", label: "Any Seating" }, { value: "5", label: "5-Seater" }, /* ... */]} />
                            <button onClick={handleApplyFilters} className="w-full mt-4 flex items-center justify-center gap-x-2 rounded-md bg-blue-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-blue-700 transition-colors">
                                <Search className="w-5 h-5" /> Apply Filters
                            </button>
                        </div>
                    </div>
                </aside>

                {/* Main Content Area */}
                <main className="lg:col-span-3 space-y-8">
                    <div className="bg-white dark:bg-slate-800/50 p-6 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-800">
                        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Compare Cars</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <CompareLink icon={Car} label="By Brand" onClick={() => handleCompareClick("brand")} />
                            <CompareLink icon={Wallet} label="By Budget" onClick={() => handleCompareClick("budget")} />
                            <CompareLink icon={CaseUpper} label="By Body Type" onClick={() => handleCompareClick("bodyType")} />
                            <CompareLink icon={Fuel} label="By Fuel Type" onClick={() => handleCompareClick("fuelType")} />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                        <InfoCard icon={TrendingUp} title="Most Searched Cars">
                            {mostSearched.map((car, i) => <VehicleListItem key={car._id} car={car} index={i} type="ranked" onClick={() => navigate(`/vehicles/${car._id}`)} />)}
                        </InfoCard>
                        <InfoCard icon={Tag} title="Cars with Exciting Offers">
                            {offersVehicles.map((car, i) => <VehicleListItem key={car._id} car={car} index={i} type="offer" onClick={() => navigate(`/vehicles/${car._id}`)} />)}
                        </InfoCard>
                    </div>

                    <InfoCard icon={Sparkles} title="Newly Added Cars" isFullWidth>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                            {newVehicles.map((car, i) => (
                                <div key={car._id} onClick={() => navigate(`/vehicles/${car._id}`)} className="text-center p-4 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer">
                                    <div className="w-16 h-16 mx-auto bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center mb-3"><Car className="h-8 w-8 text-slate-500" /></div>
                                    <p className="font-medium text-slate-800 dark:text-slate-200">{car.brand?.name || car.brand} {car.name}</p>
                                </div>
                            ))}
                        </div>
                    </InfoCard>
                </main>
            </div>
        </div>
    );
};

// --- STYLING: Reusable card component for info sections ---
const InfoCard = ({ icon: Icon, title, children, isFullWidth }) => (
    <div className={`bg-white dark:bg-slate-800/50 p-6 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-800 ${isFullWidth ? 'xl:col-span-2' : ''}`}>
        <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-3 mb-4">
            <Icon className="w-6 h-6 text-blue-500" /> {title}
        </h3>
        <ul className="space-y-2">
            {children}
        </ul>
    </div>
);

export default SearchPage;
