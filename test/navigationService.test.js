"use strict";

import InvalidInputError from "../src/errors/invalidInputError.js";
import {
  addGrid,
  addRover,
  navigateRover,
  getRoverPosition,
} from "../src/services/navigationService.js";

test("Validate adding rover without grid initialization", async () => {
  try {
    await addRover(1, 7, "N");
  } catch (error) {
    expect(error).toBeInstanceOf(InvalidInputError);
    expect(error).toHaveProperty("message", "Grid is not initialized.");
  }
});

test("Validate navigating rover without grid initialization", async () => {
  try {
    await navigateRover(1, "LRMLR");
  } catch (error) {
    expect(error).toBeInstanceOf(InvalidInputError);
    expect(error).toHaveProperty("message", "Grid is not initialized.");
  }
});

test("Validate navigating non-existing rover", async () => {
  addGrid(5, 7);

  try {
    await navigateRover(100, "LRMLR");
  } catch (error) {
    expect(error).toBeInstanceOf(InvalidInputError);
    expect(error).toHaveProperty("message", "No existing rover with ID 100.");
  }
});

test("Validate retrieving non-existing rover", async () => {
  addGrid(5, 7);

  try {
    await getRoverPosition(10, "LRMLR");
  } catch (error) {
    expect(error).toBeInstanceOf(InvalidInputError);
    expect(error).toHaveProperty("message", "No existing rover with ID 10.");
  }
});
