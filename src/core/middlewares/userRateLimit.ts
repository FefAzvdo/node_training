import rateLimit from "express-rate-limit";

export const userRate = rateLimit({
  windowMs: 60 * 1000,
  max: 20,
  keyGenerator: (req) => (req as any).user?.id || req.ip,
});
