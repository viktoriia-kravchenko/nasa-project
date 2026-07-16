import {
  getAllLaunches,
  doesLaunchExist,
  deleteLaunchById,
  scheduleNewLaunch,
} from "../../models/launches.model.js";

const httpGetAllLaunches = async (req, res) => {
  const launches = await getAllLaunches();

  return res.status(200).json(launches);
};

const httpAddNewLaunch = async (req, res) => {
  const launch = req.body;

  if (!launch.launchDate || !launch.mission || !launch.rocket || !launch.target)
    res.status(400).json({ error: "Missing required launch field" });

  launch.launchDate = new Date(launch.launchDate);

  if (launch.launchDate.toString() === "Invalid Date")
    res.status(400).json({ error: "Date is invalid" });

  await scheduleNewLaunch(launch);

  return res.status(201).json(launch);
};

const httpDeleteLaunch = async (req, res) => {
  const launchId = +req.params.id;
  const isLaunchPresent = await doesLaunchExist(launchId);

  if (!isLaunchPresent) {
    res.status(404).json({ error: "Launch doesn't exist" });
  }

  const isLaunchDeleted = await deleteLaunchById(launchId);

  if (!isLaunchDeleted) {
    return res.status(400).json({ error: "Launch wasn't deleted" });
  }

  return res.status(200).json({ ok: true });
};

export { httpGetAllLaunches, httpAddNewLaunch, httpDeleteLaunch };
