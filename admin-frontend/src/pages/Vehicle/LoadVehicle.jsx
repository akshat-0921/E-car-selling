import { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const VehicleList = () => {
   const { brandId } = useParams();
   const [vehicles, setVehicles] = useState([]);
   const [loading, setLoading] = useState(false);
   const navigate = useNavigate();

   const loadVehicles = async () => {
      setLoading(true);
      try {
         const res = await axiosInstance.get(`/brand/get-vehicles/${brandId}`);
         setVehicles(res.data.vehicles);
         toast.success("Vehicles fetched")
      } catch (error) {
         toast.error(error?.response?.data?.message || "Failed to fetch vehicles");
      }
      setLoading(false);
   };

   useEffect(() => {
      loadVehicles();
   }, [brandId]);

   return (
      <div className="max-w-3xl mx-auto py-10 px-4">
         <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Vehicles</h1>
            <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded font-semibold shadow"
               onClick={() => navigate(`/admin/brand/${brandId}/add-vehicle`)}
            >
               + Add Vehicle
            </button>
         </div>

         <div className="bg-white shadow rounded-lg">
            {loading ? (
               <div className="py-10 text-center text-gray-500">Loading...</div>
            ) : vehicles.length === 0 ? (
               <div className="py-10 text-center text-gray-400">No vehicles found.</div>
            ) : (
               <ul>
                  {vehicles.map((v) => (
                     <li
                        key={v._id}
                        className="flex items-center gap-6 px-6 py-4 border-b last:border-b-0 hover:bg-gray-50 transition"
                     >
                        {/* Vehicle image */}
                        <div className="flex-shrink-0 w-28 h-20 rounded-xl bg-gray-100 flex items-center justify-center overflow-hidden shadow">
                           {v.image ? (
                              <img
                                 src={v.image}
                                 alt={v.name}
                                 className="object-cover w-full h-full"
                              />
                           ) : (
                              <span className="text-4xl text-gray-300">🚗</span>
                           )}
                        </div>
                        {/* Vehicle info */}
                        <div className="flex-1 min-w-0">
                           <div className="font-semibold text-lg truncate">
                              {v.name}
                              {v.model ? <span className="text-gray-400"> | {v.model}</span> : null}
                           </div>
                           <div className="text-gray-500 text-sm truncate">
                              Category: {v.category} • Price: <span className="font-semibold text-black">₹{v.price}</span>
                           </div>
                        </div>
                        {/* Actions */}
                        <div className="flex gap-2">
                           <button
                              onClick={() => toast("Edit coming soon")}
                              className="text-blue-600 hover:underline text-sm"
                           >
                              Edit
                           </button>
                           <button
                              onClick={() => toast("Delete coming soon")}
                              className="text-red-600 hover:underline text-sm"
                           >
                              Delete
                           </button>
                        </div>
                     </li>
                  ))}
               </ul>

            )}
         </div>
      </div>
   );
};

export default VehicleList;