import React, { useState } from "react";
import "./ServiceCard.css";
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
        <div className="service-card" style={{ backgroundImage: `url(${serviceBg})` }}>
            <div className="service-overlay">
                <h2>Car Servicing</h2>
                <p>Schedule your car service at your convenience.</p>

                <div className="service-inputs">
                    <select value={car} onChange={(e) => setCar(e.target.value)}>
                        <option value="">Select Car</option>
                        {Object.keys(serviceCharges).map((carName) => (
                            <option key={carName} value={carName}>{carName}</option>
                        ))}
                    </select>
                    <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                    <select value={timeSlot} onChange={(e) => setTimeSlot(e.target.value)}>
                        <option value="">Select Time Slot</option>
                        <option value="9 AM - 11 AM">9 AM - 11 AM</option>
                        <option value="11 AM - 1 PM">11 AM - 1 PM</option>
                        <option value="2 PM - 4 PM">2 PM - 4 PM</option>
                        <option value="4 PM - 6 PM">4 PM - 6 PM</option>
                    </select>
                    <input type="text" placeholder="Enter Showroom" value={showroom} onChange={(e) => setShowroom(e.target.value)} />
                </div>

                <button onClick={() => setShowDetails(!showDetails)}>Service Now</button>

                {showDetails && (
                    <div className="service-details">
                        <h3>Service Details</h3>
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
