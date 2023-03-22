const express = require("express");

const { body } = require("express-validator");

const placeController = require("../controllers/places-controllers");

const router = express.Router();

router.get("/:pid", placeController.getPlaceById);

router.get("/user/:uid", placeController.getPlacesByUserId);

router.post(
  "/",
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
