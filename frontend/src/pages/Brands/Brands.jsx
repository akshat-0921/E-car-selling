import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllBrandsThunk } from "../../redux/brandSlice";
import ClipLoader from "react-spinners/ClipLoader";

const ShowBrands = () => {

   const dispatch = useDispatch();
   const { brands, loading, error } = useSelector((state) => state.brand);

   useEffect(() => {
      dispatch(getAllBrandsThunk())
   }, [dispatch])

   return (
      <div className="min-h-screen bg-white py-10 px-4">
         <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl font-semibold text-center text-black mb-12">Explore Car Brands</h1>

            {loading ? (
               <div className="flex items-center justify-center min-h-screen">
                  <ClipLoader size={50} color="#2563eb" /> {/* Blue spinner */}
               </div>
            ) : error ? (
               <p className="text-center text-red-500">{error}</p>
            ) : (
               <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8">
                  {brands.map((brand) => (
                     <div
                        key={brand._id}
                        className="border border-gray-200 rounded-2xl p-6 flex flex-col items-center bg-white hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
                     >
                        <img
                           src={brand.logo}
                           alt={brand.name}
                           className="w-32 h-32 object-contain mb-4"
                        />
                        <h3 className="text-lg font-medium text-gray-800 text-center">{brand.name}</h3>
                     </div>
                  ))}
               </div>
            )}
         </div>
      </div>
   )
};

export default ShowBrands;
