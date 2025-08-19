// src/components/BrandGrid/BrandGrid.jsx

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { brandAPI } from "../../api";
import { toast } from "react-toastify";
// --- STYLING: Icons for loading/empty states ---
import { Loader, ServerCrash } from "lucide-react";

// --- STYLING: Loading state component ---
const LoadingState = () => (
   <div className="flex flex-col items-center justify-center py-20 text-center">
      <Loader className="h-10 w-10 text-slate-400 dark:text-slate-500 animate-spin" />
      <p className="mt-4 text-lg font-medium text-slate-700 dark:text-slate-300">
         Loading Brands...
      </p>
   </div>
);

// --- STYLING: Empty state component ---
const EmptyState = () => (
   <div className="flex flex-col items-center justify-center py-20 text-center">
      <ServerCrash className="h-10 w-10 text-slate-400 dark:text-slate-500" />
      <p className="mt-4 text-lg font-medium text-slate-700 dark:text-slate-300">
         No Brands Found
      </p>
      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
         We couldn't find any brands to display at the moment.
      </p>
   </div>
);

const BrandGrid = () => {
   // --- LOGIC: All state and hooks are preserved ---
   const [brands, setBrands] = useState([]);
   const [loading, setLoading] = useState(true);
   const navigate = useNavigate();

   useEffect(() => {
      const fetchBrands = async () => {
         try {
            const res = await brandAPI.getAllBrands();
            if (res.data.success && Array.isArray(res.data.brands)) {
               // Limiting to 8 is preserved from your original logic
               const limited = res.data.brands.slice(0, 8);
               setBrands(limited);
            } else {
               toast.error(res.data.message || "Failed to fetch brands");
            }
         } catch (err) {
            console.error(err);
            toast.error("An unexpected error occurred while fetching brands");
         } finally {
            setLoading(false);
         }
      };

      fetchBrands();
   }, []);

   const handleClick = (brandId) => {
      navigate(`/brands/${brandId}`);
   };

   // --- STYLING: Using styled loading and empty states ---
   if (loading) {
      return <LoadingState />;
   }

   if (!brands.length) {
      return <EmptyState />;
   }

   return (
      // --- STYLING: Themed container ---
      <div className="max-w-7xl mx-auto px-4 py-10">
         <h2 className="text-3xl font-bold mb-6 text-slate-900 dark:text-white text-center">Top Car Brands</h2>
         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
            {/* --- LOGIC: Map function is preserved --- */}
            {brands.map((brand) => (
               <div
                  key={brand._id}
                  onClick={() => handleClick(brand._id)}
                  // --- STYLING: Themed brand card with consistent interactions ---
                  className="group cursor-pointer flex flex-col items-center justify-center p-6 bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5"
               >
                  <div className="w-24 h-24 flex items-center justify-center mb-4">
                     <img
                        src={brand.logo || "/placeholder.svg"}
                        alt={brand.name}
                        className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-110"
                     />
                  </div>
                  <h3 className="text-center font-semibold text-slate-800 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                     {brand.name}
                  </h3>
               </div>
            ))}
         </div>
      </div>
   );
};

export default BrandGrid;



// "use client"

// import { useState, useEffect } from "react"
// import { useNavigate } from "react-router-dom"
// import { brandAPI } from "../../api"
// import { toast } from "react-toastify"

// const BrandCard = () => {
//    const [brands, setBrands] = useState([])
//    const [loading, setLoading] = useState(true)
//    const navigate = useNavigate()

//    useEffect(() => {
//       const fetchBrands = async () => {
//          try {
//             setLoading(true)
//             const response = await brandAPI.getAllBrands()
//             if (response.data.success) {
//                const brandsWithImages = response.data.brands.map((brand) => ({
//                   name: brand.name,
//                   img: brand.image || "/placeholder.svg?height=100&width=100",
//                   _id: brand._id,
//                }))
//                setBrands(brandsWithImages)
//             } else {
//                toast.error(response.data.message || "Failed to fetch brands")
//             }
//          } catch (error) {
//             console.error("Error fetching brands:", error)
//             toast.error(error.response?.data?.message || "Failed to fetch brands")
//          } finally {
//             setLoading(false)
//          }
//       }

//       fetchBrands()
//    }, [])

//    const handleClick = (brandId, brandName) => {
//       navigate(`/brand-search?brand=${brandId}`)
//    }

//    if (loading) {
//       return (
//          <div className="flex justify-center items-center h-64">
//             <div className="relative">
//                <div className="w-16 h-16 border-4 border-rose-200 border-t-rose-500 rounded-full animate-spin"></div>
//                <p className="text-gray-600 mt-4 text-center font-medium">Loading brands...</p>
//             </div>
//          </div>
//       )
//    }

//    return (
//       <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6 p-4 md:p-6 max-w-7xl mx-auto">
//          {brands.length === 0 ? (
//             <div className="col-span-full text-center py-16">
//                <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
//                   <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                      <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
//                      />
//                   </svg>
//                </div>
//                <p className="text-gray-500 text-lg">No brands available</p>
//             </div>
//          ) : (
//             brands.map((brand, index) => (
//                <div
//                   key={brand._id || index}
//                   className="group relative w-full flex flex-col items-center justify-center p-4 md:p-6 bg-white rounded-2xl shadow-sm hover:shadow-xl cursor-pointer transform transition-all duration-300 hover:-translate-y-2 border border-gray-100 hover:border-rose-200 overflow-hidden"
//                   onClick={() => handleClick(brand._id, brand.name)}
//                >
//                   {/* Background gradient on hover */}
//                   <div className="absolute inset-0 bg-gradient-to-br from-rose-50 to-orange-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

//                   {/* Brand image container */}
//                   <div className="relative z-10 w-16 h-16 md:w-20 md:h-20 flex items-center justify-center mb-3 md:mb-4 bg-gray-50 rounded-xl group-hover:bg-white transition-colors duration-300 group-hover:scale-110 transform">
//                      <img
//                         src={brand.img || "/placeholder.svg"}
//                         alt={brand.name}
//                         className="w-full h-full object-contain p-2 filter group-hover:brightness-110 transition-all duration-300"
//                      />
//                   </div>

//                   {/* Brand name */}
//                   <p className="relative z-10 text-sm md:text-base font-semibold text-gray-800 group-hover:text-rose-600 transition-colors duration-300 text-center leading-tight">
//                      {brand.name}
//                   </p>

//                   {/* Animated underline */}
//                   <div className="absolute bottom-3 left-4 right-4 h-0.5 bg-gradient-to-r from-rose-400 to-orange-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center rounded-full" />

//                   {/* Subtle shine effect */}
//                   <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-all duration-700"></div>
//                </div>
//             ))
//          )}
//       </div>
//    )
// }

// export default BrandCard
