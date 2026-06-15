import { Router } from "express";

export const distributionsRouter = Router();

/**
 * Distributions routes. STRUCTURE ONLY — implement in the distributions API
 * issue (#21).
 *
 *   GET /groups/:id/distributions?limit=&offset=   → paginated payout history
 */

/** GET /groups/:id/distributions — paginated distribution history. (#21) */
distributionsRouter.get("/groups/:id/distributions", (_req, _res, next) => {
  next(new Error("Not implemented — see issue #21 (distributions API)"));
});
