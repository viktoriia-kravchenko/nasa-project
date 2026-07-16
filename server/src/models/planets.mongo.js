import mongoose from "mongoose";
const { Schema } = mongoose;

const planetsSchema = new Schema({
  keplerName: { type: String, required: true },
});

const Planet = mongoose.model("Planet", planetsSchema);

export default Planet;
