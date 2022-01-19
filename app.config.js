const commonConfig = require("./app.json");

module.exports = () => {
  if (process.env.APP_ENV === "production") {
    const config = require("./app.production.json");
    return {
      ...commonConfig,
      ...config
    };
  } else if (process.env.APP_ENV === "staging") {
    const config = require("./app.staging.json");
    return {
      ...commonConfig,
      ...config
    };
  } else {
    const config = require("./app.development.json");
    return {
      ...commonConfig,
      ...config
    };
  }
};