import express from "express";
import Sweet from "../models/Sweet";
import { verifyToken } from "../middleware/auth";

const router = express.Router();

// ADD sweet (Admin only)
router.post("/", verifyToken, async (req, res) => {
  if (!(req as any).user.isAdmin) return res.status(403).json({ message: "Admin only" });
  const sweet = new Sweet(req.body);
  await sweet.save();
  res.status(201).json(sweet);
});

// GET all sweets
router.get("/", async (_req, res) => {
  const sweets = await Sweet.find();
  res.json(sweets);
});

// SEARCH sweets
router.get("/search", async (req, res) => {
  const { name, category, minPrice, maxPrice } = req.query;
  const filter: any = {};
  if (name) filter.name = { $regex: name, $options: "i" };
  if (category) filter.category = category;
  if (minPrice) filter.price = { ...filter.price, $gte: Number(minPrice) };
  if (maxPrice) filter.price = { ...filter.price, $lte: Number(maxPrice) };
  const sweets = await Sweet.find(filter);
  res.json(sweets);
});

// UPDATE sweet (Admin only)
router.put("/:id", verifyToken, async (req, res) => {
  if (!(req as any).user.isAdmin) return res.status(403).json({ message: "Admin only" });
  const sweet = await Sweet.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(sweet);
});

// DELETE sweet (Admin only)
router.delete("/:id", verifyToken, async (req, res) => {
  if (!(req as any).user.isAdmin) return res.status(403).json({ message: "Admin only" });
  await Sweet.findByIdAndDelete(req.params.id);
  res.json({ message: "Sweet deleted" });
});

// PURCHASE sweet (any user)
router.post("/:id/purchase", verifyToken, async (req, res) => {
  const sweet = await Sweet.findById(req.params.id);
  const { quantity } = req.body;
  if (!sweet) return res.status(404).json({ message: "Sweet not found" });
  if (sweet.quantity < quantity) return res.status(400).json({ message: "Not enough stock" });
  sweet.quantity -= quantity;
  await sweet.save();
  res.json(sweet);
});

// RESTOCK sweet (Admin only)
router.post("/:id/restock", verifyToken, async (req, res) => {
  if (!(req as any).user.isAdmin) return res.status(403).json({ message: "Admin only" });
  const sweet = await Sweet.findById(req.params.id);
  const { quantity } = req.body;
  if (!sweet) return res.status(404).json({ message: "Sweet not found" });
  sweet.quantity += quantity;
  await sweet.save();
  res.json(sweet);
});

export default router;
