// src/pages/Brands/ShowBrands.jsx (example path)

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllBrandsThunk } from "../../redux/brandSlice";
import BrandCard from "./BrandCard"; // This path is preserved from your original code

// --- STYLING: Icons for loading/error states for theme consistency ---
import { Loader, ServerCrash } from "lucide-react";

// --- STYLING: Loading state component ---
const LoadingState = () => (
    <div className="flex flex-col items-center justify-center py-24 text-center">
        <Loader className="h-12 w-12 text-slate-400 dark:text-slate-500 animate-spin" />
        <p className="mt-4 text-lg font-medium text-slate-700 dark:text-slate-300">
            Loading All Brands...
        </p>
    </div>
);

// --- STYLING: Error state component ---
const ErrorState = ({ error }) => (
    <div className="flex flex-col items-center justify-center py-24 text-center">
        <ServerCrash className="h-12 w-12 text-red-500" />
        <p className="mt-4 text-lg font-medium text-red-600 dark:text-red-400">
            Failed to Load Brands
        </p>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            {error}
        </p>
    </div>
);

const ShowBrands = () => {
    // --- LOGIC: The Redux dispatch and selector hooks are preserved ---
    const dispatch = useDispatch();
    const { brands, loading, error } = useSelector((state) => state.brand);

    useEffect(() => {
        dispatch(getAllBrandsThunk());
    }, [dispatch]);

    // --- STYLING: Themed main container for the page ---
    return (
        <div className="bg-white dark:bg-slate-900 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
                <div className="text-center">
                    <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
                        Explore Our Car Brands
                    </h1>
                    <p className="mt-4 max-w-2xl mx-auto text-xl text-slate-600 dark:text-slate-400">
                        Discover a world of automotive excellence from the most trusted names in the industry.
                    </p>
                </div>

                <div className="mt-16">
                    {loading ? (
                        <LoadingState />
                    ) : error ? (
                        <ErrorState error={error} />
                    ) : (
                        // --- STYLING: The grid uses consistent spacing ---
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                            {/* --- LOGIC: The map function and BrandCard usage are preserved --- */}
                            {brands.map((brand) => (
                                <BrandCard key={brand._id} brand={brand} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ShowBrands;
