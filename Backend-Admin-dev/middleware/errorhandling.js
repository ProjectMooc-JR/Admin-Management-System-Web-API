const errorhandling = (err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    return res.sendCommonValue({}, "Unauthorized", 401, 401);
  }
  res.sendCommonValue({}, err, 500, 500);
};

module.exports = {
  errorhandling,
};
