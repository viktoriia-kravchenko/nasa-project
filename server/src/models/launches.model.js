let startFlightNumber = 100;

const launches = new Map();

const getAllLaunches = () => Array.from(launches.values());

const addLaunch = (launch) => {
  startFlightNumber++;

  launches.set(
    startFlightNumber,
    Object.assign(launch, {
      flightNumber: startFlightNumber,
      customers: ["Customer 1", "Customer 2"],
      upcoming: true,
      success: true,
    }),
  );
};

const doesLaunchExist = (launchId) => launches.has(launchId);

const deleteLaunch = (launchId) => {
  const deletedLaunch = launches.get(launchId);
  deletedLaunch.upcoming = false;
  deletedLaunch.success = false;

  return deletedLaunch;
};

export { getAllLaunches, addLaunch, doesLaunchExist, deleteLaunch };
