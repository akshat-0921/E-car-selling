// src/pages/CarModelSelectionPage.jsx (example path)

import { useState, useEffect } from "react";
import { vehicleAPI, showroomAPI } from "../../api";
import { toast } from "react-toastify";
import { Disclosure } from "@headlessui/react";

// --- STYLING: Icons for visual enhancement ---
import {
    ChevronUp, Star, GitCompareArrows, ArrowRight, MapPin,
    Loader, ServerCrash, Fuel, Cog, Users, Zap
} from "lucide-react";

// --- STYLING: Helper components for loading and empty states ---
const LoadingState = () => (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Loader className="h-12 w-12 text-slate-400 dark:text-slate-500 animate-spin" />
        <p className="mt-4 text-lg font-medium text-slate-700 dark:text-slate-300">Loading Car Models...</p>
    </div>
);
const EmptyState = ({ message }) => (
    <div className="flex flex-col items-center justify-center py-20 text-center">
        <ServerCrash className="h-12 w-12 text-slate-400 dark:text-slate-500" />
        <p className="mt-4 text-lg font-medium text-slate-700 dark:text-slate-300">{message}</p>
    </div>
);

const CarModelSelectionPage = () => {
    // --- LOGIC: All state and hooks are preserved ---
    const [carModels, setCarModels] = useState([]);
    const [showrooms, setShowrooms] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                // Fetch car models
                const carResponse = await vehicleAPI.getAllVehicles({ limit: 10 });
                if (carResponse.data.success) {
                    const models = carResponse.data.vehicles.map((vehicle) => ({
                        _id: vehicle._id,
                        name: vehicle.name,
                        price: `₹${(vehicle.price / 100000).toFixed(1)}L - ₹${((vehicle.price + 700000) / 100000).toFixed(1)}L`,
                        rating: vehicle.rating || (Math.random() * 1.5 + 3.5).toFixed(1),
                        reviews: vehicle.reviews || Math.floor(Math.random() * 200 + 100),
                        image: vehicle.image || (vehicle.images && vehicle.images.length > 0 ? vehicle.images[0] : "/placeholder.svg"),
                        specs: [
                            { icon: Fuel, label: vehicle.fuelType || "Petrol" },
                            { icon: Cog, label: vehicle.transmission || "Automatic" },
                            { icon: Users, label: `${vehicle.seating || 5} Seater` },
                            { icon: Zap, label: `${vehicle.power || "N/A"} BHP` },
                        ],
                    }));
                    setCarModels(models);
                } else {
                    toast.error(carResponse.data.message || "Failed to fetch car models");
                }
                // Fetch showrooms
                const showroomResponse = await showroomAPI.getAllShowrooms({ limit: 3 });
                if (showroomResponse.data.success) {
                    setShowrooms(showroomResponse.data.showrooms || []);
                } else {
                    toast.error(showroomResponse.data.message || "Failed to fetch showrooms");
                }
            } catch (error) {
                console.error("Error fetching data:", error);
                toast.error(error.response?.data?.message || "Failed to fetch data");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) return <div className="bg-white dark:bg-slate-900"><LoadingState /></div>;

    return (
        // --- STYLING: Themed page container ---
        <div className="bg-slate-50 dark:bg-slate-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
                <div className="text-center">
                    <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
                        Select a Car Model
                    </h1>
                    <p className="mt-4 max-w-2xl mx-auto text-xl text-slate-600 dark:text-slate-400">
                        Explore, compare, and find the perfect car for your needs from our curated selection.
                    </p>
                </div>
                
                {/* Car Models List */}
                <div className="mt-16 w-full max-w-4xl mx-auto space-y-4">
                    {carModels.length === 0 ? (
                        <EmptyState message="No car models available." />
                    ) : (
                        carModels.map((car) => (
                            <Disclosure as="div" key={car._id}>
                                {({ open }) => (
                                    <div className="bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm transition-all has-[:focus]:ring-2 has-[:focus]:ring-blue-500">
                                        <Disclosure.Button className="w-full flex items-center justify-between p-4 sm:p-6 text-left">
                                            <div className="flex-1">
                                                <p className="text-lg font-bold text-slate-900 dark:text-white">{car.name}</p>
                                                <p className="text-sm text-slate-600 dark:text-slate-400">{car.price}</p>
                                            </div>
                                            <div className="flex items-center gap-x-4 sm:gap-x-6">
                                                <div className="hidden sm:flex items-center gap-1 text-sm font-medium">
                                                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                                    <span className="text-slate-800 dark:text-slate-200">{car.rating}</span>
                                                    <span className="text-slate-500">({car.reviews})</span>
                                                </div>
                                                <ChevronUp className={`w-6 h-6 text-slate-500 dark:text-slate-400 transition-transform ${open ? 'rotate-180' : ''}`} />
                                            </div>
                                        </Disclosure.Button>
                                        <Disclosure.Panel className="px-4 sm:px-6 pb-6 pt-4 border-t border-slate-200 dark:border-slate-700">
                                            <div className="grid md:grid-cols-2 gap-6">
                                                <img src={car.image} alt={car.name} className="w-full h-auto object-cover rounded-lg"/>
                                                <div className="flex flex-col justify-between">
                                                    <div>
                                                        <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-3">Specifications:</h4>
                                                        <ul className="grid grid-cols-2 gap-3">
                                                            {car.specs.map((spec, i) => <li key={i} className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300"><spec.icon className="w-4 h-4 text-blue-500"/>{spec.label}</li>)}
                                                        </ul>
                                                    </div>
                                                    <div className="flex items-center gap-x-3 mt-6">
                                                         <button className="flex-1 text-center px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors">View Offers</button>
                                                         <button className="px-4 py-2 text-sm font-semibold text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-600 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">Compare</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </Disclosure.Panel>
                                    </div>
                                )}
                            </Disclosure>
                        ))
                    )}
                </div>

                {/* Nearby Showrooms */}
                <div className="mt-24">
                    <h2 className="text-3xl font-bold text-center text-slate-900 dark:text-white mb-10">Visit a Nearby Showroom</h2>
                    <div className="grid md:grid-cols-3 gap-6">
                         {showrooms.length === 0 ? (
                            <div className="col-span-3"><EmptyState message="No showrooms available." /></div>
                         ) : (
                            showrooms.sort((a, b) => (b.rating || 0) - (a.rating || 0)).map((s, i) => (
                                <div key={s._id || i} className="bg-white dark:bg-slate-800/50 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 flex flex-col">
                                    <div className="flex-1">
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="font-bold text-lg text-slate-900 dark:text-white">{s.name}</h3>
                                            <div className="flex items-center gap-1 text-xs bg-yellow-100 dark:bg-yellow-900/50 px-2 py-1 rounded-full font-medium">
                                                <Star className="w-3 h-3 text-yellow-500 fill-current" />
                                                <span className="text-yellow-800 dark:text-yellow-300">{s.rating || "N/A"}</span>
                                            </div>
                                        </div>
                                        <p className="text-sm text-slate-600 dark:text-slate-400 flex items-start gap-2"><MapPin className="w-4 h-4 mt-0.5 flex-shrink-0"/>{s.address}</p>
                                    </div>
                                    <button className="mt-4 w-full flex items-center justify-center gap-x-2 text-sm font-semibold text-blue-600 dark:text-blue-400 rounded-md hover:bg-blue-100 dark:hover:bg-blue-900/50 py-2 transition-colors">
                                        Get Directions <ArrowRight className="w-4 h-4" />
                                    </button>
                                </div>
                            ))
                         )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CarModelSelectionPage;
