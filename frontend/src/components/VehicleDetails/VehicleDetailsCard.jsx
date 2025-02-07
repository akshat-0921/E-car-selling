import { useState } from "react"

const VehicleDetailsCard = ({ props }) => {
   const { brand, name, ratings, reviews, description, price } = props
   return (
      <div className="flex w-screen bg-gray-100 shadow-md mx-2 my-4">
         <img src={carImage} className="" />
      </div>
   )
}

export default VehicleDetailsCard
