import { createReadStream } from "node:fs";
import path from "node:path";
import { pipeline } from "node:stream/promises";
import { parse } from "csv-parse";
import Planet from "./planets.mongo.js";

const parser = parse({
  columns: true,
  comment: "#",
});

const isHabitableExoplanet = (exoplanet) =>
  exoplanet.koi_disposition === "CONFIRMED" &&
  exoplanet.koi_insol > 0.36 &&
  exoplanet.koi_insol < 1.1 &&
  exoplanet.koi_prad < 1.6;

const loadPlanets = async () => {
  try {
    await pipeline(
      createReadStream(
        path.join(import.meta.dirname, "..", "..", "data", "kepler_data.csv"),
      ),
      parser,
      async (data) => {
        for await (const chunk of data) {
          if (isHabitableExoplanet(chunk)) await savePlanetToDB(chunk);
        }
      },
    );
  } catch (err) {
    console.error(err);
  } finally {
    const allPlanets = await getAllPlanets();

    console.log(`We found ${allPlanets.length} habitable exoplanets`);
  }
};

const getAllPlanets = async () => await Planet.find({}).select("-_id -__v");

const savePlanetToDB = async (planet) => {
  try {
    return await Planet.updateOne(
      { keplerName: planet.kepler_name },
      { keplerName: planet.kepler_name },
      { upsert: true },
    );
  } catch (err) {
    console.error(`There's an error while saving a planet: ${err}`);
  }
};

export { loadPlanets, getAllPlanets };
