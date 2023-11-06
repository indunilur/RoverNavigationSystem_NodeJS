"use strict";

import { StatusCodes } from "http-status-codes";
import InvalidInputError from "../errors/invalidInputError.js";
import { isValidInteger, round } from "../utils/navigationUtils.js";
import logger from "../utils/logger.js";

class Grid {
  constructor() {
    (this.width = 0), (this.height = 0), (this.roverMap = new Map());
  }

  async setGridBoundary(x, y) {
    logger.debug(`Set grid boundary with x=${x} and y=${y}.`);

    if (!isValidInteger(x)) {
      throw new InvalidInputError(
        "Invalid X coordinate in the grid.",
        StatusCodes.BAD_REQUEST
      );
    }

    if (!isValidInteger(y)) {
      throw new InvalidInputError(
        "Invalid Y coordinate in the grid.",
        StatusCodes.BAD_REQUEST
      );
    }

    this.width = round(x);
    this.height = round(y);
    return this;
  }

  async addRover(rover) {
    if (logger.isDebugEnabled()) {
      logger.debug(
        `Add rover with x=${rover.x} , y=${rover.y} and direction=${rover.direction}.`
      );
    }

    if (rover.x > this.width) {
      throw new InvalidInputError(
        "The rover X position must be inside the grid borders.",
        StatusCodes.BAD_REQUEST
      );
    }

    if (rover.y > this.height)
      throw new InvalidInputError(
        "The rover Y position must be inside the grid borders.",
        StatusCodes.BAD_REQUEST
      );

    let uuid = Math.floor(Math.random() * 16);
    rover.roverID = uuid;
    this.roverMap.set(uuid, rover);

    return rover;
  }

  getRover(roverId) {
    logger.debug(`Get rover with id=${roverId}.`);

    return this.roverMap.get(parseInt(roverId));
  }

  getRoverMapSize() {
    return this.roverMap.size;
  }

  isRoverExists(roverId) {
    logger.debug(`Check a rover exists with id=${roverId}.`);

    return this.roverMap.has(parseInt(roverId));
  }
}

export default Grid;
