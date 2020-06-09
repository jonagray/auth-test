const router = require("express").Router();
const authorization = require("../middleware/authorization");
const pool = require("../db");

router.get("/", authorization, async (req, res) => {
  try {
    const user = await pool.query("SELECT u.user_name, c.customer_id, c.customer_name, c.customer_email, c.customer_address FROM users AS u LEFT JOIN customers AS c ON u.user_id = c.user_id WHERE u.user_id = $1", [req.user.id]
    );
    res.json(user.rows[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

// Create a customer
router.post("/customers", authorization, async (req, res) => {
  try {
    console.log(req.body);
    const { name, email, address } = req.body;
    const newUser = await pool.query("INSERT INTO customers (user_id, customer_name, customer_email, customer_address) VALUES($1, $2, $3, $4) RETURNING *",
    [req.user.id, name, email, address]
    );
    res.json(newUser.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

// Get all customers
router.get("/customers", authorization, async (req, res) => {
  try {
    const allUsers = await pool.query("SELECT * FROM customers ORDER BY user_id");
    res.json(allUsers.rows);
  } catch (error) {
    console.error(error.message);
  }
});

// // Get a customer
// router.get("/users/:id", authorization, async (req, res) => {
//   try {
//     const { id } = req.params;
//     const users = await pool.query("SELECT * FROM customers WHERE customer_id = $1 AND user_id = $2", [id, req.user.id]);
//     res.json(users.rows[0]);
//   } catch (error) {
//     console.error(error.message);
//   }
// });

// Update a customer
router.put("/customers/:id", authorization, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, address } = req.body;
    const updateUser = await pool.query("UPDATE customers SET customer_name = $1, customer_email = $2, customer_address = $3 WHERE customer_id = $4 AND user_id = $5 RETURNING *", [name, email, address, id, req.user.id]
    );
    if (updateUser.rows.length === 0) {
      return res.json("This user doesn't belong to you.");
    }
    res.json("User was updated!");
  } catch (error) {
    console.error(error.message);
  }
});

// Delete a customer
router.delete("/customers/:id", authorization, async (req, res) => {
  try {
    const { id } = req.params;
    const deleteUser = await pool.query("DELETE FROM customers WHERE customer_id = $1 AND user_id = $2 RETURNING *", [id, req.user.id]);

    if(deleteUser.rows.length === 0) {
      return res.json("This user doesn't belong to you.")
    }

    res.json("User was deleted!");
  } catch (error) {
    console.error(error.message);
  }
});

module.exports = router;