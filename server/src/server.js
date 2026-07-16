import "dotenv/config";
import http from "node:http";
import mongoose from "mongoose";
import app from "./app.js";
import { loadPlanets } from "./models/planets.model.js";

const PORT = process.env.PORT || 8000;
const MONGODB_URI = process.env.MONGODB_URI;

const server = http.createServer(app);

mongoose.connection.on("open", () => console.log("MongoDB connected"));

mongoose.connection.on("error", (err) => {
  console.error(err);
});

const startServer = async () => {
  await mongoose.connect(MONGODB_URI);

  await loadPlanets();

  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

startServer();
