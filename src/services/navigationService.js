"use strict";

import Grid from "../models/grid.js";
import Rover from "../models/rover.js";
import { StatusCodes } from "http-status-codes";
import InvalidInputError from "../errors/invalidInputError.js";

let grid = new Grid();

const addGrid = async (xCoordinate, yCoordinate) => {
  return await grid.setGridBoundary(xCoordinate, yCoordinate);
};

const addRover = async (xCoordinate, yCoordinate, direction) => {
  validateGridInitialization();

  let rover = new Rover();
  const updatedRover = await rover.setInitialLocation(
    xCoordinate,
    yCoordinate,
    direction
  );
  return grid.addRover(updatedRover);
};

const navigateRover = async (roverId, commands) => {
  validateGridInitialization();

  if (!grid.isRoverExists(roverId)) {
    throw new InvalidInputError(
      `No existing rover with ID ${roverId}.`,
      StatusCodes.NOT_FOUND
    );
  }
  let rover = grid.getRover(roverId);
  return await rover.setNavigation(commands, grid.width, grid.height);
};

const getRoverPosition = async (roverId) => {
  if (!grid.isRoverExists(roverId)) {
    throw new InvalidInputError(
      `No existing rover with ID ${roverId}.`,
      StatusCodes.NOT_FOUND
    );
  }
  return grid.getRover(roverId);
};

function validateGridInitialization() {
  if (grid.height <= 0 && grid.width <= 0) {
    throw new InvalidInputError(
      "Grid is not initialized.",
      StatusCodes.BAD_REQUEST
    );
  }
}

export { addGrid, addRover, navigateRover, getRoverPosition };
