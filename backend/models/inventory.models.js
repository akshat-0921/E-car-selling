import mongoose,{Schema} from "mongoose"

const InventorySchema=new Schema(
   {
      showroomId:{type:Schema.Types.ObjectId,ref:"Showroom",required:true},
      vehicleId:{type:Schema.Types.ObjectId,ref:"Vehicle",required:true},
      quantity:{type:Number,default:0,min:0},
      price:{type:Number,required:true},
      isAvailable:{type:Boolean,default:true}
   },
   {timestamps:true}
)

export const Inventory=mongoose.model("Inventory",InventorySchema)