'use strict';

const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = async (req, res, next) => {
  const jwtToken = req.header("jwt_token");
  if (!jwtToken) {
    return res.status(403).json("Authorization Denied");
  }

  try {
    const verify = jwt.verify(jwtToken, process.env.jwtSecret);
    req.user = verify.user;
    next()
  } catch (error) {
    console.error(error.message);
    return res.status(401).json("Token is not valid");
  };
};