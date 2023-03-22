const express = require("express");
const { body } = require("express-validator");
const router = express.Router();

const userControllers = require("../controllers/users-controllers");

router.get("/", userControllers.getAllUsers);

router.post(
  "/signup",
  [
    body("password").isLength({ min: 8 }),
    body("email").isEmail().normalizeEmail(),
    body("name").not().isEmpty(),
  ],
  userControllers.signup
);

router.post("/login", userControllers.login);

module.exports = router;
