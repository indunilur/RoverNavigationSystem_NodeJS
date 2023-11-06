"use strict";

import { isValidInteger, isValidDirection } from "../utils/navigationUtils.js";
import directionMapping from "../models/directionMapping.js";
import InvalidInputError from "../errors/invalidInputError.js";
import { StatusCodes } from "http-status-codes";
import logger from "../utils/logger.js";

class Rover {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.direction = "N";
  }

  async setInitialLocation(x, y, direction) {
    logger.debug(
      `Set initial location with x=${x} , y=${y} and direction=${direction}.`
    );

    if (!isValidInteger(x) || !isValidInteger(y)) {
      throw new InvalidInputError(
        "X and Y coordinates must be integers.",
        StatusCodes.BAD_REQUEST
      );
    }

    if (x < 0 || y < 0) {
      throw new InvalidInputError(
        "X and Y coordinate must be bigger or equal to 0.",
        StatusCodes.BAD_REQUEST
      );
    }

    if (!isValidDirection(direction)) {
      throw new InvalidInputError(
        "A valid direction (N,S,E,W) must be provided.",
        StatusCodes.BAD_REQUEST
      );
    }

    this.x = parseInt(x);
    this.y = parseInt(y);
    this.direction = direction;

    return this;
  }

  async setNavigation(command, gridWidth, gridHeight) {
    logger.debug(
      `Set navigation with command=${command} , grid-width=${gridWidth} and grid-height=${gridHeight}.`
    );

    var commandsArray = this.validateAndSplitCommands(command);

    if (!commandsArray || !commandsArray.length) {
      throw new InvalidInputError(
        "Valid navigation commands must be provided.",
        StatusCodes.BAD_REQUEST
      );
    }

    commandsArray.forEach((command) => {
      this.handleCommand(command, gridWidth, gridHeight);
    });

    return this;
  }

  handleCommand(command, gridWidth, gridHeight) {
    switch (command) {
      case "L":
        this.turnLeft();
        break;
      case "R":
        this.turnRight();
        break;
      case "M":
        this.move(gridWidth, gridHeight);
        break;
    }
  }

  setRoverId(roverID) {
    this.roverID = roverID;
  }

  getDirection() {
    return this.direction;
  }

  turnLeft() {
    this.setDirection(this.getDirectionWhenTurnLeft());
  }

  turnRight() {
    this.setDirection(this.getDirectionWhenTurnRight());
  }

  move(gridWidth, gridHeight) {
    let currentDirection = this.getDirection();

    switch (currentDirection) {
      case "N":
        this.moveY(1, gridHeight);
        break;
      case "S":
        this.moveY(-1, gridHeight);
        break;
      case "E":
        this.moveX(1, gridWidth);
        break;
      case "W":
        this.moveX(-1, gridWidth);
        break;
    }
  }

  moveX(noOfgridPoints, gridWidth) {
    this.x += parseInt(noOfgridPoints) || 0;

    if (this.x < 0) {
      this.x = 0;
    }

    if (this.x > gridWidth) {
      this.x = gridWidth;
    }
  }

  moveY(noOfgridPoints, gridHeight) {
    this.y += parseInt(noOfgridPoints) || 0;

    if (this.y < 0) this.y = 0;

    if (this.y > gridHeight) {
      this.y = gridHeight;
    }
  }

  setDirection(direction) {
    this.direction = direction;
  }

  getDirectionWhenTurnLeft() {
    return directionMapping[this.getDirection()].left;
  }

  getDirectionWhenTurnRight() {
    return directionMapping[this.getDirection()].right;
  }

  validateAndSplitCommands(commands) {
    return (
      (
        String(commands || "")
          .toLocaleUpperCase()
          .match(/[a-zA-Z]+/gi) || []
      )
        .join("")
        .match(/L|R|M/gi) || []
    );
  }
}

export default Rover;
