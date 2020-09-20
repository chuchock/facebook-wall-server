// Route for user authentication
const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const authController = require("../controllers/authController");

// Create user
// api/auth
router.post(
  "/",
  [
    check("email", "Add a valid email").isEmail(),
    check("password", "Password must be at least 6 characters long").isLength({
      min: 6,
    }),
  ],
  authController.authenticateUser
);

module.exports = router;
