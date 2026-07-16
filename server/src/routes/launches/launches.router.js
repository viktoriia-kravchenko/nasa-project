import express from "express";
import {
  httpGetAllLaunches,
  httpAddNewLaunch,
  httpDeleteLaunch,
} from "./launches.controller.js";

const launchesRouter = express.Router();

launchesRouter.get("/", httpGetAllLaunches);
launchesRouter.post("/", httpAddNewLaunch);
launchesRouter.delete("/:id", httpDeleteLaunch);

export default launchesRouter;
