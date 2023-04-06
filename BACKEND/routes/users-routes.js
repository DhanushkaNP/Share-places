const express = require("express");
const { body } = require("express-validator");
const router = express.Router();

const userControllers = require("../controllers/users-controllers");
const fileUpload = require("../middleware/file-upload");

router.get("/", userControllers.getAllUsers);

router.post(
  "/signup",
  fileUpload.single("image"),
  [
    body("password").isLength({ min: 8 }),
    body("email").isEmail().normalizeEmail(),
    body("name").not().isEmpty(),
  ],
  userControllers.signup
);

router.post("/login", userControllers.login);

module.exports = router;
