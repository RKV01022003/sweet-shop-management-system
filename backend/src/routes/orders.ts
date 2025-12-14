import express from "express";
import Order from "../models/Order";

const router = express.Router();

// GET all orders
router.get("/", async (_req, res) => {
  try {
    const orders = await Order.find().populate("products.productId");
    res.json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
});

// CREATE order
router.post("/", async (req, res) => {
  try {
    console.log("REQ BODY 👉", JSON.stringify(req.body, null, 2));

    const order = new Order(req.body);
    await order.save();

    res.status(201).json(order);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE all orders (CLEAN DB)
router.delete("/", async (_req, res) => {
  try {
    await Order.deleteMany({});
    res.json({ message: "All orders deleted" });
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE order by ID
router.delete("/:id", async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.json({ message: "Order deleted" });
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;
