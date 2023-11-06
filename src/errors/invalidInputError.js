"use strict";

class InvalidInputError extends Error {
  constructor(message, code) {
    super(message);
    this.code = code;
  }
}

export default InvalidInputError;
