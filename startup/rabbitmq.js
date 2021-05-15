const rabbitmqService = require("../services/rabbitmq");

module.exports = function () {
  rabbitmqService.init();
};
