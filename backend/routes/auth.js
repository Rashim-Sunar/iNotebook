const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");

//Create a User using: POST " /api/auth/createuser". No login required
router.post(
  "/createuser",
  [
    body("name", "Name must contain atleast 5 characters").isLength({ min: 5 }),
    body("email", "Invalid email").isEmail(),
    body("password", "Password must contain atleast 5 characters").isLength({
      min: 5,
    }),
  ], async (req, res) => {
    //If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // Check whether the user with same email exists already
      const user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ error: "Sorry the user with the email already exists" });
      }
      //Create a new usr if the user doesn't exists already
      user = await Userd.create({
        name: req.body.name,
        password: req.body.password,
        email: req.body.email,
      });
      res.send(user);
    } catch (error) {
      res.json({ error: " Some error occured" });
    }
  }
);

module.exports = router;
