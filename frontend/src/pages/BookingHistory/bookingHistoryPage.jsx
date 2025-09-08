import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchBookingHistory } from "../../redux/bookingSlice"; // ✅ case fixed
import {
   Loader,
   ServerCrash,
   Car,
   Building,
   BadgeCheck,
   Tag,
   IndianRupee,
   Receipt,
   CalendarClock
} from "lucide-react";
import { format } from "date-fns";

const LoadingState = () => (
   <div className="text-center py-20">
      <Loader className="mx-auto h-12 w-12 text-blue-500 animate-spin" />
      <p className="mt-4 text-slate-500">Loading your bookings...</p>
   </div>
);

const ErrorState = ({ error }) => (
   <div className="text-center py-20">
      <ServerCrash className="mx-auto h-12 w-12 text-red-500" />
      <p className="mt-4 font-semibold text-red-600">Failed to load bookings</p>
      <p className="text-slate-500">{error}</p>
   </div>
);

const EmptyState = () => (
   <div className="text-center py-20">
      <Car className="mx-auto h-12 w-12 text-slate-400" />
      <h3 className="mt-4 text-lg font-semibold text-slate-800 dark:text-white">No Bookings Yet</h3>
      <p className="mt-2 text-slate-500">Your vehicle purchases and bookings will appear here.</p>
   </div>
);

export default function BookingHistoryPage() {
   const dispatch = useDispatch();
   const { history, historyLoading, historyError } = useSelector((s) => s.booking);

   useEffect(() => {
      dispatch(fetchBookingHistory());
   }, [dispatch]);

   return (
      <div className="bg-slate-50 dark:bg-slate-900 min-h-screen">
         <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white mb-8">
               My Booking History
            </h1>

            {historyLoading ? (
               <LoadingState />
            ) : historyError ? (
               <ErrorState error={historyError} />
            ) : history.length === 0 ? (
               <EmptyState />
            ) : (
               <div className="space-y-6">
                  {history.map((booking) => (
                     <BookingCard key={booking._id} booking={booking} />
                  ))}
               </div>
            )}
         </div>
      </div>
   );
}

const BookingCard = ({ booking }) => {
   const {
      vehicleId: vehicle,
      showroomId: showroom,
      bookingStatus,
      payment,
      createdAt,
   } = booking || {};

   // Payment fields
   const total = payment?.totalAmount ?? 0;
   const advance = payment?.advancePayment ?? 0;
   const pending = payment?.pendingPayment ?? Math.max(total - advance, 0);
   const payStatus = payment?.paymentStatus || "N/A";
   const orderId = payment?.razorpayOrderId || "N/A";
   const payId = payment?.razorpayPaymentId || "N/A";
   const capturedAt = payment?.paymentCapturedAt ? new Date(payment.paymentCapturedAt) : null;

   return (
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-md border border-slate-200 dark:border-slate-700 overflow-hidden">
         <div className="p-6">
            <div className="flex flex-col sm:flex-row gap-6">
               {/* Vehicle Image */}
               <div className="flex-shrink-0 sm:w-48">
                  <img
                     src={vehicle?.image || "/placeholder.jpg"}
                     alt={vehicle?.name || "Vehicle"}
                     className="w-full h-32 object-cover rounded-lg"
                  />
               </div>

               {/* Details */}
               <div className="flex-grow">
                  <div className="flex justify-between items-start gap-4">
                     <div>
                        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                           {vehicle?.name || "Vehicle"}
                        </h2>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                           Booked on {createdAt ? format(new Date(createdAt), "PPP") : "N/A"}
                        </p>
                     </div>

                     <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold
                  ${bookingStatus === "Completed"
                              ? "bg-green-100 text-green-800"
                              : bookingStatus === "Confirmed"
                                 ? "bg-blue-100 text-blue-800"
                                 : bookingStatus === "Pending"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-slate-100 text-slate-800"}`}
                     >
                        {bookingStatus || "Unknown"}
                     </span>
                  </div>

                  <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-200 dark:border-slate-700 text-sm">
                     <DetailItem icon={Building} label="Showroom" value={`${showroom?.name || "N/A"}, ${showroom?.city || ""}`} />
                     <DetailItem icon={IndianRupee} label="Vehicle Price" value={fmtINR(vehicle?.price)} />

                     {/* 🔹 All payment details */}
                     <DetailItem icon={Receipt} label="Order ID" value={orderId} mono />
                     <DetailItem icon={Tag} label="Payment ID" value={payId} mono />

                     <DetailItem icon={IndianRupee} label="Total Amount" value={fmtINR(total)} />
                     <DetailItem icon={IndianRupee} label="Advance Paid" value={fmtINR(advance)} />
                     <DetailItem icon={IndianRupee} label="Pending Amount" value={fmtINR(pending)} />

                     <DetailItem
                        icon={BadgeCheck}
                        label="Payment Status"
                        value={payStatus}
                        pillColor={
                           payStatus === "Captured"
                              ? "bg-green-100 text-green-800"
                              : payStatus === "Failed"
                                 ? "bg-red-100 text-red-800"
                                 : "bg-yellow-100 text-yellow-800"
                        }
                     />
                     <DetailItem
                        icon={CalendarClock}
                        label="Captured At"
                        value={capturedAt ? format(capturedAt, "PPpp") : "—"}
                     />
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

function fmtINR(n) {
   if (typeof n !== "number") return "—";
   return `₹${n.toLocaleString("en-IN")}`;
}

const DetailItem = ({ icon: Icon, label, value, mono = false, pillColor }) => (
   <div className="flex items-center justify-between gap-3">
      <dt className="text-slate-500 dark:text-slate-400 flex items-center gap-2">
         <Icon size={16} />
         <span>{label}</span>
      </dt>
      {pillColor ? (
         <dd className={`text-xs font-semibold px-2 py-1 rounded-full ${pillColor}`}>{value}</dd>
      ) : (
         <dd className={`font-medium text-slate-700 dark:text-slate-200 ${mono ? "font-mono text-xs" : ""}`}>
            {value || "N/A"}
         </dd>
      )}
   </div>
);
