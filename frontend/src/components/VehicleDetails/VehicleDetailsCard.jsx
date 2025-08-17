import React, { useState } from "react";
import {
   Calendar,
   Clock,
   MapPin,
   Fuel,
   Car,
   Gauge,
   Users,
   Cog,
   Star,
} from "lucide-react";

const VehicleDetailsCard = ({ vehicle }) => {
   const [selectedDate, setSelectedDate] = useState("");
   const [selectedTime, setSelectedTime] = useState("");
   const [showroom, setShowroom] = useState("");

   if (!vehicle) return null;

   const handleSubmit = (e) => {
      e.preventDefault();
      alert("Test drive booked successfully!");
   };

   return (
      <div className="max-w-6xl mx-auto p-6 space-y-6">
         {/* Vehicle Overview */}
         <div className="bg-white rounded-lg shadow overflow-hidden grid md:grid-cols-2">
            <div className="relative">
               <img
                  src={vehicle.image || "/placeholder.jpg"}
                  alt={vehicle.name}
                  className="w-full h-80 object-cover"
               />
               <div className="absolute top-4 left-4 bg-white/80 px-3 py-1 rounded text-sm font-medium">
                  {vehicle.type}
               </div>
               <div className="absolute top-4 right-4 bg-white/80 px-3 py-1 rounded flex items-center gap-1 text-sm">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  {vehicle.rating}
               </div>
            </div>
            <div className="p-6 space-y-4">
               <div>
                  <h1 className="text-3xl font-bold text-gray-900">{vehicle.name}</h1>
                  <p className="text-2xl font-semibold text-blue-600 mt-2">
                     ₹{vehicle.price}
                  </p>
               </div>
               <p className="text-gray-700">{vehicle.description}</p>

               <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                     <Fuel className="w-5 h-5 text-gray-500" />
                     <span>{vehicle.fuelType}</span>
                  </div>
                  <div className="flex items-center gap-2">
                     <Cog className="w-5 h-5 text-gray-500" />
                     <span>{vehicle.transmission}</span>
                  </div>
                  <div className="flex items-center gap-2">
                     <Users className="w-5 h-5 text-gray-500" />
                     <span>{vehicle.seatingCapacity} Seater</span>
                  </div>
                  <div className="flex items-center gap-2">
                     <Gauge className="w-5 h-5 text-gray-500" />
                     <span>{vehicle.mileage}</span>
                  </div>
                  <div className="flex items-center gap-2 col-span-2">
                     <Car className="w-5 h-5 text-gray-500" />
                     <span>{vehicle.engine}</span>
                  </div>
               </div>
            </div>
         </div>

         {/* Highlights Section */}
         <div className="grid md:grid-cols-3 gap-6">
            {/* Features */}
            <div className="bg-white shadow rounded-lg p-4 space-y-3">
               <h2 className="text-lg font-semibold flex items-center gap-2">
                  <Star className="w-5 h-5" />
                  Key Features
               </h2>
               <div className="flex flex-wrap gap-2">
                  {(vehicle.features || []).map((feature, i) => (
                     <span
                        key={i}
                        className="px-3 py-1 text-sm border border-gray-300 rounded-full"
                     >
                        {feature}
                     </span>
                  ))}
               </div>
            </div>

            {/* Colors */}
            <div className="bg-white shadow rounded-lg p-4 space-y-3">
               <h2 className="text-lg font-semibold">Available Colors</h2>
               <ul className="space-y-2 text-sm">
                  {(vehicle.colors || []).map((color, i) => (
                     <li key={i} className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-gray-400 border" />
                        <span>{color}</span>
                     </li>
                  ))}
               </ul>
            </div>

            {/* Test Drive Form */}
            <div className="bg-white shadow rounded-lg p-4 space-y-4">
               <h2 className="text-lg font-semibold flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Book Test Drive
               </h2>
               <form onSubmit={handleSubmit} className="space-y-3 text-sm">
                  <div className="space-y-1">
                     <label htmlFor="date" className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        Select Date
                     </label>
                     <input
                        id="date"
                        type="date"
                        className="w-full border rounded p-2"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        required
                     />
                  </div>
                  <div className="space-y-1">
                     <label htmlFor="time" className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        Select Time
                     </label>
                     <input
                        id="time"
                        type="time"
                        className="w-full border rounded p-2"
                        value={selectedTime}
                        onChange={(e) => setSelectedTime(e.target.value)}
                        required
                     />
                  </div>
                  <div className="space-y-1">
                     <label htmlFor="showroom" className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        Showroom
                     </label>
                     <input
                        id="showroom"
                        type="text"
                        className="w-full border rounded p-2"
                        placeholder="Enter showroom name"
                        value={showroom}
                        onChange={(e) => setShowroom(e.target.value)}
                        required
                     />
                  </div>
                  <button
                     type="submit"
                     className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                  >
                     Book Test Drive
                  </button>
               </form>
            </div>
         </div>

         {/* Technical Details */}
         <div className="bg-white rounded-lg shadow p-6 space-y-6">
            <h2 className="text-xl font-semibold">Detailed Specifications</h2>
            <div className="grid md:grid-cols-3 gap-6 text-sm">
               {/* Column 1 */}
               <div>
                  <h3 className="font-semibold mb-2">Engine & Performance</h3>
                  <p className="flex justify-between">
                     <span>Engine:</span>
                     <span>{vehicle.engine}</span>
                  </p>
                  <p className="flex justify-between">
                     <span>Fuel Type:</span>
                     <span>{vehicle.fuelType}</span>
                  </p>
                  <p className="flex justify-between">
                     <span>Mileage:</span>
                     <span>{vehicle.mileage}</span>
                  </p>
                  <p className="flex justify-between">
                     <span>Transmission:</span>
                     <span>{vehicle.transmission}</span>
                  </p>
               </div>

               {/* Column 2 */}
               <div>
                  <h3 className="font-semibold mb-2">Dimensions & Capacity</h3>
                  <p className="flex justify-between">
                     <span>Seating Capacity:</span>
                     <span>{vehicle.seatingCapacity}</span>
                  </p>
                  <p className="flex justify-between">
                     <span>Body Type:</span>
                     <span>{vehicle.type}</span>
                  </p>
                  <p className="flex justify-between">
                     <span>Fuel Tank:</span>
                     <span>40L</span>
                  </p>
                  <p className="flex justify-between">
                     <span>Boot Space:</span>
                     <span>506L</span>
                  </p>
               </div>

               {/* Column 3 */}
               <div>
                  <h3 className="font-semibold mb-2">Safety & Comfort</h3>
                  <p className="flex justify-between">
                     <span>Airbags:</span>
                     <span>6</span>
                  </p>
                  <p className="flex justify-between">
                     <span>ABS:</span>
                     <span>Yes</span>
                  </p>
                  <p className="flex justify-between">
                     <span>Power Steering:</span>
                     <span>Yes</span>
                  </p>
                  <p className="flex justify-between">
                     <span>AC:</span>
                     <span>Auto Climate</span>
                  </p>
               </div>
            </div>
         </div>
      </div>
   );
};

export default VehicleDetailsCard;



// import React, { useState } from "react";
// // import { testDriveAPI } from "../api"; // Uncomment and adjust if needed

// const VehicleDetailsCard = ({ vehicle }) => {
//    const [selectedDate, setSelectedDate] = useState("");
//    const [selectedTime, setSelectedTime] = useState("");
//    const [showroom, setShowroom] = useState("");

//    const handleSubmit = async (e) => {
//       e.preventDefault();
//       try {
//          await testDriveAPI.bookTestDrive({
//             vehicleId: vehicle._id,
//             date: selectedDate,
//             time: selectedTime,
//             showroom,
//          });
//          alert("Test drive booked successfully!");
//       } catch (err) {
//          console.error("Booking error:", err);
//          alert("Booking failed.");
//       }
//    };

//    if (!vehicle) return null;

//    return (
//       <div className="max-w-5xl mx-auto mt-10 p-8 bg-white rounded-2xl shadow-lg">
//          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//             {/* Vehicle Image */}
//             <div>
//                <img
//                   src={vehicle.images?.[0] || "/placeholder.svg"}
//                   alt={vehicle.name}
//                   className="rounded-xl w-full object-cover h-64 shadow-sm"
//                />
//             </div>

//             {/* Vehicle Info */}
//             <div>
//                <h1 className="text-4xl font-bold text-gray-800 mb-2">{vehicle.name}</h1>
//                <p className="text-gray-600 mb-4">{vehicle.description}</p>

//                <div className="space-y-2 text-gray-700">
//                   <p><span className="font-semibold">Brand:</span> {vehicle.brand?.name || "Unknown"}</p>
//                   <p><span className="font-semibold">Type:</span> {vehicle.type || "N/A"}</p>
//                   <p><span className="font-semibold">Fuel Type:</span> {vehicle.fuelType || "Electric"}</p>
//                   <p><span className="font-semibold">Battery:</span> {vehicle.battery} kWh</p>
//                   <p><span className="font-semibold">Range:</span> {vehicle.range} km</p>
//                   <p className="text-xl font-bold mt-4">Price: ₹{vehicle.price.toLocaleString()}</p>
//                </div>
//             </div>
//          </div>

//          {/* Test Drive Form */}
//          <div className="mt-10 border-t pt-6">
//             <h2 className="text-2xl font-semibold mb-4">Book a Test Drive</h2>
//             <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                <input
//                   type="date"
//                   className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   value={selectedDate}
//                   onChange={(e) => setSelectedDate(e.target.value)}
//                   required
//                />
//                <input
//                   type="time"
//                   className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   value={selectedTime}
//                   onChange={(e) => setSelectedTime(e.target.value)}
//                   required
//                />
//                <input
//                   type="text"
//                   placeholder="Showroom Name"
//                   className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   value={showroom}
//                   onChange={(e) => setShowroom(e.target.value)}
//                   required
//                />
//                <button
//                   type="submit"
//                   className="md:col-span-3 bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition"
//                >
//                   Book Test Drive
//                </button>
//             </form>
//          </div>
//       </div>
//    );
// };

// export default VehicleDetailsCard;
