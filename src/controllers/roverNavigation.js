"use strict";

import {
  addGrid,
  addRover,
  navigateRover,
  getRoverPosition,
} from "../services/navigationService.js";
import logger from "../utils/logger.js";

const addRoverNavigationGrid = async (req, res) => {
  logger.debug("Adding rover navigation grid.");

  try {
    await addGrid(req.body.xCoordinate, req.body.yCoordinate);
    res.status(201).json({ message: "Successfully Created" });
  } catch (error) {
    res.status(error.code).json({ message: error.message });
  }
};

const addRoverToGrid = async (req, res) => {
  logger.debug("Adding rover to the grid.");

  try {
    let rover = await addRover(
      req.body.xCoordinate,
      req.body.yCoordinate,
      req.body.direction
    );
    res.status(201).json({
      roverID: rover.roverID,
      xCoordinate: rover.x,
      yCoordinate: rover.y,
      direction: rover.direction,
    });
  } catch (error) {
    res.status(error.code).json({ message: error.message });
  }
};

const navigateRoverInGrid = async (req, res) => {
  logger.debug("Navigating rover in the grid.");

  try {
    let rover = await navigateRover(req.body.roverId, req.body.command);
    res.status(200).json({
      roverID: rover.roverID,
      xCoordinate: rover.x,
      yCoordinate: rover.y,
      direction: rover.direction,
    });
  } catch (error) {
    res.status(error.code).json({ message: error.message });
  }
};

const getRoverPositionInGrid = async (req, res) => {
  logger.debug("Retrieving rover position in the grid.");

  try {
    let rover = await getRoverPosition(req.params.roverId);
    res.status(200).json({
      roverID: rover.roverID,
      xCoordinate: rover.x,
      yCoordinate: rover.y,
      direction: rover.direction,
    });
  } catch (error) {
    res.status(error.code).json({ message: error.message });
  }
};

export {
  addRoverNavigationGrid,
  addRoverToGrid,
  navigateRoverInGrid,
  getRoverPositionInGrid,
};
