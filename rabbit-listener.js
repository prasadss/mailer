var amqp = require("amqplib/callback_api");
const mail = require("./services/mail");
const winston = require("winston");
if (require.main === module) {
  initApp();
}
function initApp() {
  startup();
  startListener();
}
function startup() {
  require("./startup/config")();
}
function startListener() {
  const config = require("./services/config").getConfig();
  let url = `amqp://${config.get("RAABITMQ_USERNAME")}:${config.get(
    "RAABITMQ_PASSWORD"
  )}@${config.get("RABBITMQ_URL")}`;
  amqp.connect(url, function (error0, connection) {
    if (error0) {
      throw error0;
    }
    connection.createChannel(function (error1, channel) {
      if (error1) {
        throw error1;
      }

      var queue = config.get("RABBITMQ_QUEUE_NAME");

      channel.assertQueue(queue, {
        durable: false,
      });

      winston.info(
        " [*] Waiting for messages in %s. To exit press CTRL+C",
        queue
      );

      channel.consume(
        queue,
        function (msg) {
          winston.info("Message recevied - " + msg.content.toString());
          mail.sendMail(msg.content.toString(), config);
        },
        {
          noAck: true,
        }
      );
    });
  });
}
