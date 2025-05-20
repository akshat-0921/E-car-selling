import React, { useState } from "react";
import brandImages from "../../assets/brandImages";

const serviceBg = brandImages["CarService"] || Object.values(brandImages)[0];

const serviceCharges = {
  Tesla: 5000,
  BMW: 6000,
  Mercedes: 7000,
  Audi: 6500,
  Ford: 4000,
  Honda: 3500,
  Toyota: 4500,
  Nissan: 3800,
  Lexus: 7200,
  Chevrolet: 3900,
  Porsche: 9000,
  Volkswagen: 5000,
};

const ServiceCard = () => {
  const [showDetails, setShowDetails] = useState(false);
  const [car, setCar] = useState("");
  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [showroom, setShowroom] = useState("");

  return (
    <div
      className="w-full max-w-xl h-auto bg-cover bg-center rounded-lg overflow-hidden shadow-lg mx-auto my-6 relative"
      style={{ backgroundImage: `url(${serviceBg})` }}
    >
      <div className="bg-black bg-opacity-60 text-white p-6 flex flex-col items-center justify-center">
        <h2 className="text-3xl font-bold mb-2">Car Servicing</h2>
        <p className="mb-4 text-center">Schedule your car service at your convenience.</p>

        <div className="flex flex-col gap-3 w-full max-w-md">
          <select
            className="px-4 py-2 rounded bg-white text-black focus:outline-none"
            value={car}
            onChange={(e) => setCar(e.target.value)}
          >
            <option value="">Select Car</option>
            {Object.keys(serviceCharges).map((carName) => (
              <option key={carName} value={carName}>
                {carName}
              </option>
            ))}
          </select>

          <input
            type="date"
            className="px-4 py-2 rounded bg-white text-black focus:outline-none"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />

          <select
            className="px-4 py-2 rounded bg-white text-black focus:outline-none"
            value={timeSlot}
            onChange={(e) => setTimeSlot(e.target.value)}
          >
            <option value="">Select Time Slot</option>
            <option value="9 AM - 11 AM">9 AM - 11 AM</option>
            <option value="11 AM - 1 PM">11 AM - 1 PM</option>
            <option value="2 PM - 4 PM">2 PM - 4 PM</option>
            <option value="4 PM - 6 PM">4 PM - 6 PM</option>
          </select>

          <input
            type="text"
            placeholder="Enter Showroom"
            className="px-4 py-2 rounded bg-white text-black focus:outline-none"
            value={showroom}
            onChange={(e) => setShowroom(e.target.value)}
          />
        </div>

        <button
          className="mt-5 px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded font-semibold"
          onClick={() => setShowDetails(!showDetails)}
        >
          Service Now
        </button>

        {showDetails && (
          <div className="mt-6 bg-white bg-opacity-20 p-4 rounded text-center text-white w-full max-w-md">
            <h3 className="text-xl font-semibold mb-2">Service Details</h3>
            <p><strong>Car:</strong> {car || "Not Selected"}</p>
            <p><strong>Date:</strong> {date || "Not Selected"}</p>
            <p><strong>Time Slot:</strong> {timeSlot || "Not Selected"}</p>
            <p><strong>Showroom:</strong> {showroom || "Not Entered"}</p>
            <p><strong>Service Charge:</strong> ₹{car ? serviceCharges[car] : "Not Selected"}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ServiceCard;
