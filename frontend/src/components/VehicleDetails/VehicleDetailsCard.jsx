import { useState } from "react"
import { useParams } from "react-router-dom"

const VehicleDetailsCard = () => {
   const params = useParams()
   console.log(params)

   return (
      <div className="flex w-screen bg-gray-100 shadow-md mx-2 my-4">
         <p>Vehicle id {params.vehicleId}</p>
      </div>
   )
}

export default VehicleDetailsCard
