const axios = require("axios");
const HttpError = require("../models/http-error");
require("dotenv").config();
const apiKey = process.env.GOOGLE_API_KEY;

async function getCoordsByAddress(address) {
  const response = await axios.get(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      address
    )}&key=${apiKey}`
  );

  const data = response.data;

  if (!data || data.status === "ZERO_RESULTS") {
    const err = new HttpError(
      "Could not find location for the specific address.",
      422
    );
    throw err;
  } else {
    const coordinates = data.results[0].geometry.location;
    return coordinates;
  }
}

module.exports = getCoordsByAddress;
