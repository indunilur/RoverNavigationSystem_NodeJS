"use strict";

const isValidInteger = (value) => {
  return !isNaN(value);
};

const round = (value) => {
  if (isValidInteger(value)) {
    return Math.round(value);
  }
  return 0;
};

const isValidDirection = (value) => {
  let direction = String(value).toLocaleUpperCase() || "",
    regex = new RegExp(direction, "gi");
  return "NSEW".match(regex);
};

export { isValidInteger, isValidDirection, round };
