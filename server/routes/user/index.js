import { Router } from "express";
import User from "../../models/User.js";
import bcryptjs from "bcryptjs";
import authenticate from "../../middlewares/authentication.js";
import jwt from "jsonwebtoken";
import { body, validationResult } from "express-validator";
const router = Router();

// For creating a user
router.post(
  "/register",
  body("email").isEmail(),
  body("username").isAlphanumeric(),
  async (req, res) => {
    try {
      let user = await User.findOne({
        username: req.body.username,
      });

      if (user !== null) {
        return res
          .status(409)
          .json({ error: "User with this username already exists" });
      }

      if (!validationResult(req).isEmpty()) {
        return res.status(400).json({ error: "Invalid Schema" });
      }

      user = await User.findOne({ email: req.body.email });
      if (user !== null) {
        return res
          .status(409)
          .json({ error: "User with this username already exists" });
      }

      const salt = await bcryptjs.genSalt(16);
      const hash = await bcryptjs.hash(req.body.password, salt);

      user = new User({
        username: req.body.username,
        email: req.body.email,
        password: hash,
      });

      if (req.body.profilePicture) {
        user["profilePicture"] = req.body.profilePicture;
      }

      await user.save();

      res.status(200).json({ message: "User created successfully" });
    } catch (e) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

// Login as a user
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
    });
    if (user === null) {
      return res.status(404).json({ error: "User not found" });
    }

    const password_compare = await bcryptjs.compare(
      req.body.password,
      user.password
    );
    if (!password_compare) {
      return res
        .status(401)
        .json({ error: "Please login with valid credentials" });
    }

    const payload = {
      user: {
        id: user.id,
      },
    };

    const authtoken = jwt.sign(
      payload,
      String(process.env?.JWT_SECRET_STRING)
    );
    res.status(200).json({ authtoken });
  } catch (e) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get user
router.post("/", authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.user.user.id).select(
      "-password"
    );
    res.status(200).json(user);
  } catch (error) {
    return res.status(500).send({ error: "Internal Server Error" });
  }
});

export default router;

