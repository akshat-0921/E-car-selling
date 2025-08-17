import mongoose, { Schema } from "mongoose";

const BookingSchema = Schema({
   userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
   vehicleId: { type: Schema.Types.ObjectId, ref: "Vehicle", required: true },
   showroomId: { type: Schema.Types.ObjectId, ref: "Showroom", required: true },
   bookingType:{type:String,enum:["Test Drive","Servicing","Vehicle Purchase"]},
   isVehicleInStock:{type:Boolean,required:True},
   //for out of stock bookings
   estimatedDeliveryDate:{type:Date},
   bookingStatus:{
      type:String,
      enum: ["Pending", "Confirmed", "Cancelled", "Delivery Scheduled", "Completed", "Payment Pending", "Failed"],
      default:"Pending"
   },
   payment:{
      totalAmount:{type:Number,required:true},
      advancePayment:{type:Number,required:true},
      pendingPayment:{type:Number,required:true},
      razorpayOrderId:{type:String,required:true},
      razorpayPaymentId:{type:String},
      paymentStatus:{
         type:String,
         enum:["Created","Attempted","Captured","Failed"],
         default:"Created"
      },
      paymentCapturedAt:{type:Date}
   },
}, { timestamps: true })

export const Booking = mongoose.model("Booking", BookingSchema)