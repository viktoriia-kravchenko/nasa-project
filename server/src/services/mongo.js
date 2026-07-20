import "dotenv/config";
import mongoose from "mongoose";
const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connection.on("open", () => console.log("MongoDB connected"));

mongoose.connection.on("error", (err) => {
  console.error(err);
});

const connectToDB = async () => {
  await mongoose.connect(MONGODB_URI);
};

const disconnectFromDB = async () => {
  await mongoose.disconnect();
};

export { connectToDB, disconnectFromDB };
