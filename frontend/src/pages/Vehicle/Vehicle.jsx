// src/components/Vehicle/Vehicle.jsx (or wherever this file is located)

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchVehicles, fetchVehiclesByBrandThunk } from "../../redux/vehicleSlice";
import Filter from "../../components/filter/Filter";
import VehicleCard from "../../components/VehicleCard/VehicleCard";

// --- STYLING: Icons for loading/error states for theme consistency ---
import { Loader, ServerCrash } from "lucide-react";

// --- STYLING: Loading state component ---
const LoadingState = () => (
    <div className="col-span-full flex flex-col items-center justify-center py-24 text-center">
        <Loader className="h-12 w-12 text-slate-400 dark:text-slate-500 animate-spin" />
        <p className="mt-4 text-lg font-medium text-slate-700 dark:text-slate-300">
            Loading Vehicles...
        </p>
    </div>
);

// --- STYLING: Error state component ---
const ErrorState = ({ error }) => (
    <div className="col-span-full flex flex-col items-center justify-center py-24 text-center">
        <ServerCrash className="h-12 w-12 text-red-500" />
        <p className="mt-4 text-lg font-medium text-red-600 dark:text-red-400">
            Failed to Load Vehicles
        </p>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            {error}
        </p>
    </div>
);

const Vehicle = ({ brandId }) => {
    // --- LOGIC: All Redux and state management logic is preserved ---
    const dispatch = useDispatch();
    const { vehicles, allLoading, allError, brandLoading, brandError } = useSelector((state) => state.vehicle);

    useEffect(() => {
        if (brandId) {
            dispatch(fetchVehiclesByBrandThunk(brandId));
        } else {
            dispatch(fetchVehicles());
        }
    }, [dispatch, brandId]);

    const isLoading = brandId ? brandLoading : allLoading;
    const error = brandId ? brandError : allError;

    const handleFilterChange = (filters) => {
        console.log("Sending filters to backend:", filters);
        dispatch(fetchVehicles(filters));
    };

    return (
        // --- STYLING: Main container with a two-column layout ---
        <div className="flex flex-col lg:flex-row gap-8">
            
            {/* --- STYLING: Filter sidebar with a sticky position --- */}
            {!brandId && (
                <aside className="w-full lg:w-1/4 lg:sticky lg:top-24 h-fit">
                    <Filter onFilterChange={handleFilterChange} />
                </aside>
            )}

            {/* --- STYLING: Main content area for the vehicle grid --- */}
            <div className={`w-full ${!brandId ? "lg:w-3/4" : ""}`}>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                    {isLoading ? (
                        <LoadingState />
                    ) : error ? (
                        <ErrorState error={error} />
                    ) : (
                        // --- LOGIC: The vehicle mapping is preserved ---
                        vehicles.map((vehicle) => (
                            <VehicleCard key={vehicle._id} vehicle={vehicle} />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default Vehicle;
