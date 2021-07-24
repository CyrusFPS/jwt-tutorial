const { sendFailStatus } = require("../utils/sendStatus");

module.exports = (req, res, next) => {
  const { email, name, password } = req.body;

  // Regex check if email is valid
  function validEmail(userEmail) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
  }

  if (req.path === "/register") {
    // If any input fields are empty
    if (![email, name, password].every(Boolean)) {
      // Respond to request
      return sendFailStatus(res, 401, "user missing credentials");
      // If invalid user email
    } else if (!validEmail(email)) {
      // Respond to request
      return sendFailStatus(res, 401, "invaild user email");
    }
  } else if (req.path === "/login") {
    // If any input fields are empty
    if (![email, password].every(Boolean)) {
      // Respond to request
      return sendFailStatus(res, 401, "user missing credentials");
      // If invalid user email
    } else if (!validEmail(email)) {
      // Respond to request
      return sendFailStatus(res, 401, "invaild user email");
    }
  }

  next();
};
