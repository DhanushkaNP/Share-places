const HttpError = require("../models/http-error");
const mongoose = require("mongoose");
const { validationResult } = require("express-validator");
const { v4: uuidv4 } = require("uuid");
const getCoordsByAddress = require("../util/location");
const Place = require("../models/place");
const User = require("../models/user");
const place = require("../models/place");

let DUMMY_PLACES = [
  {
    id: "p1",
    title: "Empire state building 01",
    description: "One of the most sky scraper in the world!",
    address: "20 W 34th St., New York, NY 10001, United States",
    location: {
      lat: 40.7484405,
      lng: -73.9878531,
    },
    creator: "u1",
  },
  {
    id: "p2",
    title: "Empire state building 02",
    description: "One of the most sky scraper in the world!",
    address: "20 W 34th St., New York, NY 10001, United States",
    location: {
      lat: 40.7484405,
      lng: -73.9878531,
    },
    creator: "u2",
  },
];

async function getPlaceById(req, res, next) {
  const placeId = req.params.pid;

  let place;
  try {
    place = await Place.findById(placeId);
  } catch (err) {
    return next(
      new HttpError("Something go wrong, couldn't find any places", 500)
    );
  }

  if (!place) {
    return next(
      new HttpError(
        "Did not find any data related to given provided place id.",
        404
      )
    );
  } else {
    res.json({ place: place.toObject({ getters: true }) });
  }
}

async function getPlacesByUserId(req, res, next) {
  const userId = req.params.uid;
  let places;
  try {
    places = await Place.find({ creator: userId });
  } catch (err) {
    return next(new HttpError("Somethin go wrong!!! Couldn't find any place"));
  }

  if (places.length == 0) {
    next(new HttpError("Could not find places for provided user id.", 404));
  } else {
    res.json({
      places,
    });
  }
}

async function createPlace(req, res, next) {
  const err = validationResult(req);
  if (!err.isEmpty()) {
    console.log(err);
    return next(new HttpError("Invalid input passed, check your inputs", 422));
  }

  const { title, description, address, creator } = req.body;

  let coordinates;
  try {
    coordinates = await getCoordsByAddress(address);
  } catch (err) {
    return next(err);
  }

  const createdPlace = new Place({
    title,
    description,
    address,
    location: coordinates,
    creator,
    image:
      "https://media.istockphoto.com/id/486334510/photo/new-york-city-skyline.jpg?s=1024x1024&w=is&k=20&c=2XpMl1tWgCAAQ55ZI4PcMYr1CQTIs7JMkpfDzJSRJiE=",
  });

  let user;
  try {
    user = await User.findById(creator);
  } catch (err) {
    return next(new HttpError("Creating place failed, try again ", 500));
  }

  if (!user) {
    return next(new HttpError("Could not found any user for provided id", 500));
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await createdPlace.save({ session: sess });
    user.places.push(createdPlace);
    await user.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    return next(
      new HttpError("Creating place failed, please try again 2", 500)
    );
  }

  res.status(201).json({ places: createdPlace });
}

async function updatePlace(req, res, next) {
  const err = validationResult(req);
  if (!err.isEmpty()) {
    console.log(err);
    return next(new HttpError("Invalid input passed, check your inputs", 422));
  }

  const { title, description } = req.body;
  const placeId = req.params.pid;

  let place;
  try {
    place = await Place.findById(placeId);
  } catch (err) {
    return next(
      new HttpError("Something go wrong, couldn't update the place", 500)
    );
  }

  place.title = title;
  place.description = description;
  try {
    place.save();
  } catch (err) {
    return next(
      new HttpError("Something go wrong, couldn't update the place", 500)
    );
  }

  res.status(200).json({ place: place.toObject({ getters: true }) });
}

async function deletePlace(req, res, next) {
  const placeId = req.params.pid;

  let place;
  try {
    place = await Place.findById(placeId).populate("creator");
  } catch (err) {
    return next(
      new HttpError("Something went wrong couldn't delete place", 500)
    );
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    place.creator.places.pull(place);
    await place.creator.save({ session: sess });
    await Place.findByIdAndDelete(placeId, { session: sess });
    await sess.commitTransaction();
  } catch (err) {
    return next(
      new HttpError("Something went wrong couldn't delete the place", 500)
    );
  }

  res.status(200).json({ message: "Deleted place" });
}

exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;
