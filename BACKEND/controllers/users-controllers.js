const HttpError = require("../models/http-error");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const User = require("../models/user");

async function getAllUsers(req, res, next) {
  let users;
  try {
    users = await User.find({}, "-password");
  } catch (err) {
    return next(new HttpError("Something went wrong ", 500));
  }

  if (users.length === 0) {
    return next(new HttpError("Didn't found any user", 422));
  }
  res
    .status(201)
    .json({ users: users.map((user) => user.toObject({ getters: true })) });
}

async function signup(req, res, next) {
  const err = validationResult(req);
  if (!err.isEmpty()) {
    console.log(err);
    return next(new HttpError("Invalid input passed, check your inputs", 500));
  }

  const { name, email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    return next(new HttpError("Signup failed", 422));
  }

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    const error = new HttpError("Signup failed please try again!!!", 500);
    return next(error);
  }

  const newUser = new User({
    name,
    email,
    password: hashedPassword,
    places: [],
    image: req.file.path,
  });

  try {
    await newUser.save();
  } catch (err) {
    return next(
      new HttpError("User email already exist, error with signup", 500)
    );
  }

  let token;
  try {
    token = jwt.sign(
      { userId: newUser.index, email: newUser.email },
      "This_is_a_secret_only_for_this_project_43ff54&^ds",
      { expiresIn: "1h" }
    );
  } catch (err) {
    const error = new HttpError(
      "User email already exist, error with signup",
      500
    );
    return next(error);
  }

  res
    .status(201)
    .json({ userId: newUser.id, email: newUser.email, token: token });
}

async function login(req, res, next) {
  const { email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    return next(new HttpError("Login failed", 422));
  }

  if (!existingUser) {
    return next(new HttpError("Credentials are invalid", 401));
  }

  let isValidPassword = false;
  try {
    isValidPassword = bcrypt.compare(password, existingUser.password);
  } catch (err) {
    const error = new HttpError(
      "Could not logged you in, please try again!",
      500
    );
    return next(error);
  }

  if (!isValidPassword) {
    const error = new HttpError("Credentials are invalid", 401);
    return next(error);
  }

  res.status(200).json({
    message: "Successfully logged in!",
    user: existingUser.toObject({ getters: true }),
  });
}
exports.getAllUsers = getAllUsers;
exports.signup = signup;
exports.login = login;
