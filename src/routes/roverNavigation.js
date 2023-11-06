"use strict";

import { Router } from "express";
const routes = Router();
import {
  addRoverNavigationGrid,
  addRoverToGrid,
  navigateRoverInGrid,
  getRoverPositionInGrid,
} from "../controllers/roverNavigation.js";

routes.post("/grid", addRoverNavigationGrid);
routes.post("/rover", addRoverToGrid);
routes.put("/rover", navigateRoverInGrid);

routes.get("/rover/:roverId", getRoverPositionInGrid);

export default routes;
