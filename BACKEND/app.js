const express = require("express");
const HttpError = require("./models/http-error");
const mongoose = require("mongoose");

const placesRoutes = require("./routes/places-routes");
const userRoutes = require("./routes/users-routes");
const db_link = process.env.MONGOOSE_DATABASE;

const app = express();
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
  next();
});

app.use("/api/places", placesRoutes);

app.use("/api/users", userRoutes);

app.use("/", (res, req, next) => {
  const err = new HttpError("Could not find this route", 500);
  throw err;
});

app.use((err, req, res, next) => {
  if (res.headerSent) {
    next(err);
  } else {
    res.status(err.code || 500);
    res.json({ message: err.message || "An unknown error occurred!" });
  }
});

mongoose
  .connect(db_link)
  .then(() => {
    app.listen(5000);
  })
  .catch((err) => {
    console.log(err);
  });
