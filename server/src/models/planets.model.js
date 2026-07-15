import { createReadStream } from "node:fs";
import path from "node:path";
import { pipeline } from "node:stream/promises";
import { parse } from "csv-parse";

const habitableExoplanets = [];

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
          if (isHabitableExoplanet(chunk)) habitableExoplanets.push(chunk);
        }
      },
    );
  } catch (err) {
    console.error(err);
  } finally {
    console.log(`We found ${habitableExoplanets.length} habitable exoplanets`);
  }
};

const getAllPlanets = () => habitableExoplanets;

export { loadPlanets, getAllPlanets };
