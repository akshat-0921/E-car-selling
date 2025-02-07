import { useNavigate } from "react-router-dom";

const VehicleCard = ({ vehicle }) => {
   const navigate = useNavigate()

   const { image, name, brand, price, mileage, transmission, power, seating } = vehicle;

   const handleClick = () => {
      navigate('/car-details', { state: { vehicle } })
   }

   return (
      <div onClick={handleClick} className="cursor-pointer flex items-center w-full px-10 py-3 mb-6 max-w-3xl bg-white shadow-md rounded-lg">
         <img src={image} alt={name} className="w-36 h-24 object-cover rounded-md" />

         <div className="ml-4 flex flex-col justify-between w-full">
            <h2 className="text-xl font-bold">{brand} {name}</h2>
            <p className="text-lg font-semibold text-gray-700">₹{price.toLocaleString()}</p>

            <div className="mt-2 text-sm text-gray-600 grid grid-cols-2 gap-y-1">
               <p> {mileage} km/l</p>
               <p> {transmission}</p>
               <p> {power} HP</p>
               <p> {seating} persons</p>
            </div>
         </div>
      </div>
   );
};

export default VehicleCard;


