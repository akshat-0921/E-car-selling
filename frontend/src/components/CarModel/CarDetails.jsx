
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { FaHeart, FaCar, FaGasPump, FaBolt, FaTachometerAlt, FaShoppingCart } from "react-icons/fa"
import { vehicleAPI } from "../../api"
import { toast } from "react-toastify"

const CarDetail = () => {
   const { vehicleId } = useParams()
   const [car, setCar] = useState(null)
   const [loading, setLoading] = useState(true)
   const [error, setError] = useState(null)
   const [isFavorite, setIsFavorite] = useState(false)

   useEffect(() => {
      const fetchCarDetails = async () => {
         try {
            setLoading(true)
            setError(null)

            if (!vehicleId) {
               setError("Vehicle ID is missing")
               return
            }

            const response = await vehicleAPI.getVehicleById(vehicleId)
            if (response.data.success) {
               setCar(response.data.vehicle)
               setIsFavorite(response.data.vehicle.isFavorite || false)
            } else {
               setError(response.data.message || "Failed to fetch vehicle details")
               toast.error(response.data.message || "Failed to fetch vehicle details")
            }
         } catch (error) {
            console.error("Error fetching car details:", error)
            setError(error.response?.data?.message || "Failed to fetch vehicle details")
            toast.error(error.response?.data?.message || "Failed to fetch vehicle details")
         } finally {
            setLoading(false)
         }
      }

      fetchCarDetails()
   }, [vehicleId])

   const toggleFavorite = async () => {
      try {
         if (isFavorite) {
            const response = await vehicleAPI.removeFromFavorites(vehicleId)
            if (response.data.success) {
               setIsFavorite(false)
               toast.success("Removed from favorites")
            }
         } else {
            const response = await vehicleAPI.addToFavorites(vehicleId)
            if (response.data.success) {
               setIsFavorite(true)
               toast.success("Added to favorites")
            }
         }
      } catch (error) {
         console.error("Error toggling favorite:", error)
         toast.error(error.response?.data?.message || "Failed to update favorites")
      }
   }

   if (loading) {
      return <div className="text-center p-8">Loading vehicle details...</div>
   }

   if (error || !car) {
      return <p className="text-center text-gray-600 p-8">{error || "No car data available"}</p>
   }

   return (
      <div className="max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-4">
         {/* Car Image Section */}
         <div className="grid md:grid-cols-2 gap-6">
            <div>
               <img
                  src={car.image || (car.images && car.images.length > 0 ? car.images[0] : "/placeholder.svg")}
                  alt={car.name}
                  className="w-full rounded-lg shadow-md object-cover h-80"
               />
            </div>

            {/* Car Details Section */}
            <div className="flex flex-col justify-between">
               <h1 className="text-3xl font-bold text-gray-800">{car.name}</h1>
               <p className="text-xl text-gray-600 mb-4">
                  Price: <span className="font-semibold text-green-600">₹{car.price?.toLocaleString() || "N/A"}</span>
               </p>

               {/* Key Specifications */}
               <div className="grid grid-cols-2 gap-4 text-lg text-gray-700">
                  <p>
                     <FaCar className="inline-block text-blue-500 mr-2" /> <strong>Fuel Type:</strong> {car.fuelType || "N/A"}
                  </p>
                  <p>
                     <FaBolt className="inline-block text-yellow-500 mr-2" /> <strong>Transmission:</strong>{" "}
                     {car.transmission || "N/A"}
                  </p>
                  <p>
                     <FaGasPump className="inline-block text-green-500 mr-2" /> <strong>Mileage:</strong>{" "}
                     {car.mileage || "N/A"}
                  </p>
                  <p>
                     <FaTachometerAlt className="inline-block text-red-500 mr-2" /> <strong>Top Speed:</strong>{" "}
                     {car.topSpeed || "N/A"} km/h
                  </p>
               </div>

               {/* Action Buttons */}
               <div className="flex mt-6 space-x-4">
                  <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
                     <FaShoppingCart className="inline-block mr-2" /> Book Now
                  </button>
                  <button
                     className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition"
                     onClick={toggleFavorite}
                  >
                     <FaHeart className={`inline-block mr-2 ${isFavorite ? "text-red-500" : "text-gray-500"}`} />
                     {isFavorite ? "Remove from Wishlist" : "Add to Wishlist"}
                  </button>
               </div>
            </div>
         </div>

         {/* Features Section */}
         {car.features && car.features.length > 0 && (
            <div className="mt-6">
               <h2 className="text-2xl font-semibold text-gray-800 mb-4">Key Features</h2>
               <ul className="grid grid-cols-2 md:grid-cols-3 gap-4 text-gray-700">
                  {car.features.map((feature, index) => (
                     <li key={index} className="bg-gray-100 p-3 rounded-md shadow-md">
                        {feature}
                     </li>
                  ))}
               </ul>
            </div>
         )}
      </div>
   )
}

export default CarDetail
