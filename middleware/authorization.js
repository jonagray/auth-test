'use strict';

const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = function (req, res, next) {
  const jwtToken = req.header("jwt_token");
  if (!jwtToken) {
    return res.status(403).json({ msg: "Authorization Denied" });
  }
  try {
    const verify = jwt.verify(jwtToken, process.env.jwtSecret);
    req.user = verify.user;
    next();
  } catch (error) {
    res.status(401).json({ msg: "Token is not valid" });
  };
};