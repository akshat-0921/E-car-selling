// src/components/VehicleCard/VehicleCard.jsx (Grid View Version)

import React from "react";
import { NavLink } from "react-router-dom"; // Import NavLink for semantic navigation
import FavoriteButton from "../FavoriteButton/FavoriteButton.jsx";

const VehicleCard = ({ vehicle }) => {
    // Using a NavLink provides better accessibility and semantic HTML than a generic onClick div
    return (
        <div
            key={vehicle._id}
            // Add 'group' to enable group-hover effects on child elements.
            // Add 'relative' to act as a container for the absolutely positioned favorite button.
            className="group relative block rounded-xl overflow-hidden bg-white dark:bg-slate-800/50 
                       border border-slate-200 dark:border-slate-800 
                       shadow-sm transition-all duration-300 
                       hover:shadow-xl hover:border-blue-500/50 dark:hover:border-blue-500/50 hover:-translate-y-1"
        >
            {/* --- Favorite Button --- */}
            {/* Positioned at the top-right corner, over the image. */}
            {/* It sits outside the NavLink to prevent click conflicts. */}
            <div className="absolute top-3 right-3 z-10">
                <FavoriteButton vehicleId={vehicle._id} />
            </div>

            <NavLink to={`/vehicles/${vehicle._id}`} className="block">
                {/* --- Vehicle Image --- */}
                <div className="overflow-hidden">
                    <img
                        src={
                            vehicle.image ||
                            (vehicle.images && vehicle.images.length > 0
                                ? vehicle.images[0]
                                : "/placeholder.svg")
                        }
                        alt={vehicle.name}
                        // Added a smooth zoom transition on hover
                        className="w-full h-56 object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                    />
                </div>

                {/* --- Card Content --- */}
                <div className="p-4">
                    {/* --- Title & Brand --- */}
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {vehicle.brand?.name || vehicle.brand} {vehicle.name}
                    </h3>
                    
                    {/* --- Price --- */}
                    {/* Removed green color for a more premium look that works in both themes */}
                    <p className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">
                        ₹{vehicle.price?.toLocaleString() || "N/A"}
                    </p>

                    {/* --- Specs --- */}
                    {/* Styled as tags for better visual separation */}
                    <div className="mt-4 flex items-center gap-x-2 border-t border-slate-200 dark:border-slate-700 pt-3">
                        <span className="inline-block bg-slate-100 dark:bg-slate-700 px-2.5 py-1 text-xs font-medium text-slate-700 dark:text-slate-300 rounded-full">
                            {vehicle.fuelType || "N/A"}
                        </span>
                        <span className="inline-block bg-slate-100 dark:bg-slate-700 px-2.5 py-1 text-xs font-medium text-slate-700 dark:text-slate-300 rounded-full">
                            {vehicle.transmission || "N/A"}
                        </span>
                    </div>
                </div>
            </NavLink>
        </div>
    );
};

export default VehicleCard;
