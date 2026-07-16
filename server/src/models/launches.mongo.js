import mongoose from "mongoose";
const { Schema } = mongoose;

const launchesSchema = new Schema({
  flightNumber: { type: Number, required: true },
  launchDate: { type: Date, required: true },
  mission: { type: String, required: true },
  rocket: { type: String, required: true },
  target: { type: String, required: true },
  customers: [String],
  upcoming: { type: Boolean, required: true },
  success: { type: Boolean, required: true, default: true },
});

const Launch = mongoose.model("Launch", launchesSchema);

export default Launch;
