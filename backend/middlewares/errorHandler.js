const errorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode === 200
    ? 500
    : res.statusCode;

  let message = err.message;

  res.status(statusCode).json({
    success: false,
    status: statusCode,
    message,
    stack:
      process.env.NODE_ENV === "development"
        ? err.stack
        : undefined,
  });
};

export default errorHandler;