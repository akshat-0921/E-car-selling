import React, { useState } from "react";
// import { testDriveAPI } from "../api"; // adjust if your API service is structured differently

const VehicleDetailsCard = ({ vehicle }) => {
   const [selectedDate, setSelectedDate] = useState("");
   const [selectedTime, setSelectedTime] = useState("");
   const [showroom, setShowroom] = useState("");

   const handleSubmit = async (e) => {
      e.preventDefault();
      try {
         await testDriveAPI.bookTestDrive({
            vehicleId: vehicle._id,
            date: selectedDate,
            time: selectedTime,
            showroom,
         });
         alert("Test drive booked successfully!");
      } catch (err) {
         console.error("Booking error:", err);
         alert("Booking failed.");
      }
   };

   return (
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-6">
         <h1 className="text-3xl font-bold mb-2">{vehicle.name}</h1>
         <p className="text-gray-700 mb-4">{vehicle.description}</p>
         <p className="font-semibold mb-4">Price: ₹{vehicle.price}</p>

         <form onSubmit={handleSubmit} className="space-y-4">
            <input
               type="date"
               className="w-full border rounded p-2"
               value={selectedDate}
               onChange={(e) => setSelectedDate(e.target.value)}
               required
            />
            <input
               type="time"
               className="w-full border rounded p-2"
               value={selectedTime}
               onChange={(e) => setSelectedTime(e.target.value)}
               required
            />
            <input
               type="text"
               className="w-full border rounded p-2"
               placeholder="Showroom Name"
               value={showroom}
               onChange={(e) => setShowroom(e.target.value)}
               required
            />
            <button
               type="submit"
               className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
            >
               Book Test Drive
            </button>
         </form>
      </div>
   );
};

export default VehicleDetailsCard;
