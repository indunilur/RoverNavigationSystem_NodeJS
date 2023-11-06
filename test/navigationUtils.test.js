"use strict";

import {
  isValidInteger,
  round,
  isValidDirection,
} from "../src/utils/navigationUtils";

test("Check for valid integer", () => {
  expect(isValidInteger("1")).toBe(true);
  expect(isValidInteger("1A45")).toBe(false);
});

test("Round a value", () => {
  expect(round("1.66")).toBe(2);
  expect(round("1.46")).toBe(1);
});

test("Check for valid direction", () => {
  expect(isValidDirection("S")).toStrictEqual(["S"]);
  expect(isValidDirection("A")).toStrictEqual(null);
});
