const { config } = require("dotenv");
config({ path: `.env.${process.env.NODE_ENV || "development"}.local` });

module.exports = CREDENTIALS = process.env.CREDENTIALS === "true";
module.exports = { NODE_ENV, PORT, CRYPTOJSKEY } = process.env;
