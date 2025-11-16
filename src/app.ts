import express from "express";
import dotenv from "dotenv";
import authRoutes from "@modules/auth/auth.routes";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import cors from "cors";
import { auth } from "@core/middlewares/auth";
import { userRate } from "@core/middlewares/userRateLimit";

dotenv.config();

const app = express();
app.use(express.json());
app.use("/auth", authRoutes);
app.use(helmet());
app.use(cors());
app.use(
  rateLimit({
    windowMs: 60 * 1000,
    max: 60,
    message: "Too many requests",
  }),
);

// app.use("/sensitive", auth, userRate, sensitiveRoutes);

app.get("/health", (_, res) => {
  res.json({ status: "ok" });
});

export default app;
