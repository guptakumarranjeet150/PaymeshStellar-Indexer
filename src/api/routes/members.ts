import { Router } from "express";

export const membersRouter = Router();

/**
 * Members routes. STRUCTURE ONLY — implement in the members API issue (#20).
 *
 *   GET /members/:address/groups   → groups an address is a member of
 */

/** GET /members/:address/groups — groups an address belongs to. (#20) */
membersRouter.get("/members/:address/groups", (_req, _res, next) => {
  next(new Error("Not implemented — see issue #20 (members API)"));
});
