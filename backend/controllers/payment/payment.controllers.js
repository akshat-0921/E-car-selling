import stripe from "../../config/payment.js";
import { errorHandler } from "../../utils/errorHandler.utils.js";

const createPaymentIntent = async (req, res) => {
   try {
      const { amount, currency = "inr" } = req.body;
      if (!amount) {
         return errorHandler(res, 400, "Amount is required");
      }

      const paymentIntent = await stripe.paymentIntents.create({
         amount: amount * 100,
         currency,
         payment_method_types: ["card"],
      });

      return res.status(200).json({
         success: true,
         clientSecret: paymentIntent.client_secret,
         paymentIntentId: paymentIntent.id,
      });
   } catch (error) {
      console.error("Error creating payment intent:", error.message);
      return errorHandler(res, 500, "Error occurred while creating the payment intent.");
   }
};

export { createPaymentIntent }