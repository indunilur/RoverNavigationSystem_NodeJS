"use strict";

const directionMapping = {
  N: {
    left: "W",
    right: "E",
  },
  W: {
    left: "S",
    right: "N",
  },
  S: {
    left: "E",
    right: "W",
  },
  E: {
    left: "N",
    right: "S",
  },
};

export default directionMapping;
