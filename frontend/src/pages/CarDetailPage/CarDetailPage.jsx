// src/pages/CarDetailPage.jsx (example path)

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CarDetail from "../../components/CarModel/CarDetails"; // Path preserved from your code
import { vehicleAPI } from "../../api";
import { toast } from "react-toastify";

// --- STYLING: Icons for loading/error states for theme consistency ---
import { Loader, ServerCrash } from "lucide-react";

// --- STYLING: Loading state component ---
const LoadingState = () => (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <Loader className="h-12 w-12 text-slate-400 dark:text-slate-500 animate-spin" />
        <p className="mt-4 text-lg font-medium text-slate-700 dark:text-slate-300">
            Loading Car Details...
        </p>
    </div>
);

// --- STYLING: Error state component ---
const ErrorState = () => (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <ServerCrash className="h-12 w-12 text-red-500" />
        <p className="mt-4 text-lg font-medium text-red-600 dark:text-red-400">
            Car Details Not Found
        </p>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            The vehicle you are looking for does not exist or could not be loaded.
        </p>
    </div>
);

const CarDetailPage = () => {
    // --- LOGIC: All state and hooks are preserved ---
    const { vehicleId } = useParams();
    const [car, setCar] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCarData = async () => {
            try {
                setLoading(true);

                // If vehicleId is provided in URL, use it, otherwise fetch a featured car
                if (vehicleId) {
                    const response = await vehicleAPI.getVehicleById(vehicleId);
                    if (response.data.success) {
                        setCar(response.data.vehicle);
                    } else {
                        toast.error(response.data.message || "Failed to fetch car details");
                    }
                } else {
                    // Fetch a featured car if no ID is provided
                    const response = await vehicleAPI.getAllVehicles({ featured: true, limit: 1 });
                    if (response.data.success && response.data.vehicles.length > 0) {
                        setCar(response.data.vehicles[0]);
                    } else {
                        toast.error("No featured cars available");
                    }
                }
            } catch (error) {
                console.error("Error fetching car data:", error);
                toast.error(error.response?.data?.message || "Failed to fetch car details");
            } finally {
                setLoading(false);
            }
        };

        fetchCarData();
    }, [vehicleId]);

    // --- STYLING: Themed page container ---
    return (
        <div className="bg-white dark:bg-slate-900 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {loading ? (
                    <LoadingState />
                ) : car ? (
                    // --- LOGIC: The CarDetail component and its prop are preserved ---
                    <CarDetail car={car} />
                ) : (
                    <ErrorState />
                )}
            </div>
        </div>
    );
};

export default CarDetailPage;
