// payment.controllers.js
import razorpay from "../../config/razorpay.js";
import crypto from "crypto";
import { Booking } from "../../models/booking.models.js";


// Create Razorpay Order
const createPaymentIntent = async (req, res) => {
   try {
      let { amount } = req.body;

      if (!amount) {
         return res.status(400).json({ success: false, msg: "Amount is required" });
      }

      const options = {
         amount: amount * 100, // Razorpay uses paise
         currency: "INR",
         receipt: `receipt_order_${Date.now()}`,
      };

      const order = await razorpay.orders.create(options);

      return res.status(200).json({ success: true, order });
   } catch (error) {
      console.error("Error creating Razorpay order:", error);
      return res
         .status(500)
         .json({ success: false, msg: "Razorpay order creation failed" });
   }
};


// Verify Razorpay Signature + Create Booking with 5% (max 25k) advance
const verifyRazorpaySignature = async (req, res) => {
   try {
      const {
         razorpay_order_id,
         razorpay_payment_id,
         razorpay_signature,
         vehicleId,
         showroomId,
         userId,
         amount,          // full vehicle price in INR (rupees)
      } = req.body;

      if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
         return res.status(400).json({ success: false, msg: "Missing payment verification data" });
      }
      if (!userId || !vehicleId || !showroomId || amount == null) {
         return res.status(400).json({ success: false, msg: "Missing booking fields (userId, vehicleId, showroomId, amount)" });
      }

      const body = `${razorpay_order_id}|${razorpay_payment_id}`;
      const expectedSignature = crypto
         .createHmac("sha256", process.env.RAZORPAY_SECRET)
         .update(body)
         .digest("hex");

      if (expectedSignature !== razorpay_signature) {
         return res.status(400).json({ success: false, msg: "Invalid signature" });
      }

      // ✅ Compute advance = min(5% of total, 25000)
      const totalAmount = Number(amount);
      if (!Number.isFinite(totalAmount) || totalAmount <= 0) {
         return res.status(400).json({ success: false, msg: "Invalid amount" });
      }

      const advancePayment = Math.min(Math.round(totalAmount * 0.05), 25000);
      const pendingPayment = Math.max(totalAmount - advancePayment, 0);

      // (Optional) If you want the booking status to reflect pending dues:
      // const bookingStatus = pendingPayment > 0 ? "Payment Pending" : "Confirmed";

      const booking = await Booking.create({
         userId,
         vehicleId,
         showroomId,
         bookingType: "Vehicle Purchase",
         isVehicleInStock: true,
         bookingStatus: "Confirmed", // or use the conditional status above
         payment: {
            totalAmount,
            advancePayment,
            pendingPayment,
            razorpayOrderId: razorpay_order_id,
            razorpayPaymentId: razorpay_payment_id,
            paymentStatus: "Captured",      // the ADVANCE has been captured
            paymentCapturedAt: new Date(),
         },
      });

      return res.status(200).json({
         success: true,
         msg: "Payment verified & booking created",
         booking,
      });
   } catch (error) {
      console.error("Signature verification failed:", error.message);
      return res.status(500).json({ success: false, msg: "Internal server error" });
   }
};



export { createPaymentIntent, verifyRazorpaySignature };




// // payment.controllers.js
// import razorpay from "../../config/razorpay.js";
// import crypto from "crypto";

// // Create Razorpay Order
// const createPaymentIntent = async (req, res) => {
//    try {
//       let { amount } = req.body;
//       // console.log(amount)
//       if (!amount) {
//          return res.status(400).json({ success: false, msg: "Amount is required" });
//       }

//       // amount = Number(amount)

//       // console.log(typeof (amount))
//       // console.log(amount)


//       const options = {
//          amount: amount * 100, // Razorpay uses paise
//          currency: "INR",
//          receipt: `receipt_order_${Date.now()}`,
//       };

//       const order = await razorpay.orders.create(options);
//       return res.status(200).json({
//          success: true,
//          order,
//       });
//    } catch (error) {
//       console.error("Error creating Razorpay order:", error);
//       return res.status(500).json({ success: false, msg: "Razorpay order creation failed" });
//    }
// };

// // Verify Razorpay Signature After Payment
// // const verifyRazorpaySignature = async (req, res) => {
// //    try {
// //       const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

// //       if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
// //          return res.status(400).json({ success: false, msg: "Missing payment verification data" });
// //       }

// //       const body = `${razorpay_order_id}|${razorpay_payment_id}`;
// //       const expectedSignature = crypto
// //          .createHmac("sha256", process.env.RAZORPAY_SECRET)
// //          .update(body)
// //          .digest("hex");

// //       if (expectedSignature === razorpay_signature) {
// //          return res.status(200).json({ success: true, msg: "Payment verified successfully" });
// //       } else {
// //          return res.status(400).json({ success: false, msg: "Invalid signature" });
// //       }
// //    } catch (error) {
// //       console.error("Signature verification failed:", error.message);
// //       return res.status(500).json({ success: false, msg: "Internal server error" });
// //    }
// // };

// const verifyRazorpaySignature = async (req, res) => {
//    try {
//       const { razorpay_order_id, razorpay_payment_id, razorpay_signature, vehicleId, showroomId, userId, amount } = req.body;

//       if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
//          return res.status(400).json({ success: false, msg: "Missing payment verification data" });
//       }

//       const body = `${razorpay_order_id}|${razorpay_payment_id}`;
//       const expectedSignature = crypto
//          .createHmac("sha256", process.env.RAZORPAY_SECRET)
//          .update(body)
//          .digest("hex");

//       if (expectedSignature !== razorpay_signature) {
//          return res.status(400).json({ success: false, msg: "Invalid signature" });
//       }

//       // ✅ Create Booking after successful payment
//       const booking = await Booking.create({
//          userId,
//          vehicleId,
//          showroomId,
//          bookingType: "Vehicle Purchase", // or from frontend
//          isVehicleInStock: true,          // you can compute via checkVehicleAvailability
//          bookingStatus: "Confirmed",
//          payment: {
//             totalAmount: amount,
//             advancePayment: amount, // or split logic
//             pendingPayment: 0,
//             razorpayOrderId: razorpay_order_id,
//             razorpayPaymentId: razorpay_payment_id,
//             paymentStatus: "Captured",
//             paymentCapturedAt: new Date(),
//          },
//       });

//       return res.status(200).json({
//          success: true,
//          msg: "Payment verified & booking created",
//          booking,
//       });
//    } catch (error) {
//       console.error("Signature verification failed:", error.message);
//       return res.status(500).json({ success: false, msg: "Internal server error" });
//    }
// };

// export { createPaymentIntent, verifyRazorpaySignature };
