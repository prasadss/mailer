const winston = require("winston");
const config = require("../config").getConfig();
var amqp = require("amqplib/callback_api");
let url = `amqp://${config.get("RAABITMQ_USERNAME")}:${config.get(
  "RAABITMQ_PASSWORD"
)}@${config.get("RABBITMQ_URL")}`;
module.exports = function () {
  let connectionInstance = null;
  function init() {
    amqp.connect(url, function (error0, connection) {
      if (error0) {
        throw error0;
      }
      connectionInstance = connection;
      winston.info("Rabbit MQ Connected");
    });
  }
  function getRabbitConnection() {
    return new Promise((resolve, reject) => {
      connectionInstance.createChannel(function (error1, channel) {
        if (error1) {
          reject(error1);
        }
        resolve(channel);
      });
    });
  }
  async function sendMessage(queue, msg) {
    try {
      let channel = await getRabbitConnection();
      channel.sendToQueue(queue, Buffer.from(JSON.stringify(msg)));
    } catch (ex) {
      winston.error(`Failed to push message ${ex}`);
    }
  }

  return {
    getRabbitConnection,
    sendMessage,
    init,
  };
};
