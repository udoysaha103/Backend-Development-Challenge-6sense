// creating the server
const express = require("express");
const app = express();

// configuring dotenv
const dotenv = require("dotenv");
dotenv.config();

// importing mongodb
const mongoose = require("mongoose");


// middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));


// importing routes



// default endpoint
app.get("/api", (req, res) => {
    res.status(200).json({"message": "Challenge accepted!"});
});


// Connecting to MongoDB and starting the server
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
