// src/pages/Favorites/Favorites.jsx
import { useEffect, useState } from "react";
import { vehicleAPI } from "../../api";
import VehicleCard from "../../components/VehicleCard/VehicleCard"; // reuse your existing card

const Favorites = () => {
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                const res = await vehicleAPI.getFavorites(); // ⬅️ hits /vehicle/favorites
                setFavorites(res.data?.favorites || []);
            } catch (err) {
                console.error("Error loading favorites:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchFavorites();
    }, []);

    if (loading) return <p className="text-center mt-10">Loading your favorites...</p>;

    return (
        <div className="max-w-6xl mx-auto p-6 pt-20">
            <h1 className="text-3xl font-bold mb-6">Your Favorite Vehicles</h1>
            {favorites.length === 0 ? (
                <p className="text-gray-500">You have no favorite vehicles yet.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {favorites.map((vehicle) => (
                        <VehicleCard key={vehicle._id} vehicle={vehicle} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Favorites;
