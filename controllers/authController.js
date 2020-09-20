const User = require("../models/User");
const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

exports.authenticateUser = async (req, res) => {
  // Check if errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Extract email and password
  const { email, password } = req.body;

  try {
    // Check if user exists
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "User does not exist" });
    }

    // Check password
    const correctPass = await bcryptjs.compare(password, user.password);
    if (!correctPass) {
      return res.status(400).json({ msg: "Invalid password" });
    }

    // If all correct we sign JWT
    const payload = {
      user: {
        id: user.id,
      },
    };

    // Sign JWT, expires in 1 hour(3600 secs)
    jwt.sign(
      payload,
      process.env.SECRET,
      {
        expiresIn: 3600,
      },
      (error, token) => {
        if (error) throw error;

        // Confirmation message
        res.json({
          token,
        });
      }
    );
  } catch (error) {
    console.log(error);
  }
};
