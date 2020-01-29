class ErrorResponse extends Error {
  constructor(message, statusCode,url='/dashboard') {
    super(message);
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = ErrorResponse;
