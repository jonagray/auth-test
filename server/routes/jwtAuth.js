'use strict';
const express = require('express');
const router = express.Router();
const pool = require("../../db");
const bcrypt = require('bcrypt');
const jwtGenerator = require("../utils/jwtGenerator");

// Register

// router.post("/register", async (req, res) => {

//   // 1. Destructure the req.body (name, email, password)

//   const { email, name, password } = req.body;

//   try {
    
//     const user = await pool.query("SELECT * FROM nearapogee_users WHERE nearapogee_user_email = $1", [
//       email
//     ]);


//     if (user.rows.length > 0) {
//       return res.status(401).send("user already exists");
//     }


//     // 2. Check if the user exists (if user exists, then throw error)

   

    

//     // res.json(user.rows);

//     // 3. Bcrypt the user password

//     const saltRound = 10;
//     const salt = await bcrypt.genSalt(saltRound);

//     const bcryptPassword = await bcrypt.hash(password, salt);

//     // 4. Enter the new user inside the database

//     let newUser = await pool.query("INSERT INTO nearapogee_users (nearapogee_user_name, nearapogee_user_email, nearapogee_user_password) VALUES ($1, $2, $3) RETURNING *", [
//       name, email, bcryptPassword]
//     );

//     res.json(newUser.rows[0]);

//     // 5. Generating the jwt token

//     const token = jwtGenerator(newUser.rows[0].user_id);

//     res.json({token});

//   } catch (error) {
//     console.error(error.message);
//     res.status(500).send("Server error");
//   }
// })

router.post("/register", async (req, res) => {
  const { email, name, password } = req.body;

  try {
    const user = await pool.query("SELECT * FROM nearapogee_users WHERE nearapogee_user_email = $1", [
      email
    ]);

    if (user.rows.length > 0) {
      return res.status(401).json("User already exist!");
    }

    const salt = await bcrypt.genSalt(10);
    const bcryptPassword = await bcrypt.hash(password, salt);

    let newUser = await pool.query(
      "INSERT INTO nearapogee_users (nearapogee_user_name, nearapogee_user_email, nearapogee_user_password) VALUES ($1, $2, $3) RETURNING *",
      [name, email, bcryptPassword]
    );

    const jwtToken = jwtGenerator(newUser.rows[0].user_id);

    return res.json({ jwtToken });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;