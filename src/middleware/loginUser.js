var jwt = require("jsonwebtoken");
const { catchAsync } = require("../helpers/request");
const userModel = require("../models/schema/user");

const JWT_SECRET = "avc";

const loginUser = catchAsync(async (req, res, next) => {
  const token = req.cookies.token;

  if (!token)
    return res
      .status(401)
      .send({ error: "Please authenticate  a valid token" });

  try {
    const data = jwt.verify(token, JWT_SECRET);

    const user = await userModel.findById(data.id);
    req.user = user;

    next();
  } catch (error) {
    res.status(401).send({ error: "Please authenticate using a valid token" });
  }
});
module.exports = loginUser;
