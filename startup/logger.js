const winston = require("winston");

module.exports = function () {
  winston.add(
    new winston.transports.Console({ colorize: true, prettyPrint: true })
  );
};
