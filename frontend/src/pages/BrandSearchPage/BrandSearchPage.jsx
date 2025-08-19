// src/pages/BrandSearchPage.jsx (example path)

import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { brandAPI } from "../../api";
import { toast } from "react-toastify";
// --- STYLING: Icons for visual enhancement ---
import { Loader, ServerCrash, Star, Car, CheckCircle, HelpCircle, ArrowRight } from "lucide-react";

// --- STYLING: Helper components for a cleaner layout ---
const LoadingState = () => (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Loader className="h-12 w-12 text-slate-400 dark:text-slate-500 animate-spin" />
        <p className="mt-4 text-lg font-medium text-slate-700 dark:text-slate-300">Loading Brand Details...</p>
    </div>
);

const ErrorState = ({ message }) => (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <ServerCrash className="h-12 w-12 text-red-500" />
        <p className="mt-4 text-lg font-medium text-red-600 dark:text-red-400">{message}</p>
    </div>
);

const BrandSearchPage = () => {
    // --- LOGIC: All state and hooks are preserved ---
    const navigate = useNavigate();
    const location = useLocation();
    const [brandDetails, setBrandDetails] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBrandDetails = async () => {
            try {
                setLoading(true);
                const searchParams = new URLSearchParams(location.search);
                const brandId = searchParams.get("brand");

                if (!brandId) {
                    toast.error("Brand ID is missing");
                    setLoading(false);
                    return;
                }

                const response = await brandAPI.getBrandDetails(brandId);
                if (response.data.success) {
                    setBrandDetails(response.data.brand);
                } else {
                    toast.error(response.data.message || "Failed to fetch brand details");
                }
            } catch (error) {
                console.error("Error fetching brand details:", error);
                toast.error(error.response?.data?.message || "Failed to fetch brand details");
            } finally {
                setLoading(false);
            }
        };

        fetchBrandDetails();
    }, [location.search]);

    // --- STYLING: Using themed loading and error states ---
    if (loading) {
        return <div className="bg-white dark:bg-slate-900"><LoadingState /></div>;
    }

    if (!brandDetails) {
        return <div className="bg-white dark:bg-slate-900"><ErrorState message="Brand details not found." /></div>;
    }

    return (
        // --- STYLING: Main page container with theme-aware background ---
        <div className="bg-white dark:bg-slate-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* --- Hero Section --- */}
                <div className="py-16 sm:py-24 text-center">
                    <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
                        {brandDetails.name} Cars in India
                    </h1>
                    <p className="mt-6 max-w-3xl mx-auto text-lg leading-8 text-slate-600 dark:text-slate-400">
                        {brandDetails.description}
                    </p>
                    <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                        <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 px-4 py-2 rounded-full text-sm font-medium">
                            <Car className="h-5 w-5 text-blue-500" />
                            <span>Available Models:</span>
                            <span className="text-slate-900 dark:text-white">{brandDetails.carsAvailable || 0}</span>
                        </div>
                        <div className="flex items-center gap-2 bg-yellow-100 dark:bg-yellow-900/50 px-4 py-2 rounded-full text-sm font-medium">
                            <Star className="h-5 w-5 text-yellow-500 fill-current" />
                            <span>Brand Rating:</span>
                            <span className="text-slate-900 dark:text-white">{brandDetails.rating || "N/A"}/5</span>
                        </div>
                    </div>
                    <div className="mt-10">
                        <button
                            onClick={() => navigate(`/vehicles?brand=${brandDetails._id}`)}
                            className="inline-flex items-center gap-x-2 rounded-md bg-blue-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-blue-700 transition-colors"
                        >
                            View All Car Models <ArrowRight className="h-5 w-5" />
                        </button>
                    </div>
                </div>

                {/* --- Highlights and FAQs Section --- */}
                <div className="py-16 sm:py-24 border-t border-slate-200 dark:border-slate-800 grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Key Highlights Card */}
                    <div className="bg-slate-50 dark:bg-slate-800/50 p-8 rounded-2xl">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3 mb-6">
                            <CheckCircle className="h-7 w-7 text-green-500" />
                            Key Highlights
                        </h2>
                        <ul className="space-y-3 text-slate-700 dark:text-slate-300">
                            {(brandDetails.highlights || []).map((item, index) => (
                                <li key={index} className="flex items-start gap-3">
                                    <span className="text-blue-500 mt-1 flex-shrink-0">◆</span>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* FAQs Card */}
                    <div className="bg-slate-50 dark:bg-slate-800/50 p-8 rounded-2xl">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3 mb-6">
                            <HelpCircle className="h-7 w-7 text-purple-500" />
                            Frequently Asked Questions
                        </h2>
                        <div className="space-y-6">
                            {(brandDetails.faqs || []).map((faq, index) => (
                                <div key={index} className="border-b border-slate-200 dark:border-slate-700/50 pb-4 last:border-0 last:pb-0">
                                    <p className="font-semibold text-slate-900 dark:text-white">Q: {faq.question}</p>
                                    <p className="mt-1 text-slate-600 dark:text-slate-400">A: {faq.answer}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BrandSearchPage;
