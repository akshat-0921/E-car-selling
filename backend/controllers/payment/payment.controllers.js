// payment.controllers.js
import razorpay from "../../config/razorpay.js";
import crypto from "crypto";

// Create Razorpay Order
const createPaymentIntent = async (req, res) => {
   try {
      const { amount } = req.body;
      if (!amount) {
         return res.status(400).json({ success: false, msg: "Amount is required" });
      }

      const options = {
         amount: amount * 100, // Razorpay uses paise
         currency: "INR",
         receipt: `receipt_order_${Date.now()}`,
      };

      const order = await razorpay.orders.create(options);
      return res.status(200).json({
         success: true,
         order,
      });
   } catch (error) {
      console.error("Error creating Razorpay order:", error.message);
      return res.status(500).json({ success: false, msg: "Razorpay order creation failed" });
   }
};

// Verify Razorpay Signature After Payment
const verifyRazorpaySignature = async (req, res) => {
   try {
      const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

      if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
         return res.status(400).json({ success: false, msg: "Missing payment verification data" });
      }

      const body = `${razorpay_order_id}|${razorpay_payment_id}`;
      const expectedSignature = crypto
         .createHmac("sha256", process.env.RAZORPAY_SECRET)
         .update(body)
         .digest("hex");

      if (expectedSignature === razorpay_signature) {
         return res.status(200).json({ success: true, msg: "Payment verified successfully" });
      } else {
         return res.status(400).json({ success: false, msg: "Invalid signature" });
      }
   } catch (error) {
      console.error("Signature verification failed:", error.message);
      return res.status(500).json({ success: false, msg: "Internal server error" });
   }
};

export { createPaymentIntent, verifyRazorpaySignature };
