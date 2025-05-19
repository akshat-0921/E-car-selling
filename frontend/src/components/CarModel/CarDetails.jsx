import React from "react";
import { FaHeart, FaCar, FaGasPump, FaBolt, FaTachometerAlt, FaShoppingCart } from "react-icons/fa";

const CarDetail = ({ car }) => {
   if (!car) {
      return <p className="text-center text-gray-600">No car data available</p>;
   }

   return (
      <div className="max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-4">
         {/* Car Image Section */}
         <div className="grid md:grid-cols-2 gap-6">
            <div>
               <img src={car.image} alt={car.name} className="w-full rounded-lg shadow-md object-cover h-80" />
            </div>

            {/* Car Details Section */}
            <div className="flex flex-col justify-between">
               <h1 className="text-3xl font-bold text-gray-800">{car.name}</h1>
               <p className="text-xl text-gray-600 mb-4">Price: <span className="font-semibold text-green-600">₹{car.price}</span></p>

               {/* Key Specifications */}
               <div className="grid grid-cols-2 gap-4 text-lg text-gray-700">
                  <p><FaCar className="inline-block text-blue-500 mr-2" /> <strong>Fuel Type:</strong> {car.fuelType}</p>
                  <p><FaBolt className="inline-block text-yellow-500 mr-2" /> <strong>Transmission:</strong> {car.transmission}</p>
                  <p><FaGasPump className="inline-block text-green-500 mr-2" /> <strong>Mileage:</strong> {car.mileage} km/l</p>
                  <p><FaTachometerAlt className="inline-block text-red-500 mr-2" /> <strong>Top Speed:</strong> {car.topSpeed} km/h</p>
               </div>

               {/* Action Buttons */}
               <div className="flex mt-6 space-x-4">
                  <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
                     <FaShoppingCart className="inline-block mr-2" /> Book Now
                  </button>
                  <button className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition">
                     <FaHeart className="inline-block text-red-500 mr-2" /> Add to Wishlist
                  </button>
               </div>
            </div>
         </div>

         {/* Features Section */}
         <div className="mt-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Key Features</h2>
            <ul className="grid grid-cols-2 md:grid-cols-3 gap-4 text-gray-700">
               {car.features.map((feature, index) => (
                  <li key={index} className="bg-gray-100 p-3 rounded-md shadow-md">{feature}</li>
               ))}
            </ul>
         </div>
      </div>
   );
};

export default CarDetail;
