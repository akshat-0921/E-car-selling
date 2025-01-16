import mongoose, { Schema } from "mongoose";

const AgentSchema = Schema({
   userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
   agentId: { type: Schema.Types.ObjectId, ref: "Admin", required: true },
   escalation_reason: { type: String, required: true },
   resolution: { type: String, required: true },
   resolvedAt: { type: String, default: Date.now }
}, { timestamps: true })

export const Agent = mongoose.model("Agent", AgentSchema)