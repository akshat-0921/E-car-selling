//vehicles


import React from "react";
import { useNavigate } from "react-router-dom";
import FavoriteButton from "../FavoriteButton/FavoriteButton.jsx";

const VehicleCard = ({ vehicle }) => {
   const navigate = useNavigate();

   return (
      <div
         key={vehicle._id}
         className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer"
         onClick={() => navigate(`/vehicles/${vehicle._id}`)}
      >
         <img
            src={
               vehicle.image ||
               (vehicle.images && vehicle.images.length > 0
                  ? vehicle.images[0]
                  : "/placeholder.svg")
            }
            alt={vehicle.name}
            className="w-full h-48 object-cover"
         />
         <div className="p-4">
            <h3 className="text-lg font-semibold">
               {vehicle.brand && typeof vehicle.brand === "object"
                  ? vehicle.brand.name
                  : vehicle.brand} {vehicle.name}
            </h3>
            <p className="text-green-600 font-medium">
               ₹{vehicle.price?.toLocaleString() || "N/A"}
            </p>
            <div className="mt-2 text-sm text-gray-600">
               <p>
                  {vehicle.fuelType || "N/A"} • {vehicle.transmission || "N/A"}
               </p>
            </div>
            <div className="mt-4">
               <FavoriteButton vehicleId={vehicle._id} />
            </div>
         </div>
      </div>
   );
};

export default VehicleCard;
