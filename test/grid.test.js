"use strict";

import InvalidInputError from "../src/errors/invalidInputError.js";
import Grid from "../src/models/grid.js";
import Rover from "../src/models/rover.js";

describe("Set Grid Boundary", function () {
  test("Set boundaries of the grid", () => {
    let grid = new Grid();
    grid.setGridBoundary(5, 7);

    expect(grid.width).toBe(5);
    expect(grid.height).toBe(7);
  });

  test("Validate invalid X cordinate", async () => {
    let grid = new Grid();
    try {
      await grid.setGridBoundary("abcd", 7);
    } catch (error) {
      expect(error).toBeInstanceOf(InvalidInputError);
      expect(error).toHaveProperty(
        "message",
        "Invalid X coordinate in the grid."
      );
    }
  });

  test("Validate invalid Y cordinate", async () => {
    let grid = new Grid();
    try {
      await grid.setGridBoundary(7, "abcd");
    } catch (error) {
      expect(error).toBeInstanceOf(InvalidInputError);
      expect(error).toHaveProperty(
        "message",
        "Invalid Y coordinate in the grid."
      );
    }
  });
});

describe("Add Rover to Grid", function () {
  test("Add rover", () => {
    let grid = new Grid();
    let rover = new Rover();
    grid.setGridBoundary(5, 5);
    rover.setInitialLocation(1, 2, "N");
    grid.addRover(rover);

    expect(grid.roverMap.size).toBe(1);
  });

  test("Add rover with outside X cordinate", async () => {
    let grid = new Grid();
    let rover = new Rover();
    grid.setGridBoundary(5, 5);
    rover.setInitialLocation(6, 5, "N");
    try {
      await grid.addRover(rover);
    } catch (error) {
      expect(grid.roverMap.size).toBe(0);
      expect(error).toBeInstanceOf(InvalidInputError);
      expect(error).toHaveProperty(
        "message",
        "The rover X position must be inside the grid borders."
      );
    }
  });

  test("Add rover with outside Y cordinate", async () => {
    let grid = new Grid();
    let rover = new Rover();
    grid.setGridBoundary(5, 5);
    rover.setInitialLocation(5, 7, "N");
    try {
      await grid.addRover(rover);
    } catch (error) {
      expect(grid.roverMap.size).toBe(0);
      expect(error).toBeInstanceOf(InvalidInputError);
      expect(error).toHaveProperty(
        "message",
        "The rover Y position must be inside the grid borders."
      );
    }
  });
});

describe("Check existence of rover and get Rover", function () {
  test("Get rover by ID", async () => {
    let grid = new Grid();
    let rover = new Rover();
    grid.setGridBoundary(5, 5);
    rover.setInitialLocation(3, 3, "N");
    let addedRover = await grid.addRover(rover);

    expect(grid.getRover(addedRover.roverID)).toBe(addedRover);
  });

  test("Check existence of rover by ID", async () => {
    let grid = new Grid();
    let rover = new Rover();
    grid.setGridBoundary(5, 5);
    rover.setInitialLocation(3, 3, "N");
    await grid.addRover(rover);

    expect(grid.getRoverMapSize()).toBe(1);
  });
});
