const errorHandler = require("./errorHandler");

const asyncWrapper = (controller) => {
  return async (req, res, next) => {
    try {
      await controller(req, res, next);
    } catch (err) {
      errorHandler(req, res, err);
    }
  };
};

module.exports = asyncWrapper;
