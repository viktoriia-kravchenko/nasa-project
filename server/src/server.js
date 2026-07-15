import http from "node:http";
import app from "./app.js";
import { loadPlanets } from "./models/planets.model.js";

const PORT = process.env.PORT || 8000;

await loadPlanets();

http.createServer(
  app.listen(PORT, () => console.log(`Server is running on port ${PORT}`)),
);
