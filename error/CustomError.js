class CustomError extends Error {
    constructor(status, message) {
      super();
      this.status = 404;
      this.data = {
        message: message,
        originalMessage: error.message,
      };
    }
  
    static Invalid(message) {
      return new CustomError({ message: "Invalid Error" });
    }
  }
  
  module.exports = CustomError;
  