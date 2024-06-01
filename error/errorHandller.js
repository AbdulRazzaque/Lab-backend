const Joi = require("joi");
const CustomError = require("./CustomError");

const errorhandller = (error, req, res, next) => {
  let statusCode = 400;
  let data = {
    message: "Internal Server Error",
    originalError: error.message,
  };

  if (error instanceof Joi.ValidationError) {
    statusCode = 422; // Unprocessable Entity
    data = {
      message: error.message,
    };
  }

  if (error instanceof CustomError) {
    statusCode = error.status;
    data = {
      message: error.message,
    };
  }

  res.status(statusCode).json(data);
};

module.exports = errorhandller;
