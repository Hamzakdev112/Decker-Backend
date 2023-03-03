const dotenv = require("dotenv");
const path = require("path");
dotenv.config({ path: path.join(__dirname, "../../.env") });

module.exports = {
  // Database
  MONGODB_URL:
    "mongodb+srv://hkkhan112:popular123@cluster0.qysecyo.mongodb.net/MONSTER?retryWrites=true&w=majority",
};
