import { createContext, useEffect, useState } from "react"
import { toast } from "react-toastify"
import { vehicleAPI } from "../api"

export const VehicleContext = createContext()

const VehicleProvider = (props) => {
   const [vehicles, setVehicles] = useState([])
   const [loading, setLoading] = useState(false)
   const [error, setError] = useState(null)
   const [filters, setFilters] = useState({})

   const getVehiclesData = async (filterParams = {}) => {
      try {
         setLoading(true)
         setError(null)
         const response = await vehicleAPI.getAllVehicles(filterParams)
         if (response.data.success) {
            setVehicles(response.data.vehicles || [])
         } else {
            setError(response.data.message || "Failed to fetch vehicles")
            toast.error(response.data.message || "Failed to fetch vehicles")
         }
      } catch (error) {
         console.error("Error fetching vehicles:", error)
         setError(error.message || "Failed to fetch vehicles")
         toast.error(error.response?.data?.message || "Failed to fetch vehicles")
      } finally {
         setLoading(false)
      }
   }

   const getVehicleById = async (id) => {
      try {
         setLoading(true)
         const response = await vehicleAPI.getVehicleById(id)
         if (response.data.success) {
            return response.data.vehicle
         } else {
            toast.error(response.data.message || "Failed to fetch vehicle details")
            return null
         }
      } catch (error) {
         console.error("Error fetching vehicle details:", error)
         toast.error(error.response?.data?.message || "Failed to fetch vehicle details")
         return null
      } finally {
         setLoading(false)
      }
   }

   const getVehiclesByBrand = async (brand) => {
      try {
         setLoading(true)
         const response = await vehicleAPI.getVehiclesByBrand(brand)
         if (response.data.success) {
            return response.data.vehicles
         } else {
            toast.error(response.data.message || "Failed to fetch vehicles by brand")
            return []
         }
      } catch (error) {
         console.error("Error fetching vehicles by brand:", error)
         toast.error(error.response?.data?.message || "Failed to fetch vehicles by brand")
         return []
      } finally {
         setLoading(false)
      }
   }

   const addToFavorites = async (vehicleId) => {
      try {
         const response = await vehicleAPI.addToFavorites(vehicleId)
         if (response.data.success) {
            toast.success("Added to favorites")
            return true
         } else {
            toast.error(response.data.message || "Failed to add to favorites")
            return false
         }
      } catch (error) {
         console.error("Error adding to favorites:", error)
         toast.error(error.response?.data?.message || "Failed to add to favorites")
         return false
      }
   }

   const removeFromFavorites = async (vehicleId) => {
      try {
         const response = await vehicleAPI.removeFromFavorites(vehicleId)
         if (response.data.success) {
            toast.success("Removed from favorites")
            return true
         } else {
            toast.error(response.data.message || "Failed to remove from favorites")
            return false
         }
      } catch (error) {
         console.error("Error removing from favorites:", error)
         toast.error(error.response?.data?.message || "Failed to remove from favorites")
         return false
      }
   }

   const getFavorites = async () => {
      try {
         setLoading(true)
         const response = await vehicleAPI.getFavorites()
         if (response.data.success) {
            return response.data.favorites
         } else {
            toast.error(response.data.message || "Failed to fetch favorites")
            return []
         }
      } catch (error) {
         console.error("Error fetching favorites:", error)
         toast.error(error.response?.data?.message || "Failed to fetch favorites")
         return []
      } finally {
         setLoading(false)
      }
   }

   const applyFilters = (newFilters) => {
      setFilters(newFilters)
      getVehiclesData(newFilters)
   }

   useEffect(() => {
      getVehiclesData()
   }, [])

   const value = {
      vehicles,
      loading,
      error,
      filters,
      getVehiclesData,
      getVehicleById,
      getVehiclesByBrand,
      addToFavorites,
      removeFromFavorites,
      getFavorites,
      applyFilters,
   }

   return <VehicleContext.Provider value={value}>{props.children}</VehicleContext.Provider>
}

export default VehicleProvider
