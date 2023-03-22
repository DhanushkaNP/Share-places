const HttpError = require("../models/http-error");
const { validationResult } = require("express-validator");
const { v4: uuidv4 } = require("uuid");
const getCoordsByAddress = require("../util/location");

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

function getPlaceById(req, res, next) {
  const placeId = req.params.pid;
  const place = DUMMY_PLACES.find((p) => placeId === p.id);

  if (!place) {
    throw new HttpError(
      "Did not find any data related to given provided place id.",
      404
    );
  } else {
    res.json({ place });
  }
}

function getPlacesByUserId(req, res, next) {
  const userId = req.params.uid;
  const places = DUMMY_PLACES.filter((p) => userId === p.creator);

  if (places.length == 0) {
    next(new HttpError("Could not find places for provided user id.", 404));
  } else {
    res.json({ places });
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

  const createdPlace = {
    id: uuidv4(),
    title,
    description,
    address,
    location: coordinates,
    creator,
  };

  DUMMY_PLACES.push(createdPlace);
  res.status(201).json({ places: createdPlace });
}

function updatePlace(req, res, next) {
  const err = validationResult(req);
  if (!err.isEmpty()) {
    console.log(err);
    throw new HttpError("Invalid input passed, check your inputs", 422);
  }

  const { title, description } = req.body;
  const placeId = req.params.pid;
  const updatePlace = { ...DUMMY_PLACES.find((p) => p.id === placeId) };
  const placeIndex = DUMMY_PLACES.findIndex((p) => p.id === placeId);

  updatePlace.title = title;
  updatePlace.description = description;
  DUMMY_PLACES[placeIndex] = updatePlace;

  res.status(200).json({ updatePlace });
}

function deletePlace(req, res, next) {
  const placeId = req.params.pid;
  if (
    !DUMMY_PLACES.find((p) => {
      p.id === placeId;
    })
  ) {
    throw new HttpError("Could not find place for that id", 404);
  }
  DUMMY_PLACES = DUMMY_PLACES.filter((p) => p.id !== placeId);
  res.status(200).json({ message: "Delete  place" });
}

exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;
