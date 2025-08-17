import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite, removeFavorite } from "../../redux/favoritesSlice";

const FavoriteButton = ({ vehicleId }) => {
    const dispatch = useDispatch();
    const { favorites, loading } = useSelector((state) => state.favorites);

    const isFavorite = favorites.includes(vehicleId);

    const handleClick = () => {
        if (loading) return;
        if (isFavorite) {
            dispatch(removeFavorite(vehicleId));
        } else {
            dispatch(addFavorite(vehicleId));
        }
    };

    return (
        <button
            onClick={handleClick}
            className={`px-3 py-2 rounded text-sm font-medium transition-all ${isFavorite
                    ? "bg-red-500 text-white hover:bg-red-600"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
        >
            {isFavorite ? "❤️ Remove from Favorites" : "🤍 Add to Favorites"}
        </button>
    );
};

export default FavoriteButton;
