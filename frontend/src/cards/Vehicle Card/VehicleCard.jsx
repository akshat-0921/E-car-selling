import { NavLink } from "react-router-dom"
import { useState, useContext } from "react"
import { FaHeart } from "react-icons/fa"
import { VehicleContext } from "../../context/VehicleContext"
import { toast } from "react-toastify"

const VehicleCard = ({ vehicle }) => {
   const { addToFavorites, removeFromFavorites } = useContext(VehicleContext)
   const [isFavorite, setIsFavorite] = useState(vehicle.isFavorite || false)
   const [isLoading, setIsLoading] = useState(false)

   const { _id, vehicleId, image, images, name, brand, price, mileage, transmission, power, seating } = vehicle
   const id = _id || vehicleId
   const displayImage = image || (images && images.length > 0 ? images[0] : "/placeholder.svg")
   const brandName = typeof brand === "object" ? brand.name : brand

   const handleFavoriteClick = async (e) => {
      e.preventDefault() // Prevent navigation
      e.stopPropagation()

      if (!id) {
         toast.error("Cannot add to favorites: Vehicle ID is missing")
         return
      }

      setIsLoading(true)

      try {
         if (isFavorite) {
            const success = await removeFromFavorites(id)
            if (success) {
               setIsFavorite(false)
            }
         } else {
            const success = await addToFavorites(id)
            if (success) {
               setIsFavorite(true)
            }
         }
      } catch (error) {
         console.error("Error toggling favorite:", error)
         toast.error("Failed to update favorites")
      } finally {
         setIsLoading(false)
      }
   }

   return (
      <NavLink to={`/vehicles/${id}`}>
         <div className="cursor-pointer flex items-center w-full px-10 py-3 mb-6 max-w-3xl bg-white shadow-md rounded-lg relative">
            <img src={displayImage || "/placeholder.svg"} alt={name} className="w-36 h-24 object-cover rounded-md" />

            <div className="ml-4 flex flex-col justify-between w-full">
               <div className="flex justify-between items-start">
                  <h2 className="text-xl font-bold">
                     {brandName} {name}
                  </h2>
                  <button
                     onClick={handleFavoriteClick}
                     disabled={isLoading}
                     className={`p-2 rounded-full ${isLoading ? "opacity-50" : ""}`}
                  >
                     <FaHeart className={`text-xl ${isFavorite ? "text-red-500" : "text-gray-300"}`} />
                  </button>
               </div>
               <p className="text-lg font-semibold text-gray-700">₹{price?.toLocaleString() || "Price unavailable"}</p>

               <div className="mt-2 text-sm text-gray-600 grid grid-cols-2 gap-y-1">
                  <p>{mileage || "N/A"} km/l</p>
                  <p>{transmission || "N/A"}</p>
                  <p>{power || "N/A"} HP</p>
                  <p>{seating || "N/A"} persons</p>
               </div>
            </div>
         </div>
      </NavLink>
   )
}

export default VehicleCard
