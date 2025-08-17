// src/components/NearbyShowrooms.jsx

import { useEffect, useState } from "react";
import { showroomAPI } from "../../api";
import { toast } from "react-toastify";
import { MapPin, Star, Phone, Compass, WifiOff } from "lucide-react";

// A sub-component for the loading state
const LoadingState = () => (
    <div className="text-center py-20">
        <Compass className="mx-auto h-12 w-12 text-slate-400 dark:text-slate-500 animate-spin" />
        <p className="mt-4 text-lg font-medium text-slate-700 dark:text-slate-300">
            Finding showrooms near you...
        </p>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Please allow location access for this feature to work.
        </p>
    </div>
);

// A sub-component for the empty state
const EmptyState = () => (
     <div className="text-center py-20">
        <WifiOff className="mx-auto h-12 w-12 text-slate-400 dark:text-slate-500" />
        <p className="mt-4 text-lg font-medium text-slate-700 dark:text-slate-300">
            No Nearby Showrooms Found
        </p>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            We couldn't find any showrooms within a 10km radius.
        </p>
    </div>
);


const NearbyShowrooms = () => {
    // --- LOGIC: Unchanged ---
    const [nearby, setNearby] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            async (pos) => {
                const { latitude, longitude } = pos.coords;
                try {
                    const { data } = await showroomAPI.getNearbyShowrooms({
                        lat: latitude,
                        lon: longitude,
                        radius: 10, // km
                    });

                    if (data.success) {
                        setNearby(data.showrooms);
                    } else {
                        toast.warn(data.msg);
                    }
                } catch (err) {
                    toast.error("Failed to fetch nearby showrooms");
                    console.error(err);
                } finally {
                    setLoading(false);
                }
            },
            (err) => {
                toast.error("Location access denied");
                setLoading(false);
            }
        );
    }, []);

    if (loading) {
        return <LoadingState />;
    }

    return (
        // --- STYLING: Main container for the page ---
        <div className="bg-white dark:bg-slate-900 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="text-center">
                    <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
                        Showrooms Near You
                    </h1>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-600 dark:text-slate-400">
                        Discover official dealerships and service centers in your area based on your current location.
                    </p>
                </div>

                {/* --- STYLING: Showroom grid and empty state --- */}
                <div className="mt-12">
                    {nearby.length === 0 ? (
                        <EmptyState />
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {nearby.map((s) => (
                                // --- STYLING: Themed showroom card ---
                                <div
                                    key={s._id}
                                    className="rounded-xl p-6 border border-slate-200 dark:border-slate-800 
                                               bg-white dark:bg-slate-800/50 
                                               shadow-sm transition-all duration-300 
                                               hover:shadow-lg hover:border-blue-500/50 dark:hover:border-blue-500/50 hover:-translate-y-1"
                                >
                                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">{s.name}</h3>
                                    <div className="mt-4 space-y-3 text-sm">
                                        <p className="flex items-start gap-x-3 text-slate-600 dark:text-slate-300">
                                            <MapPin className="w-5 h-5 text-slate-400 dark:text-slate-500 mt-0.5 flex-shrink-0" />
                                            <span>{s.address}, {s.city}, {s.state} – {s.zipCode}</span>
                                        </p>
                                        <p className="flex items-center gap-x-3 font-medium text-yellow-600 dark:text-yellow-400">
                                            <Star className="w-5 h-5 text-yellow-400 fill-current" />
                                            <span>Rating: {s.rating || "N/A"}</span>
                                        </p>
                                        <p className="flex items-center gap-x-3 font-medium text-blue-600 dark:text-blue-400">
                                            <Phone className="w-5 h-5" />
                                            <span>{s.contactNumber}</span>
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default NearbyShowrooms;
