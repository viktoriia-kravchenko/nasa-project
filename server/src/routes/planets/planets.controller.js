import { getAllPlanets } from "../../models/planets.model.js";

const httpGetAllPlanets = (req, res) => res.json(getAllPlanets());

export { httpGetAllPlanets };
