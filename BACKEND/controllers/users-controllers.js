const HttpError = require("../models/http-error");
const { validationResult } = require("express-validator");
const { v4: uuidv4 } = require("uuid");
const User = require("../models/user");

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

async function signup(req, res, next) {
  const err = validationResult(req);
  if (!err.isEmpty()) {
    console.log(err);
    return next(new HttpError("Invalid input passed, check your inputs", 500));
  }

  const { name, email, password, places } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    return next(new HttpError("Signup failed", 422));
  }

  if (existingUser) {
    return next(new HttpError("User already exist", 500));
  }

  const newUser = new User({
    name,
    email,
    password,
    places,
    image:
      "https://img.freepik.com/free-photo/waist-up-portrait-handsome-serious-unshaven-male-keeps-hands-together-dressed-dark-blue-shirt-has-talk-with-interlocutor-stands-against-white-wall-self-confident-man-freelancer_273609-16320.jpg?w=900&t=st=1680017853~exp=1680018453~hmac=8bc9197d6272e5497a0e1d4c09aee5fabe7433584feaced5fb2bb697accc4721",
  });

  try {
    newUser.save();
  } catch (err) {
    return next(new HttpError("Something went wrong, error with signup", 500));
  }

  res.status(201).json({ newUser: newUser.toObject({ getters: true }) });
}

async function login(req, res, next) {
  const { email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    return next(new HttpError("Login failed", 422));
  }

  if (!existingUser || existingUser.password != password) {
    return next(new HttpError("Credentials are invalid"));
  }
  res.status(200).json("Successfully logged in!");
}
exports.getAllUsers = getAllUsers;
exports.signup = signup;
exports.login = login;
