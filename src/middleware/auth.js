const jwt = require("jsonwebtoken");
const { catchAsync } = require("../helpers/request");
const userModel = require("../models/schema/user");


 exports.verifyUser = catchAsync(async (req, res, next) => {
  const token = req.cookies.token;
  if (!token)
    return res
      .status(404)
      .json({ error: "No Token Found" });
    const data = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(data.id);
    if(!user) return res.status(404).json({ error: "You're not authorized" });
    req.user = user._id;
    req.email = user.email
    next();
});