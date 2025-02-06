const VehicleCard = ({ vehicle }) => {
   const { image, name, brand, price, mileage, transmission, power, seating } = vehicle;

   return (
      <div className="flex items-center w-full p-4 mb-6 max-w-lg bg-white shadow-md rounded-lg">
         <img src={image} alt={name} className="w-36 h-24 object-cover rounded-md" />

         <div className="ml-4 flex flex-col justify-between w-full">
            <h2 className="text-xl font-bold">{brand} {name}</h2>
            <p className="text-lg font-semibold text-gray-700">₹{price.toLocaleString()}</p>

            <div className="mt-2 text-sm text-gray-600 grid grid-cols-2 gap-y-1">
               <p><strong>Mileage:</strong> {mileage} km/l</p>
               <p><strong>Transmission:</strong> {transmission}</p>
               <p><strong>Power:</strong> {power} HP</p>
               <p><strong>Seating:</strong> {seating} persons</p>
            </div>
         </div>
      </div>
   );
};

export default VehicleCard;


