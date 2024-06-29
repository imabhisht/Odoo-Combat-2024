// Location Route

import { Router } from "express";
import { saveCrimeSceneLocation } from "../controllers/location.controller";
import { authenticateToken } from "../middlewares";

const locationRouter = Router();

locationRouter.post("/", authenticateToken, saveCrimeSceneLocation);

export default locationRouter;
