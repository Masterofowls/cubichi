import { existsSync } from "node:fs";
import { resolve } from "node:path";
import express from "express";
import { rateLimit } from "express-rate-limit";
import { createApiRouter } from "./api.js";

export function mountPublicApi(app, options = {}) {
  const apiOrigins = (
    process.env.FRONTEND_ORIGINS ??
    (process.env.NODE_ENV === "production" ? "" : "http://localhost:5173,http://127.0.0.1:5173")
  )
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);

  app.use((req, res, next) => {
    const origin = req.get("origin");
    if (origin && !apiOrigins.includes(origin)) {
      return res.status(403).json({ error: "Origin is not allowed." });
    }
    if (origin) {
      res.setHeader("Access-Control-Allow-Origin", origin);
      res.setHeader("Vary", "Origin");
      res.setHeader("Access-Control-Allow-Headers", "Content-Type");
      res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
    }
    if (req.method === "OPTIONS") return res.sendStatus(204);
    next();
  });

  app.use(express.json({ limit: "10kb" }));
  app.use(
    "/api/orders",
    rateLimit({
      windowMs: 10 * 60 * 1000,
      limit: 5,
      standardHeaders: true,
      legacyHeaders: false,
    }),
  );
  app.use("/api", createApiRouter(options));
}

export function createApp(options = {}) {
  const app = express();
  const root = resolve(process.cwd());
  mountPublicApi(app, options);

  const outputDir = resolve(root, "out");
  if (existsSync(outputDir)) {
    app.use(express.static(outputDir, { index: "index.html" }));
  }
  app.get("/", (_req, res) => res.sendFile(resolve(root, "index.html")));
  app.use("/images", express.static(resolve(root, "public", "images")));
  app.use("/media", express.static(resolve(root, "public", "media")));

  return app;
}
