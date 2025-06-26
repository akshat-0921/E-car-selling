// src/pages/BrandList.jsx
import { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const BrandList = () => {
   const [brands, setBrands] = useState([]);
   const [loading, setLoading] = useState(false);
   const navigate = useNavigate();

   const loadBrands = async () => {
      setLoading(true);
      try {
         const res = await axiosInstance.get("/brand/get-all");
         setBrands(res.data.brands);
      } catch (error) {
         toast.error(error?.response?.data?.message || "Failed to fetch brands");
      }
      setLoading(false);
   };

   useEffect(() => { loadBrands(); }, []);

   return (
      <div className="max-w-2xl mx-auto py-8">
         <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Brands</h1>
            <button
               className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded font-semibold shadow"
               onClick={() => navigate("/admin/brand/add")}
            >+ Add Brand</button>
         </div>
         <div className="bg-white shadow rounded">
            {loading ? (
               <div className="py-8 text-center text-gray-500">Loading...</div>
            ) : brands.length === 0 ? (
               <div className="py-8 text-center text-gray-400">No brands found.</div>
            ) : (
               <ul>
                  {brands.map(b => (
                     <li
                        key={b._id}
                        className="flex items-center justify-between px-5 py-4 border-b last:border-b-0 hover:bg-gray-50 transition"
                     >
                        <div>
                           <div className="font-semibold text-lg">{b.name}</div>
                           <div className="text-gray-500 text-sm">{b.description}</div>
                        </div>
                        <div className="flex items-center w-14 h-14">
                           {b.logo ? (
                              <img
                                 src={b.logo}
                                 alt={b.name + " logo"}
                                 className="object-contain w-full h-full rounded shadow"
                                 loading="lazy"
                              />
                           ) : (
                              <div className="w-full h-full bg-gray-200 flex items-center justify-center rounded text-gray-400 text-2xl">
                                 ?
                              </div>
                           )}
                        </div>

                        <div className="flex gap-2">
                           <button
                              className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
                              onClick={() => navigate(`/admin/brand/${b._id}/vehicles`)}
                           >Show Vehicles</button>
                           {/* Add Edit/Delete buttons if needed */}
                        </div>
                     </li>
                  ))}
               </ul>
            )}
         </div>
      </div>
   );
};

export default BrandList;
