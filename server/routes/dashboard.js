'use strict';

const router = require("express").Router();
const authorize = require("../middleware/authorization");
const pool = require("../../db");

router.get("/", authorize, async (req, res) => {
  try {

    
    // res.json(req.user);

    const user = await pool.query("SELECT nearapogee_user_name FROM nearapogee_users WHERE user_id = $1", [req.user.id]
    );

    res.json(user.rows[0]);

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

// router.get("/", authorize, async (req, res) => {
//   try {
//     const user = await pool.query(
//       "SELECT nearapogee_user_name FROM nearapogee_users WHERE user_id = $1",
//       [req.user.id] 
//     ); 
    
//   //if would be req.user if you change your payload to this:
    
//   //   function jwtGenerator(user_id) {
//   //   const payload = {
//   //     user: user_id
//   //   };
    
//     res.json(user.rows[0]);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Server error");
//   }
// });

module.exports = router;