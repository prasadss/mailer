const winston = require("winston");
const express = require("express");
const config = require("./services/config").getConfig();
if (require.main === module) {
  initApp();
}

function initApp() {
  const app = express();
  handleGloablExceptions();
  startup();
  mountRoutes(app);  
  startListening(app, config);
}

function startup() {
  require("./startup/config")();
  require("./startup/logger")();
  require('./startup/database')();
  require('./startup/rabbitmq')();
}
function mountRoutes(app) {
  require("./startup/routes")(app);
}

function handleGloablExceptions() {

  process.on("unhandledRejection", (reason = "unknown") => {
    winston.error(`Unhandled Rejection ${reason}`);
  });

  process.on('uncaughtException', (err, origin) => {    
    winston.error(`Uncaught Exception.  ${origin} ${err}`,()=>process.exit(1));
  });
}
function startListening(app, configSettings) {
  const PORT = configSettings.PORT || 3000;
  app.listen(PORT, () => winston.info(`Listening Port ${PORT}`));
}
