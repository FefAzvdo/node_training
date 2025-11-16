import express from "express";
import dotenv from "dotenv";
import authRoutes from "@modules/auth/auth.routes";

dotenv.config();

const app = express();
app.use(express.json());
app.use("/auth", authRoutes);

app.get("/health", (_, res) => {
  res.json({ status: "ok" });
});

export default app;
