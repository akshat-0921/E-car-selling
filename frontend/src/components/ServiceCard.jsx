import React, { useState } from "react";
import serviceBg from "../assets/car-service.jpg";

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
    Volkswagen: 5000
};

const ServiceCard = () => {
    const [showDetails, setShowDetails] = useState(false);
    const [car, setCar] = useState("");
    const [date, setDate] = useState("");
    const [timeSlot, setTimeSlot] = useState("");
    const [showroom, setShowroom] = useState("");

    return (
        <div className="service-card bg-cover bg-center" style={{ backgroundImage: `url(${serviceBg})` }}>
            <div className="service-overlay bg-black bg-opacity-50 p-8 rounded-lg text-white">
                <h2 className="text-3xl font-bold mb-4">Car Servicing</h2>
                <p className="mb-6">Schedule your car service at your convenience.</p>

                <div className="service-inputs space-y-4 mb-6">
                    <select
                        className="w-full p-3 rounded-md bg-gray-800 text-white"
                        value={car}
                        onChange={(e) => setCar(e.target.value)}
                    >
                        <option value="">Select Car</option>
                        {Object.keys(serviceCharges).map((carName) => (
                            <option key={carName} value={carName}>{carName}</option>
                        ))}
                    </select>

                    <input
                        type="date"
                        className="w-full p-3 rounded-md bg-gray-800 text-white"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />

                    <select
                        className="w-full p-3 rounded-md bg-gray-800 text-white"
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
                        className="w-full p-3 rounded-md bg-gray-800 text-white"
                        value={showroom}
                        onChange={(e) => setShowroom(e.target.value)}
                    />
                </div>

                <button
                    onClick={() => setShowDetails(!showDetails)}
                    className="px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-md text-white font-bold"
                >
                    Service Now
                </button>

                {showDetails && (
                    <div className="service-details mt-6 p-4 bg-gray-700 rounded-md">
                        <h3 className="text-2xl font-semibold mb-4">Service Details</h3>
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
