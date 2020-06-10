'use strict';

const express = require("express");
const app = express();
const cors = require("cors");

// Middleware
app.use(cors());
app.use(express.json());

// Register and login routes
app.use("/auth", require("./routes/jwtAuth"));

// Dashboard route
app.use("/dashboard", require("./routes/dashboard"));

// Listen route
app.listen(5000, () => {
  console.log(`Server is running on port 5000`);
});