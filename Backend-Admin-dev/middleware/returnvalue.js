const returnvalue = (req, res, next) => {
  res.sendCommonValue = function (data, message, status = 0, httpStatus = 200) {
    if (typeof httpStatus !== "undefined") {
      res.status(httpStatus).json({
        status,
        data,
        message: message instanceof Error ? message.message : message,
      });
    } else {
      res.json({
        status,
        data,
        message: message instanceof Error ? message.message : message,
      });
    }
  };

  next();
};

module.exports = {
  returnvalue,
};
