class AppError extends Error {
  constructor(statusCode, message, errors = []) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.errors = errors;
    Error.captureStackTrace(this, this.constructor);
  }
}

const createError = (statusCode, message, errors) => {
  return new AppError(statusCode, message, errors);
};

module.exports = createError;
