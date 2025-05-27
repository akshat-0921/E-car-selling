
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { brandAPI } from "../../api"
import { toast } from "react-toastify"

const BrandCard = () => {
   const [brands, setBrands] = useState([])
   const [loading, setLoading] = useState(true)
   const navigate = useNavigate()

   useEffect(() => {
      const fetchBrands = async () => {
         try {
            setLoading(true)
            const response = await brandAPI.getAllBrands()
            if (response.data.success) {
               const brandsWithImages = response.data.brands.map((brand) => ({
                  name: brand.name,
                  img: brand.image || "/placeholder.svg?height=100&width=100",
                  _id: brand._id,
               }))
               setBrands(brandsWithImages)
            } else {
               toast.error(response.data.message || "Failed to fetch brands")
            }
         } catch (error) {
            console.error("Error fetching brands:", error)
            toast.error(error.response?.data?.message || "Failed to fetch brands")
         } finally {
            setLoading(false)
         }
      }

      fetchBrands()
   }, [])

   const handleClick = (brandId, brandName) => {
      navigate(`/brand-search?brand=${brandId}`)
   }

   if (loading) {
      return (
         <div className="flex justify-center items-center h-64">
            <p className="text-gray-500">Loading brands...</p>
         </div>
      )
   }

   return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 p-6 max-w-[1200px] mx-auto">
         {brands.length === 0 ? (
            <div className="col-span-full text-center py-10">
               <p className="text-gray-500">No brands available</p>
            </div>
         ) : (
            brands.map((brand, index) => (
               <div
                  key={brand._id || index}
                  className="relative group w-full flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-lg cursor-pointer hover:scale-105 transform transition-transform duration-300 border border-gray-200"
                  onClick={() => handleClick(brand._id, brand.name)}
               >
                  <div className="w-24 h-24 flex items-center justify-center mb-4">
                     <img src={brand.img || "/placeholder.svg"} alt={brand.name} className="w-full h-full object-contain" />
                  </div>
                  <p className="text-base font-semibold text-gray-800 group-hover:text-rose-500 transition-colors duration-300">
                     {brand.name}
                  </p>
                  <div className="absolute bottom-4 left-6 right-6 h-1 bg-rose-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full" />
               </div>
            ))
         )}
      </div>
   )
}

export default BrandCard
