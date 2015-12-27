'use strict';

class CustomError extends Error {
  constructor(msg, extra) {
    super(msg);
    this.message = msg;
    this.name = 'MyError';
    this.extra = extra;
  }
}
module.exports = CustomError;