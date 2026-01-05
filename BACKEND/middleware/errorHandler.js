const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  // In non-production, log full error for debugging
  if (process.env.NODE_ENV !== 'production') {
    console.error(err);
    return res.status(statusCode).json({
      success: false,
      message: err.message || 'Server error',
      stack: err.stack
    });
  }

  // In production, do not leak internal details
  const message = statusCode === 500 ? 'Server error' : (err.message || 'Error');
  res.status(statusCode).json({ success: false, message });
};

export default errorHandler;
