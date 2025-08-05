import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createBooking } from "../../redux/bookingSlice";

const TestDriveCard = ({ vehicleId, showroomId }) => {
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
               purpose: "test-drive",
            },
         })
      );
   };

   const today = new Date().toISOString().split("T")[0];

   return (
      <form
         onSubmit={handleSubmit}
         className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6 space-y-4"
      >
         <h2 className="text-xl font-semibold mb-2">Book a Test Drive</h2>

         <div className="flex flex-col">
            <label className="mb-1">Booking Date</label>
            <input
               type="date"
               name="bookingDate"
               value={form.bookingDate}
               onChange={handleChange}
               min={today}
               required
               className="input input-bordered"
            />
         </div>

         <div className="flex flex-col">
            <label className="mb-1">Delivery Date</label>
            <input
               type="date"
               name="deliveryDate"
               value={form.deliveryDate}
               onChange={handleChange}
               min={form.bookingDate || today}
               required
               className="input input-bordered"
            />
         </div>

         <div className="flex flex-col">
            <label className="mb-1">Amount</label>
            <input
               type="number"
               name="amount"
               placeholder="Enter amount"
               value={form.amount}
               onChange={handleChange}
               min={0}
               required
               className="input input-bordered"
            />
         </div>

         <div className="flex flex-col">
            <label className="mb-1">Payment Intent ID</label>
            <input
               type="text"
               name="paymentIntentId"
               placeholder="Enter Payment Intent ID"
               value={form.paymentIntentId}
               onChange={handleChange}
               required
               className="input input-bordered"
            />
         </div>

         <button
            type="submit"
            className="btn btn-primary w-full mt-4"
            disabled={loading}
         >
            {loading ? "Booking..." : "Book Test Drive"}
         </button>

         {success && <p className="text-green-600 text-sm mt-2">✅ Booking successful!</p>}
         {error && <p className="text-red-600 text-sm mt-2">❌ {error}</p>}
      </form>
   );
};

export default TestDriveCard;
