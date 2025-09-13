import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
   User,
   Mail,
   Building,
   Banknote,
   CreditCard,
} from "lucide-react";
import { useSelector } from "react-redux";

const FormInput = ({ name, type, placeholder, value, icon: Icon, readOnly = false }) => (
   <div>
      <label htmlFor={name} className="sr-only">
         {placeholder}
      </label>
      <div className="relative">
         <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Icon className="h-5 w-5 text-slate-400" />
         </div>
         <input
            id={name}
            type={type}
            name={name}
            placeholder={placeholder}
            value={value}
            readOnly={readOnly}
            required
            className="block w-full rounded-md border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 py-3 pl-10 pr-3 shadow-sm text-slate-900 dark:text-white placeholder:text-slate-400 read-only:bg-slate-100 dark:read-only:bg-slate-700/50 read-only:cursor-not-allowed"
         />
      </div>
   </div>
);

export default function RazorpayPaymentForm({
   amount,
   vehicleId,
   showroomId,
   vehicleName,
   showroomName,
   initialUserDetails,
}) {
   const [form, setForm] = useState({ name: "", email: "" });
   const [isSubmitting, setIsSubmitting] = useState(false);
   const navigate = useNavigate();


   const userId = useSelector((state) => state.auth.user?.id);

   useEffect(() => {
      if (initialUserDetails) {
         setForm({
            name: `${initialUserDetails.firstName} ${initialUserDetails.lastName}`,
            email: initialUserDetails.email,
         });
      }
   }, [initialUserDetails]);

   const loadRazorpay = (src) =>
      new Promise((resolve) => {
         const script = document.createElement("script");
         script.src = src;
         script.onload = () => resolve(true);
         script.onerror = () => resolve(false);
         document.body.appendChild(script);
      });

   const handleSubmit = async (e) => {
      e.preventDefault();
      setIsSubmitting(true);

      const res = await loadRazorpay(
         "https://checkout.razorpay.com/v1/checkout.js"
      );
      if (!res) {
         toast.error("Failed to load Razorpay SDK");
         setIsSubmitting(false);
         return;
      }

      try {
         amount = Number(amount);
         // ✅ Pay only 5% or max 25k as advance
         const advanceAmount = Math.min(amount * 0.05, 25000);

         const { data } = await axios.post(
            "http://localhost:4000/api/payment/create-payment",
            { amount: advanceAmount }
         );

         const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY_ID,
            amount: data.order.amount,
            currency: "INR",
            name: "DriveIt Checkout",
            description: `Payment for ${vehicleName}`,
            order_id: data.order.id,
            handler: async function (response) {
               try {
                  const verifyPayload = {
                     ...response,
                     vehicleId,
                     showroomId,
                     userId: userId, // 👈 include userId
                     amount, // full vehicle price for booking
                  };

                  const verify = await axios.post(
                     "http://localhost:4000/api/payment/verify-razorpay",
                     verifyPayload
                  );

                  if (verify.data.success) {
                     toast.success("✅ Booking confirmed!");
                     navigate("/bookings/history"); // redirect
                  } else {
                     toast.error("⚠️ Payment verification failed.");
                  }
               } catch (err) {
                  toast.error("Something went wrong while verifying payment.");
               }
            },
            prefill: {
               name: form.name,
               email: form.email,
            },
            notes: {
               vehicle_name: vehicleName,
               showroom_name: showroomName,
            },
            theme: { color: "#2563EB" },
         };

         const rzp = new window.Razorpay(options);
         rzp.open();
      } catch (error) {
         toast.error("Payment could not be initiated.");
      } finally {
         setIsSubmitting(false);
      }
   };

   return (
      <div className="rounded-xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 shadow-lg">
         <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
            Your Details
         </h2>
         <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <FormInput
               type="text"
               name="name"
               placeholder="Full Name"
               value={form.name}
               icon={User}
               readOnly
            />
            <FormInput
               type="email"
               name="email"
               placeholder="Email Address"
               value={form.email}
               icon={Mail}
               readOnly
            />
            <FormInput
               type="text"
               name="showroom"
               placeholder="Showroom Name"
               value={showroomName}
               icon={Building}
               readOnly
            />
            <FormInput
               type="text"
               name="amount"
               placeholder="Total Amount (INR)"
               value={`₹${parseInt(amount).toLocaleString()}`}
               icon={Banknote}
               readOnly
            />

            <button
               type="submit"
               disabled={isSubmitting}
               className="w-full flex justify-center items-center gap-x-2 mt-2 rounded-md bg-blue-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-blue-700 transition-all disabled:opacity-60"
            >
               <CreditCard className="w-5 h-5" />
               {isSubmitting ? "Processing..." : "Proceed to Pay (5% Advance)"}
            </button>
         </form>
      </div>
   );
}




// // src/components/payments/RazorpayPaymentForm.jsx

// import { useState, useEffect } from "react";
// import axios from "axios";
// import { toast } from 'react-toastify';
// import { User, Mail, Building, Banknote, CreditCard, Car as CarIcon } from 'lucide-react';

// const FormInput = ({ name, type, placeholder, value, icon: Icon, readOnly = false }) => (
//    <div>
//       <label htmlFor={name} className="sr-only">{placeholder}</label>
//       <div className="relative">
//          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
//             <Icon className="h-5 w-5 text-slate-400" />
//          </div>
//          <input
//             id={name}
//             type={type}
//             name={name}
//             placeholder={placeholder}
//             value={value}
//             readOnly={readOnly}
//             required
//             className="block w-full rounded-md border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 py-3 pl-10 pr-3 shadow-sm text-slate-900 dark:text-white placeholder:text-slate-400 read-only:bg-slate-100 dark:read-only:bg-slate-700/50 read-only:cursor-not-allowed"
//          />
//       </div>
//    </div>
// );

// export default function RazorpayPaymentForm({ amount, vehicleId, showroomId, vehicleName, showroomName, initialUserDetails }) {
//    const [form, setForm] = useState({ name: "", email: "" });
//    const [isSubmitting, setIsSubmitting] = useState(false);
//    // const [maxAmount, setMaxAmount] = useState(0);

//    useEffect(() => {
//       if (initialUserDetails) {
//          setForm({
//             name: `${initialUserDetails.firstName} ${initialUserDetails.lastName}`,
//             email: initialUserDetails.email,
//          });
//       }
//    }, [initialUserDetails]);

//    const handleChange = (e) => {
//       setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//    };

//    const loadRazorpay = (src) => new Promise((resolve) => {
//       const script = document.createElement("script");
//       script.src = src;
//       script.onload = () => resolve(true);
//       script.onerror = () => resolve(false);
//       document.body.appendChild(script);
//    });

//    const handleSubmit = async (e) => {
//       e.preventDefault();
//       setIsSubmitting(true);

//       const res = await loadRazorpay("https://checkout.razorpay.com/v1/checkout.js");
//       if (!res) {
//          toast.error("Failed to load Razorpay SDK");
//          setIsSubmitting(false);
//          return;
//       }

//       try {
//          amount = Number(amount)
//          const calculatedMaxAmount = Math.min(amount * 0.05, 25000)
//          console.log(typeof (amount))

//          const { data } = await axios.post("http://localhost:4000/api/payment/create-payment", { amount: calculatedMaxAmount });

//          const options = {
//             key: import.meta.env.VITE_RAZORPAY_KEY_ID,
//             amount: Number(data.order.amount),
//             currency: "INR",
//             name: "AutoSphere Vehicle Purchase",
//             description: `Payment for ${vehicleName}`,
//             order_id: data.order.id,
//             handler: async function (response) {
//                const verifyPayload = { ...response, vehicleId, showroomId, amount };
//                const verify = await axios.post("http://localhost:4000/api/payment/verify-razorpay", verifyPayload);
//                if (verify.data.success) {
//                   toast.success("Payment Verified! Your order is confirmed.");
//                } else {
//                   toast.error("Payment verification failed.");
//                }
//             },
//             prefill: {
//                name: form.name,
//                email: form.email,
//             },
//             notes: {
//                vehicle_id: vehicleId,
//                showroom_id: showroomId,
//                vehicle_name: vehicleName,
//             },
//             theme: { color: "#2563EB" },
//          };

//          const rzp = new window.Razorpay(options);
//          rzp.open();
//       } catch (error) {
//          toast.error("Payment could not be initiated.");
//       } finally {
//          setIsSubmitting(false);
//       }
//    };

//    return (
//       <div className="rounded-xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 shadow-lg">
//          <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Your Details</h2>
//          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
//             <FormInput type="text" name="name" placeholder="Full Name" value={form.name} onChange={handleChange} icon={User} />
//             <FormInput type="email" name="email" placeholder="Email Address" value={form.email} onChange={handleChange} icon={Mail} />
//             <FormInput type="text" name="showroom" placeholder="Showroom Name" value={showroomName} icon={Building} readOnly />
//             <FormInput type="text" name="amount" placeholder="Amount (INR)" value={`₹${parseInt(amount).toLocaleString()}`} icon={Banknote} readOnly />

//             <button
//                type="submit"
//                disabled={isSubmitting}
//                className="w-full flex justify-center items-center gap-x-2 mt-2 rounded-md bg-blue-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-blue-700 transition-all disabled:opacity-60"
//             >
//                <CreditCard className="w-5 h-5" />
//                {isSubmitting ? "Processing..." : "Proceed to Pay"}
//             </button>
//          </form>
//       </div>
//    );
// }
