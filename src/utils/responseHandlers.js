exports.successResponse = (message, data) => ({
  success: true,
  message,
  data,
});

exports.errorResponse = (message) => ({
  success: false,
  message,
});
