// src/components/ServiceCard.jsx

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createBooking } from "../../redux/bookingSlice";
// Icons added for visual enhancement and do not affect logic.
import { Wrench, CalendarDays, Banknote, ShieldCheck, CheckCircle, XCircle } from 'lucide-react';

const ServiceCard = ({ vehicleId, showroomId }) => {
  // --- LOGIC: Unchanged ---
  const dispatch = useDispatch();
  const { loading, success, error } = useSelector((state) => state.booking);

  const [form, setForm] = useState({
    bookingDate: "",
    deliveryDate: "",
    amount: 0,
    paymentIntentId: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      createBooking({
        showroomId,
        vehicleId,
        payload: {
          ...form,
          purpose: "service",
        },
      })
    );
  };

  return (
    // --- STYLING: Updated to a theme-aware card ---
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto rounded-xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 dark:backdrop-blur-lg shadow-lg space-y-6"
    >
      <h2 className="text-2xl font-bold text-slate-900 dark:text-white text-center flex items-center justify-center gap-2">
        <Wrench className="w-6 h-6" />
        Book a Vehicle Service
      </h2>

      {/* --- STYLING: Inputs are updated with new classes, labels, and icons for readability --- */}
      <div className="space-y-4">
        <div>
          <label htmlFor="serviceBookingDate" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Service Date</label>
          <input
            id="serviceBookingDate"
            type="date"
            onChange={(e) => setForm({ ...form, bookingDate: e.target.value })}
            required
            className="block w-full rounded-md border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 py-2 px-3 shadow-sm transition focus:border-blue-500 focus:ring-blue-500 dark:focus:border-blue-400 dark:focus:ring-blue-400 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="serviceDeliveryDate" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Expected Return Date</label>
          <input
            id="serviceDeliveryDate"
            type="date"
            onChange={(e) => setForm({ ...form, deliveryDate: e.target.value })}
            required
            className="block w-full rounded-md border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 py-2 px-3 shadow-sm transition focus:border-blue-500 focus:ring-blue-500 dark:focus:border-blue-400 dark:focus:ring-blue-400 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="serviceAmount" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Service Cost (Est.)</label>
          <input
            id="serviceAmount"
            type="number"
            placeholder="Amount in ₹"
            onChange={(e) => setForm({ ...form, amount: e.target.value })}
            required
            className="block w-full rounded-md border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 py-2 px-3 shadow-sm transition focus:border-blue-500 focus:ring-blue-500 dark:focus:border-blue-400 dark:focus:ring-blue-400 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="servicePaymentId" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Payment Intent ID (Optional)</label>
          <input
            id="servicePaymentId"
            type="text"
            placeholder="e.g., pi_123abc..."
            onChange={(e) => setForm({ ...form, paymentIntentId: e.target.value })}
            // Assuming this might be optional for a service booking
            // required 
            className="block w-full rounded-md border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 py-2 px-3 shadow-sm transition focus:border-blue-500 focus:ring-blue-500 dark:focus:border-blue-400 dark:focus:ring-blue-400 sm:text-sm"
          />
        </div>
      </div>

      {/* --- STYLING: Button updated to match theme --- */}
      <button
        type="submit"
        className="w-full flex justify-center items-center rounded-md bg-blue-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-all duration-300 transform hover:scale-105 disabled:bg-slate-400 disabled:cursor-not-allowed"
        disabled={loading}
      >
        {loading ? "Booking..." : "Book Service"}
      </button>

      {/* --- STYLING: Feedback messages are enhanced visually --- */}
      <div className="pt-2 text-center h-6"> {/* Added fixed height to prevent layout shift */}
        {success && (
          <div className="flex items-center justify-center gap-x-2 text-green-600 dark:text-green-400 text-sm font-medium">
            <CheckCircle className="h-5 w-5" />
            <span>Service booked successfully!</span>
          </div>
        )}
        {error && (
          <div className="flex items-center justify-center gap-x-2 text-red-600 dark:text-red-400 text-sm font-medium">
            <XCircle className="h-5 w-5" />
            <span>{error}</span>
          </div>
        )}
      </div>
    </form>
  );
};

export default ServiceCard;
