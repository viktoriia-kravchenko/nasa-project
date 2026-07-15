import express from "express";
import {
  httpGetAllLaunches,
  httpAddLaunch,
  httpDeleteLaunch,
} from "./launches.controller.js";

const launchesRouter = express.Router();

launchesRouter.get("/", httpGetAllLaunches);
launchesRouter.post("/", httpAddLaunch);
launchesRouter.delete("/:id", httpDeleteLaunch);

export default launchesRouter;
