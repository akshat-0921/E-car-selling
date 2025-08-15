import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = ({
    placeholder = "Search brands...",
    className = "",
}) => {
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
        <div className={`relative w-full ${className}`}>
            <form onSubmit={handleSubmit} className="flex items-center gap-2">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder={placeholder}
                    className="flex-grow p-2 px-4 border rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled={isLoading}
                />

                {searchTerm && (
                    <button
                        type="button"
                        onClick={handleClear}
                        className="text-white text-xl px-2"
                        title="Clear"
                        disabled={isLoading}
                    >
                        ×
                    </button>
                )}

                <button
                    type="submit"
                    disabled={!searchTerm.trim() || isLoading}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                    {isLoading ? "Searching..." : "Search"}
                </button>
            </form>

            {error && (
                <div className="absolute left-0 mt-1 w-full px-4 py-2 bg-red-100 border border-red-300 text-red-700 text-sm rounded">
                    {error}
                </div>
            )}
        </div>
    );
};

export default SearchBar;
