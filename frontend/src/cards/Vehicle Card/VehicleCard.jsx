// src/components/VehicleCard/VehicleCard.jsx

import { NavLink } from "react-router-dom";
import { useState, useContext } from "react";
import { VehicleContext } from "../../context/VehicleContext";
import { toast } from "react-toastify";
// Import necessary icons from Heroicons for a consistent look
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";
import { HeartIcon as HeartIconOutline, Cog8ToothIcon, CpuChipIcon, UserGroupIcon, BeakerIcon } from "@heroicons/react/24/outline";

const VehicleCard = ({ vehicle }) => {
    const { addToFavorites, removeFromFavorites } = useContext(VehicleContext);
    
    // Use optional chaining and nullish coalescing for safer state initialization
    const [isFavorite, setIsFavorite] = useState(vehicle?.isFavorite ?? false);
    const [isLoading, setIsLoading] = useState(false);

    const { _id, vehicleId, image, images, name, brand, price, mileage, transmission, power, seating, fuelType } = vehicle;
    const id = _id || vehicleId;
    const displayImage = image || (images && images.length > 0 ? images[0] : "/placeholder.svg");
    const brandName = typeof brand === "object" ? brand?.name : brand;

    const handleFavoriteClick = async (e) => {
        e.preventDefault(); // Prevent NavLink navigation
        e.stopPropagation(); // Stop event bubbling

        if (!id) {
            toast.error("Cannot update favorites: Vehicle ID is missing");
            return;
        }

        setIsLoading(true);
        try {
            const action = isFavorite ? removeFromFavorites : addToFavorites;
            const success = await action(id);
            if (success) {
                setIsFavorite(!isFavorite);
            }
        } catch (error) {
            console.error("Error toggling favorite:", error);
            toast.error("Failed to update favorites. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    // Component for displaying vehicle specs with icons
    const SpecItem = ({ icon: Icon, value, label }) => (
        <div className="flex items-center gap-x-2">
            <Icon className="h-4 w-4 text-slate-500 dark:text-slate-400" aria-hidden="true" />
            <span className="text-sm text-slate-600 dark:text-slate-300">
                {value || "N/A"} {label}
            </span>
        </div>
    );

    return (
        // --- Main Card Wrapper ---
        // Using NavLink as the root for better accessibility and cleaner code.
        <NavLink
            to={`/vehicles/${id}`}
            className="group block max-w-4xl mx-auto" // Centered and with a max-width
        >
            <div
                // --- Card Styling with theme awareness ---
                className="relative flex flex-col sm:flex-row items-center w-full p-4 sm:p-6 mb-6
                           rounded-xl bg-white dark:bg-slate-800/50 
                           border border-slate-200 dark:border-slate-800 
                           shadow-sm transition-all duration-300 
                           hover:shadow-lg hover:border-blue-500/50 dark:hover:border-blue-500/50 hover:-translate-y-1"
            >
                {/* --- Vehicle Image --- */}
                <img
                    src={displayImage}
                    alt={name}
                    className="w-full sm:w-48 h-40 object-cover rounded-lg flex-shrink-0"
                />

                {/* --- Vehicle Details Container --- */}
                <div className="flex-grow w-full sm:ml-6 mt-4 sm:mt-0">
                    <div className="flex justify-between items-start">
                        {/* --- Title and Brand --- */}
                        <div>
                            <h2 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                {brandName} {name}
                            </h2>
                            <p className="mt-2 text-2xl font-bold text-slate-800 dark:text-slate-100">
                                ₹{price?.toLocaleString() || "Price unavailable"}
                            </p>
                        </div>
                        
                        {/* --- Redesigned Favorite Button --- */}
                        <button
                            onClick={handleFavoriteClick}
                            disabled={isLoading}
                            className="p-2 rounded-full transition-colors duration-200 
                                       hover:bg-red-100 dark:hover:bg-red-900/50
                                       disabled:opacity-50 disabled:cursor-not-allowed"
                            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
                        >
                            {isFavorite ? (
                                <HeartIconSolid className="h-6 w-6 text-red-500" />
                            ) : (
                                <HeartIconOutline className="h-6 w-6 text-slate-400 dark:text-slate-500 group-hover:text-red-500 transition-colors" />
                            )}
                        </button>
                    </div>

                    {/* --- Specs Grid with Icons --- */}
                    <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700 grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-2">
                        <SpecItem icon={BeakerIcon} value={mileage} label="km/l" />
                        <SpecItem icon={Cog8ToothIcon} value={transmission} label="" />
                        <SpecItem icon={CpuChipIcon} value={power} label="HP" />
                        <SpecItem icon={UserGroupIcon} value={seating} label="Seats" />
                    </div>
                </div>
            </div>
        </NavLink>
    );
};

export default VehicleCard;

