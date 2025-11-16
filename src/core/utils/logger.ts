import app from "app";
import pino from "pino";

export const logger = pino({
  level: "info",
  transport: {
    target: "pino-pretty",
  },
});
