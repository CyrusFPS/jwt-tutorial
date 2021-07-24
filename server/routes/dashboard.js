const router = require("express").Router();
const pool = require("../db/index");
const authorization = require("../middleware/authorization");
const { sendFailStatus, sendSuccessStatus } = require("../utils/sendStatus");

router.get("/", authorization, async (req, res) => {
  try {
    // Retrieve user from database
    const user = await pool.query(
      "SELECT user_name FROM users WHERE user_id = $1",
      [req.user]
    );

    sendSuccessStatus(res, 200, { user: user.rows[0] });
  } catch (err) {
    console.log(err.message);
    sendFailStatus(res, 500, "server error");
  }
});

module.exports = router;
