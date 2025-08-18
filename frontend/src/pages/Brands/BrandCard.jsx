// src/components/BrandCard.jsx

import { Link } from "react-router-dom";

const BrandCard = ({ brand }) => {
    // --- LOGIC: The null check and prop handling are preserved ---
    if (!brand) return null;

    return (
        <Link
            to={`/brands/${brand._id}`}
            // --- STYLING: Themed card with consistent interactions and dark mode support ---
            className="group block p-6 flex flex-col items-center text-center 
                       bg-white dark:bg-slate-800/50 
                       border border-slate-200 dark:border-slate-800 
                       rounded-2xl shadow-sm transition-all duration-300 
                       hover:shadow-xl hover:-translate-y-1.5"
        >
            <img
                src={brand.logo}
                alt={`${brand.name} logo`}
                // --- STYLING: Slightly larger image with a consistent hover effect ---
                className="w-28 h-28 object-contain mb-4 transition-transform duration-300 group-hover:scale-110"
            />
            <h3 
                // --- STYLING: Themed text with hover effect ---
                className="text-lg font-semibold text-slate-900 dark:text-white 
                           group-hover:text-blue-600 dark:group-hover:text-blue-400 
                           transition-colors"
            >
                {brand.name}
            </h3>
        </Link>
    );
};

export default BrandCard;
