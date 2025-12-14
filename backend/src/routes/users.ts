import express from "express";
import User from "../models/User";

const router = express.Router();

// Get all users
router.get("/", async (_req, res) => {
  const users = await User.find();
  res.json(users);
});

// Add a user
router.post("/", async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.status(201).json(user);
});

export default router;
