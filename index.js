'use strict';

const express = require('express');
const app = express();
const cors = require('cors');

// Middleware

app.use(cors());
app.use(express.json()); //req.body

// Routes

// Register and login routes

app.use("/auth", require("./server/routes/jwtAuth"));

app.listen(5000, () => {
  console.log("Server is running on port 5000");
})


 