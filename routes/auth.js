// Route for user authentication
const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const { check } = require("express-validator");
const authController = require("../controllers/authController");

// Create user
// api/auth
router.post(
  "/",
  // [
  //   check("email", "Add a valid email").isEmail(),
  //   check("password", "Password must be at least 6 characters long").isLength({
  //     min: 6,
  //   }),
  // ],
  authController.authenticateUser
);

// Get authenticated user
// api/auth
router.get("/", auth, authController.authenticatedUser);

module.exports = router;
