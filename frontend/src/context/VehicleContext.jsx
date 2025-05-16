import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import axios from "axios"

export const VehicleContext = createContext()

const VehicleContext = (props) => {

   const backendUrl = import.meta.env.VITE_BACKEND_URL
   const [vehicles, setVehicles] = useState([])
   const navigate = useNavigate()

   const getVehiclesData = async () => {
      try {
         const response = await axios.get(backendUrl + '/api/vehicle/get-all')
         if (response.data.success) {
            setVehicles(response.data.vehicles.reverse())
         } else {
            toast.error(response.data.message)
         }
      } catch (error) {
         console.log(error)
         toast.error(error.message)
      }
   }

   useEffect(() => {
      getVehiclesData()
   }, [])

   const value = { vehicles }

   return (
      <VehicleContext.Provider value={value}>
         {props.children}
      </VehicleContext.Provider>
   )
}

export default VehicleContext