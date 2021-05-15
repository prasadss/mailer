const mongoose = require("mongoose");
const winston = require("winston");
const config = require("config");

module.exports = function () {
  let url = `mongodb://${config.get("MONGO_DB_URL")}:${config.get(
    "MONGO_DB_PORT"
  )}/${config.get("MONGO_DB_DATABASE")}`;
  mongoose
    .connect(url, {
      auth: { authSource: "admin" },
      user: config.get("MONGO_USERNAME"),
      pass: config.get("MONGO_PASSWORD"),
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => winston.info(`connected to mongodb ${url}`))
    .catch((ex) => winston.error(`Failed to connect mongodb - ${ex}`));
};
