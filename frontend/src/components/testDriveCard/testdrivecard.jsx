import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createBooking } from "../../redux/bookingSlice";

const TestDriveCard = ({ vehicleId, showroomId }) => {
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
               purpose: "test-drive",
            },
         })
      );
   };

   return (
      <form onSubmit={handleSubmit} className="space-y-4">
         <input type="date" onChange={(e) => setForm({ ...form, bookingDate: e.target.value })} required />
         <input type="date" onChange={(e) => setForm({ ...form, deliveryDate: e.target.value })} required />
         <input type="number" placeholder="Amount" onChange={(e) => setForm({ ...form, amount: e.target.value })} required />
         <input type="text" placeholder="Payment Intent ID" onChange={(e) => setForm({ ...form, paymentIntentId: e.target.value })} required />
         <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "Booking..." : "Book Test Drive"}
         </button>
         {success && <p className="text-green-500">Booking successful!</p>}
         {error && <p className="text-red-500">{error}</p>}
      </form>
   );
};

export default TestDriveCard;
