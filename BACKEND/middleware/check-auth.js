const jwt = require("jsonwebtoken");
const HttpError = require("../models/http-error");

const checkAuth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodeToken = jwt.verify(
      token,
      "This_is_a_secret_only_for_this_project_43ff54&^ds"
    );
    res.userData = { userId: decodeToken.userId };
    next();
  } catch (err) {
    const error = new HttpError("Authentication failed", 401);
    return next(error);
  }
};

module.exports = checkAuth;
