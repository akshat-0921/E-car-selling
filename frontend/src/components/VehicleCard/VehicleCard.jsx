import { Link } from "react-router-dom";

const VehicleCard = ({ vehicle }) => {
   if (!vehicle) return null;

   return (
      <Link
         to={`/vehicles/${vehicle._id}`}
         className="block rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg transition overflow-hidden bg-white"
      >
         {/* Vehicle Image */}
         <div className="w-full h-48 bg-gray-100">
            {/* <img
               src={vehicle.images[0] || "/placeholder.svg"}
               alt={vehicle.name}
               className="w-full h-full object-cover"
            /> */}
         </div>

         {/* Vehicle Info */}
         <div className="p-4 space-y-2">
            <h3 className="text-lg font-semibold text-gray-800 truncate">
               {vehicle.name}
            </h3>

            {/* <p className="vehicle-brand text-sm text-gray-500">
               {vehicle.brand?.name || "Unknown Brand"}
            </p> */}

            {/* <div className="vehicle-specs text-sm text-gray-500 flex gap-3">
               <span className="vehicle-range">{vehicle.range} km</span>
               <span className="vehicle-battery">{vehicle.battery} kWh</span>
            </div> */}

            <div className="vehicle-price text-sm text-gray-700">
               <span className="font-medium">Price: </span>
               <span className="text-green-600 font-bold">
                  ₹{vehicle.price.toLocaleString()}
               </span>
            </div>
         </div>
      </Link>
   );
};

export default VehicleCard;
