// src/components/FavoriteButton/FavoriteButton.jsx

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite, removeFavorite } from "../../redux/favoritesSlice";
// --- STYLING: Replaced text/emoji with a modern icon set ---
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";
import { HeartIcon as HeartIconOutline } from "@heroicons/react/24/outline";

const FavoriteButton = ({ vehicleId }) => {
    // --- LOGIC: Unchanged ---
    const dispatch = useDispatch();
    const { favorites, loading } = useSelector((state) => state.favorites);

    const isFavorite = favorites.includes(vehicleId);

    const handleClick = (e) => {
        // Stop the event from bubbling up to a parent NavLink/div
        e.preventDefault();
        e.stopPropagation();

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
            // --- STYLING: Themed icon button with clear states and transitions ---
            className={`flex items-center justify-center h-10 w-10 rounded-full 
                       bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm 
                       shadow-md transition-all duration-300 transform 
                       hover:scale-110
                       disabled:opacity-60 disabled:cursor-not-allowed`}
            disabled={loading}
            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
            {isFavorite ? (
                // --- STYLING: Solid, red icon for the "favorited" state ---
                <HeartIconSolid className="h-6 w-6 text-red-500" />
            ) : (
                // --- STYLING: Outline icon for the default state, with a hover effect ---
                <HeartIconOutline className="h-6 w-6 text-slate-700 dark:text-slate-300 group-hover:text-red-500" />
            )}
        </button>
    );
};

export default FavoriteButton;
