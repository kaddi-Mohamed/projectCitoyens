// Define error handling middleware function
exports.errorHandler = (error, req, res, next) => {
  // Set the response status code
  console.error(error);
  res.status(error.status || 500);
  // Return the error message as JSON
  res.json({ error: error.message });
};
