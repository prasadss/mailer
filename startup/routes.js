const express = require("express");
const router = require("../routes");
const error = require("../middleware/error");
const helmet = require("helmet");

module.exports = function (app) {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static("./public"));
  app.use(helmet());
  app.use(express.json());
  app.use("/api", router);
  app.use(error);
};
