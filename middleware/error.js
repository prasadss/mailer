const winston = require("winston");
function ErrorHandling(err, req, res, next) {
  winston.error(err.message, err);
}
module.exports = ErrorHandling;
