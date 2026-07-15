import {
  addLaunch,
  getAllLaunches,
  doesLaunchExist,
  deleteLaunch,
} from "../../models/launches.model.js";

const httpGetAllLaunches = (req, res) => res.json(getAllLaunches());

const httpAddLaunch = (req, res) => {
  const launch = req.body;

  if (!launch.launchDate || !launch.mission || !launch.rocket || !launch.target)
    res.status(400).json({ error: "Missing required fields" });

  launch.launchDate = new Date(launch.launchDate);

  if (launch.launchDate.toString() === "Invalid Date")
    res.status(400).json({ error: "Date is invalid" });

  addLaunch(launch);

  return res.status(201).json(launch);
};

const httpDeleteLaunch = (req, res) => {
  const launchId = +req.params.id;

  if (!doesLaunchExist(launchId)) {
    res.status(404).json({ error: "Launch doesn't exist" });
  }

  const deletedLaunch = deleteLaunch(launchId);

  return res.status(200).json(deletedLaunch);
};

export { httpGetAllLaunches, httpAddLaunch, httpDeleteLaunch };
