require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const app = express();
const port = process.env.PORT;

// MIDDLEWARE
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

// REGISTER AND LOGIN ROUTES
app.use("/api/v1/auth", require("./routes/jwtAuth"));

// DASHBOARD ROUTE
app.use("/api/v1/dashboard", require("./routes/dashboard"));

app.listen(port, () => {
  console.log(`SERVER LISTENING ON PORT ${port}`);
});
