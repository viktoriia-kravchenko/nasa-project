import { getAllPlanets } from "../../models/planets.model.js";

const httpGetAllPlanets = async (req, res) => {
  const planets = await getAllPlanets();

  return res.status(200).json(planets);
};

export { httpGetAllPlanets };
