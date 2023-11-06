"use strict";

import Rover from "../src/models/rover";
import Grid from "../src/models/grid";
import InvalidInputError from "../src/errors/invalidInputError";

describe("Set Initial Location", function () {
  test("Set initial location", () => {
    let rover = new Rover();
    rover.setInitialLocation(5, 3, "N");

    expect(rover.x).toBe(5);
    expect(rover.y).toBe(3);
    expect(rover.direction).toBe("N");
  });

  test("Validate non-integer X cordinate", async () => {
    let rover = new Rover();
    try {
      await rover.setInitialLocation("abcd", 3, "N");
    } catch (error) {
      expect(error).toBeInstanceOf(InvalidInputError);
      expect(error).toHaveProperty(
        "message",
        "X and Y coordinates must be integers."
      );
    }
  });

  test("Validate non-integer Y cordinate", async () => {
    let rover = new Rover();
    try {
      await rover.setInitialLocation(3, "abcd", "N");
    } catch (error) {
      expect(error).toBeInstanceOf(InvalidInputError);
      expect(error).toHaveProperty(
        "message",
        "X and Y coordinates must be integers."
      );
    }
  });

  test("Validate negative X cordinate", async () => {
    let rover = new Rover();
    try {
      await rover.setInitialLocation("-10", 3, "N");
    } catch (error) {
      expect(error).toBeInstanceOf(InvalidInputError);
      expect(error).toHaveProperty(
        "message",
        "X and Y coordinate must be bigger or equal to 0."
      );
    }
  });

  test("Validate invalid direction", async () => {
    let rover = new Rover();
    try {
      await rover.setInitialLocation(3, 3, "NKLS");
    } catch (error) {
      expect(error).toBeInstanceOf(InvalidInputError);
      expect(error).toHaveProperty(
        "message",
        "A valid direction (N,S,E,W) must be provided."
      );
    }
  });
});

describe("Set Navigation", function () {
  test("Set navigation", () => {
    let rover = new Rover();
    rover.setInitialLocation(5, 3, "N");
    rover.setNavigation("LRMRLMMR", 5, 5);

    expect(rover.x).toBe(5);
    expect(rover.y).toBe(5);
    expect(rover.direction).toBe("E");
  });

  test("Validate non-integer X cordinate", async () => {
    let rover = new Rover();
    try {
      await rover.setNavigation("LRMRLU5F", 5, 5);
    } catch (error) {
      expect(error).toBeInstanceOf(InvalidInputError);
      expect(error).toHaveProperty(
        "message",
        "Valid navigation commands must be provided."
      );
    }
  });
});
