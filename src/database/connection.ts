import "../lib/env";
require("dotenv").config();

var mongoose = require("mongoose");

mongoose.Promise = global.Promise;

mongoose
  .connect(
    `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_URL}/test`
  )
  .then(() => {
    console.log("Success");
  })
  .catch((err) => {
    console.error(err);
  });
