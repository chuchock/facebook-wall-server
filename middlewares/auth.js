/*
  Authentication Middleware
*/

const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  // Read token from header
  const token = req.header("x-auth-token");
  // console.log(token);

  // Check if there is not token
  if (!token) {
    return res
      .status(401)
      .json({ msg: "There is not token, invalid permission" });
  }

  // Validate token
  try {
    const encryption = jwt.verify(token, process.env.SECRET);
    req.user = encryption.user;
    next();
  } catch (error) {
    res.status(401).json({ meg: "Invalid token" });
  }
};
