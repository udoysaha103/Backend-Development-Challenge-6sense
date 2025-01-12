// creating the server
const express = require("express");
const app = express();

// configuring dotenv
const dotenv = require("dotenv");
dotenv.config();

// importing mongodb
const mongoose = require("mongoose");


app.get("/", (req, res) => {
  res.send("Hello World!");
});


const PORT = process.env.BACKEND_PORT || 3002;

mongoose
  .connect(process.env.DB_URI)
  .then(() => {
    console.log("Connected to MongoDB");

    // starting the server
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB", err);
  });
