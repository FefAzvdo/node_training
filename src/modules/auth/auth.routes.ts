import { Router } from "express";
import { AuthService } from "./auth.service";

const router = Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const tokens = await AuthService.login(email, password);
  res.json(tokens);
});

router.post("/refresh", async (req, res) => {
  const { token } = req.body;
  const newTokens = await AuthService.refresh(token);
  res.json(newTokens);
});

router.post("/logout", async (req, res) => {
  const userId = req.body.userId;
  await AuthService.logout(userId);
  res.sendStatus(204);
});

export default router;
