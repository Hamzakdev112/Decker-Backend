const dotenv = require("dotenv");
const path = require("path");
dotenv.config({ path: path.join(__dirname, "../../.env") });

module.exports = {
  // Database
  MONGODB_URL:
  process.env.MONGO_URL
};
