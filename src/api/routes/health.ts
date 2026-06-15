import { Router } from "express";

export const healthRouter = Router();

/**
 * Liveness/readiness probe. (#22)
 *
 * STRUCTURE ONLY. Implement to verify the DB connection and report cursor lag
 * (last indexed ledger vs. chain tip).
 */
healthRouter.get("/health", (_req, res, next) => {
  next(new Error("Not implemented — see issue #22 (health endpoint)"));
});
