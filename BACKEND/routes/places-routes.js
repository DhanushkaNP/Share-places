const express = require("express");

const { body } = require("express-validator");

const placeController = require("../controllers/places-controllers");
const fileUpload = require("../middleware/file-upload");
const checkAuth = require("../middleware/check-auth");

const router = express.Router();

router.get("/all", placeController.getAllPlaces);

router.get("/:pid", placeController.getPlaceById);

router.get("/user/:uid", placeController.getPlacesByUserId);

router.use(checkAuth);

router.post(
  "/",
  fileUpload.single("image"),
  [
    body("title").not().isEmpty(),
    body("description").isLength({ min: 5 }),
    body("address").not().isEmpty(),
  ],
  placeController.createPlace
);

router.patch(
  "/:pid",
  [body("title").not().isEmpty(), body("description").isLength({ min: 5 })],
  placeController.updatePlace
);

router.delete("/:pid", placeController.deletePlace);

module.exports = router;
