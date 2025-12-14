import express from "express";
import authRoutes from "./routes/auth"; // Make sure this file exists
import sweetsRoutes from "./routes/sweets"; // Your sweets routes
import ordersRoutes from "./routes/orders"; // Your orders routes

const app = express(); // ✅ Must declare before using

app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/sweets", sweetsRoutes);
app.use("/orders", ordersRoutes);

app.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok" });
});

export default app;
