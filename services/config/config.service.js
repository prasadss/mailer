const config = require("config");
module.exports = function () {
  let cacheConfig = {};

  function init() {
    cacheConfig = config;
  }

  function getConfig() {
    return cacheConfig;
  }

  function setConfig(configSetting) {
    cacheConfig = configSetting;
  }
  return {
    init,
    getConfig,
    setConfig,
  };
};
