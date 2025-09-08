// src/components/TestDriveCard.jsx

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createBooking } from "../../redux/bookingSlice";
// Icons are added for visual enhancement only; they don't change logic
import { CalendarDays, Banknote, ShieldCheck, CheckCircle, XCircle } from 'lucide-react';

const TestDriveCard = ({ vehicleId, showroomId }) => {
   // --- LOGIC: Unchanged ---
   const dispatch = useDispatch();
   const { loading, success, error } = useSelector((state) => state.booking);

   const [form, setForm] = useState({
      bookingDate: "",
      deliveryDate: "",
      amount: "",
      paymentIntentId: "",
   });

   const handleChange = (e) => {
      const { name, value } = e.target;
      setForm((prev) => ({ ...prev, [name]: value }));
   };

   const handleSubmit = (e) => {
      e.preventDefault();
      dispatch(
         createBooking({
            showroomId,
            vehicleId,
            payload: {
               ...form,
               // Note: The original component was named TestDriveCard but the fields suggest a booking/purchase.
               // The purpose is preserved as per the original logic.
               purpose: "test-drive",
            },
         })
      );
   };

   const today = new Date().toISOString().split("T")[0];

   return (
      // --- STYLING: Updated to a theme-aware card ---
      <form
         onSubmit={handleSubmit}
         className="max-w-md mx-auto rounded-xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 dark:backdrop-blur-lg shadow-lg space-y-6"
      >
         <h2 className="text-2xl font-bold text-slate-900 dark:text-white text-center">
            Book a Test Drive
         </h2>

         {/* --- STYLING: Inputs are updated with new classes and icons for readability --- */}
         <div className="space-y-4">
            <div>
               <label htmlFor="bookingDate" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-2">
                  <CalendarDays className="w-4 h-4 text-slate-500" />
                  Booking Date
               </label>
               <input
                  id="bookingDate"
                  type="date"
                  name="bookingDate"
                  value={form.bookingDate}
                  onChange={handleChange}
                  min={today}
                  required
                  className="block w-full rounded-md border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 py-2 px-3 shadow-sm transition focus:border-blue-500 focus:ring-blue-500 dark:focus:border-blue-400 dark:focus:ring-blue-400 sm:text-sm"
               />
            </div>

            <div>
               <label htmlFor="deliveryDate" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-2">
                  <CalendarDays className="w-4 h-4 text-slate-500" />
                  Delivery Date
               </label>
               <input
                  id="deliveryDate"
                  type="date"
                  name="deliveryDate"
                  value={form.deliveryDate}
                  onChange={handleChange}
                  min={form.bookingDate || today}
                  required
                  className="block w-full rounded-md border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 py-2 px-3 shadow-sm transition focus:border-blue-500 focus:ring-blue-500 dark:focus:border-blue-400 dark:focus:ring-blue-400 sm:text-sm"
               />
            </div>

            <div>
               <label htmlFor="amount" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-2">
                  <Banknote className="w-4 h-4 text-slate-500" />
                  Amount
               </label>
               <input
                  id="amount"
                  type="number"
                  name="amount"
                  placeholder="Enter amount in ₹"
                  value={form.amount}
                  onChange={handleChange}
                  min={0}
                  required
                  className="block w-full rounded-md border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 py-2 px-3 shadow-sm transition focus:border-blue-500 focus:ring-blue-500 dark:focus:border-blue-400 dark:focus:ring-blue-400 sm:text-sm"
               />
            </div>

            <div>
               <label htmlFor="paymentIntentId" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-slate-500" />
                  Payment Intent ID
               </label>
               <input
                  id="paymentIntentId"
                  type="text"
                  name="paymentIntentId"
                  placeholder="e.g., pi_123abc..."
                  value={form.paymentIntentId}
                  onChange={handleChange}
                  required
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
            {loading ? "Booking..." : "Book Test Drive"}
         </button>

         {/* --- STYLING: Feedback messages are enhanced visually --- */}
         <div className="pt-2 text-center h-6"> {/* Added fixed height to prevent layout shift */}
            {success && (
               <div className="flex items-center justify-center gap-x-2 text-green-600 dark:text-green-400 text-sm font-medium">
                  <CheckCircle className="h-5 w-5" />
                  <span>Booking successful!</span>
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

export default TestDriveCard;
