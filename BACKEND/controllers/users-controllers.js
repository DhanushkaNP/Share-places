const HttpError = require("../models/http-error");
const { validationResult } = require("express-validator");
const { v4: uuidv4 } = require("uuid");

const dummyUsers = [
  {
    id: "u1",
    name: "Dhanushka Nuwan",
    email: "test@email.com",
    password: "testers",
  },
];

function getAllUsers(req, res, next) {
  if (dummyUsers.length === 0) {
    next(new HttpError("Could not find any users", 404));
  } else {
    res.json({ users: dummyUsers });
  }
}

function signup(req, res, next) {
  const err = validationResult(req);
  if (!err.isEmpty()) {
    console.log(err);
    throw new HttpError("Invalid input passed, check your inputs", 422);
  }

  const { name, email, password } = req.body;

  const hasUser = dummyUsers.find((u) => u.email === email);
  if (hasUser) {
    throw new HttpError("Email already exist", 422);
  }

  const newUser = {
    id: uuidv4(),
    name,
    email,
    password,
  };
  dummyUsers.push(newUser);

  res.status(201).json({ dummyUsers });
}

function login(req, res, next) {
  const { email, password } = req.body;

  const foundUser = dummyUsers.find((u) => u.email === email);

  if (!foundUser) {
    next(new HttpError("Email not matched with any users", 404));
  } else {
    if (foundUser.password === password) {
      res.status(200).json("Successfully logged in!");
    } else {
      next(new HttpError("Password incorrect", 404));
    }
  }
}
exports.getAllUsers = getAllUsers;
exports.signup = signup;
exports.login = login;
