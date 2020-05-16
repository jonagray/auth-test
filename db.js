'use strict';

const Pool = require("pg").Pool;

const pool = new Pool({
  user: "jongraybill",
  password: "cat123",
  host: "localhost",
  port: 5432,
  database: "nearapogee_auth"
});

module.exports = pool;