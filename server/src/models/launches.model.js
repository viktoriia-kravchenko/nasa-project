import Launch from "./launches.mongo.js";
import Planet from "./planets.mongo.js";

const DEFAULT_FLIGHT_NUMBER = 100;

const getLatestFlightNumber = async () => {
  const latestLaunch = await Launch.findOne().sort({ flightNumber: -1 });

  if (!latestLaunch) {
    return DEFAULT_FLIGHT_NUMBER;
  }

  return latestLaunch.flightNumber;
};

const getAllLaunches = async () =>
  await Launch.find({}).select("-_id -__v").sort({ flightNumber: 1 });

const addLaunchToDB = async (launch) => {
  await Launch.findOneAndUpdate({ flightNumber: launch.flightNumber }, launch, {
    upsert: true,
  });
};

const scheduleNewLaunch = async (launch) => {
  const launchTarget = await Planet.findOne({ keplerName: launch.target });

  if (!launchTarget) {
    throw new Error("No matching target planet found");
  }

  const updatedFlightNumber = (await getLatestFlightNumber()) + 1;

  const populatedLaunch = Object.assign(launch, {
    flightNumber: updatedFlightNumber,
    customers: ["NASA", "Starlink", "Virgin Galactic"],
    upcoming: true,
    success: true,
  });

  await addLaunchToDB(populatedLaunch);
};

const doesLaunchExist = async (launchId) =>
  await Launch.findOne({ flightNumber: launchId });

const deleteLaunchById = async (launchId) => {
  const deletedLaunch = await Launch.updateOne(
    { flightNumber: launchId },
    { upcoming: false, success: false },
  );

  return deletedLaunch.modifiedCount === 1;
};

export { getAllLaunches, scheduleNewLaunch, doesLaunchExist, deleteLaunchById };
