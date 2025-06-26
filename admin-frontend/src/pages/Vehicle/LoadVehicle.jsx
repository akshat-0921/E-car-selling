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
         const res = await axiosInstance.get(`/vehicle/brand/${brandId}`);
         setVehicles(res.data.vehicles);
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
                     <li key={v._id}
                        className="flex items-center justify-between px-6 py-4 border-b last:border-b-0 hover:bg-gray-50 transition">
                        <div>
                           <div className="font-semibold text-lg">
                              {v.name} <span className="text-gray-400">|</span> {v.model}
                           </div>
                           <div className="text-gray-500 text-sm">
                              Model: {v.model} • Price: ₹{v.price}
                           </div>
                        </div>
                        <div className="flex gap-2">
                           <button onClick={() => toast("Edit coming soon")}
                              className="text-blue-600 hover:underline text-sm"
                           >
                              Edit
                           </button>
                           <button onClick={() => toast("Delete coming soon")}
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