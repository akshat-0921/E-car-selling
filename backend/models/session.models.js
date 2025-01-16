import mongoose, { Schema } from "mongoose";

const SessionSchema = Schema({
   user: { type: Schema.Types.ObjectId, ref: "User", required: true },
   query: { type: String, required: true },
   response: { type: String },
   status: { type: String, enum: ["Pending", "Resolved", "Escalated"], default: "Pending" },
   escalated: { type: Boolean, default: false }
})

SessionSchema.methods.isEscalated = function () {
   this.escalated = this.status === "Escalated"
   return this.escalated
}

SessionSchema.pre("save", function (next) {
   this.escalated = this.status === "Escalated";
   next();
});

export const Session = mongoose.model("Session", SessionSchema)