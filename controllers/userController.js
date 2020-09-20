const userModel = require("../models/userModel");
const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

exports.createUser = async (req, res) => {
  //console.log(req.body); // get json

  // Check for errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Extract email and password
  const { email, password } = req.body;

  try {
    // Check for unique user
    let user = await userModel.findOne({ email });

    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }

    // Create new user
    user = new userModel(req.body);

    // hash password
    const salt = await bcryptjs.genSalt(10); //salt = unique hash if different users write same pass
    user.password = await bcryptjs.hash(password, salt);

    // Save user
    await user.save();

    // create and sign JWT
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
    res.status(400).send("Hubo un error");
  }
};
