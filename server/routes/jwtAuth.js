const router = require("express").Router();
const pool = require("../db/index");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator");
const { sendFailStatus, sendSuccessStatus } = require("../utils/sendStatus");
const validInfo = require("../middleware/validInfo");
const authorization = require("../middleware/authorization");

router.post("/register", validInfo, async (req, res) => {
  try {
    // Check if user exists in database
    const { name, email, password } = req.body;
    const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
      email,
    ]);

    // If user exists in database
    if (user.rows.length !== 0) {
      // Respond to request
      return sendFailStatus(res, 401, "user already exists");
    }

    // Encrypt the user password
    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);

    const bcryptPassword = await bcrypt.hash(password, salt);

    // Enter new user into database
    const newUser = await pool.query(
      "INSERT INTO users(user_name, user_email, user_password) VALUES($1, $2, $3) returning *",
      [name, email, bcryptPassword]
    );

    // Generate JWT token
    const token = jwtGenerator(newUser.rows[0].user_id);

    // Respond to request
    sendSuccessStatus(
      res,
      200,
      {
        user: newUser.rows[0],
        token,
      },
      newUser.rows.length
    );
  } catch (err) {
    // Log error to console
    console.log(err.message);

    // Respond to request
    sendFailStatus(res, 500, "server error");
  }
});

router.post("/login", validInfo, async (req, res) => {
  try {
    // Check if user exists in database
    const { email, password } = req.body;
    const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
      email,
    ]);

    // If user does not exist in database
    if (user.rows.length === 0) {
      // Respond to request
      return sendFailStatus(res, 401, "user does not exist");
    }

    // Check if incomming password is valid
    const isPasswordValid = await bcrypt.compare(
      password,
      user.rows[0].user_password
    );

    // If password is not valid
    if (!isPasswordValid) {
      // Respond to request
      return sendFailStatus(res, 401, "invalid credentials");
    }

    // Generate JWT token
    const token = jwtGenerator(user.rows[0].user_id);

    // Respond to request
    return sendSuccessStatus(res, 200, { token });
  } catch (err) {
    console.log(err.message);
    sendFailStatus(res, 500, "server error");
  }
});

router.get("/verify", authorization, async (req, res) => {
  try {
    sendSuccessStatus(res, 200, { verified: true });
  } catch (err) {
    console.log(err.message);
    sendFailStatus(res, 500, "server error");
  }
});

module.exports = router;
