import "dotenv/config";
import http from "node:http";
import app from "./app.js";
import { loadPlanets } from "./models/planets.model.js";
import { connectToDB } from "./services/mongo.js";

const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

const startServer = async () => {
  await connectToDB();
  await loadPlanets();

  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

startServer();
