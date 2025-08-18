// src/components/SearchBar/SearchBar.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
// Icons added for visual enhancement only
import { Search, X, AlertCircle } from 'lucide-react';

const SearchBar = ({
    placeholder = "Search brands...",
    className = "",
}) => {
    // --- LOGIC: Unchanged ---
    const [searchTerm, setSearchTerm] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const query = searchTerm.trim();
        if (!query) return;

        setIsLoading(true);
        setError("");

        try {
            const res = await fetch(`http://localhost:4000/api/search/brand?q=${encodeURIComponent(query)}`);
            const data = await res.json();

            if (data && data.length > 0) {
                const brand = data[0];
                navigate(`/brands/${brand._id}`);
            } else {
                setError("Brand not found");
                setTimeout(() => setError(""), 3000);
            }
        } catch (err) {
            console.error("Search error:", err);
            setError("Search failed");
            setTimeout(() => setError(""), 3000);
        } finally {
            setIsLoading(false);
        }
    };

    const handleClear = () => {
        setSearchTerm("");
        setError("");
    };

    return (
        <div className={`relative w-full max-w-lg mx-auto ${className}`}>
            {/* --- STYLING: Form layout updated to group input and buttons --- */}
            <form onSubmit={handleSubmit} className="flex items-center gap-x-2">
                {/* --- STYLING: Input now has an icon inside and theme-aware classes --- */}
                <div className="relative flex-grow">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <Search className="h-5 w-5 text-slate-400 dark:text-slate-500" aria-hidden="true" />
                    </div>
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder={placeholder}
                        className="block w-full rounded-md border-slate-300 dark:border-slate-700 
                                   bg-white dark:bg-slate-900 
                                   py-2 pl-10 pr-10 shadow-sm transition
                                   text-slate-900 dark:text-white
                                   placeholder:text-slate-400 dark:placeholder:text-slate-500
                                   focus:border-blue-500 focus:ring-blue-500 
                                   dark:focus:border-blue-400 dark:focus:ring-blue-400 sm:text-sm"
                        disabled={isLoading}
                    />
                    {/* --- STYLING: Clear button is now an icon inside the input --- */}
                    {searchTerm && !isLoading && (
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                            <button
                                type="button"
                                onClick={handleClear}
                                className="p-1 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                                title="Clear"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>
                    )}
                </div>

                {/* --- STYLING: Button updated to match theme --- */}
                <button
                    type="submit"
                    disabled={!searchTerm.trim() || isLoading}
                    className="inline-flex items-center justify-center rounded-md border border-transparent 
                               bg-blue-600 px-5 py-2 text-sm font-medium text-white shadow-sm 
                               hover:bg-blue-700 transition-colors 
                               focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                               dark:focus:ring-offset-slate-900
                               disabled:bg-slate-300 dark:disabled:bg-slate-600 disabled:cursor-not-allowed"
                >
                    {isLoading ? "..." : "Search"}
                </button>
            </form>

            {/* --- STYLING: Error message is enhanced visually --- */}
            {error && (
                <div className="absolute left-0 mt-2 w-full p-3 rounded-md bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-500/30">
                    <div className="flex items-center gap-x-2">
                        <AlertCircle className="h-5 w-5 text-red-500 dark:text-red-400" />
                        <p className="text-sm font-medium text-red-800 dark:text-red-300">
                            {error}
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SearchBar;

