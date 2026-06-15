import { Router } from "express";

export const groupsRouter = Router();

/**
 * Groups routes. STRUCTURE ONLY — implement in the groups API issue (#19).
 *
 *   GET /groups/:id                  → single group with members
 *   GET /groups?creator=<address>    → groups owned by an address
 */

/** GET /groups — list groups, filterable by `creator`. (#19) */
groupsRouter.get("/groups", (_req, _res, next) => {
  next(new Error("Not implemented — see issue #19 (groups API)"));
});

/** GET /groups/:id — fetch a single group with its members. (#19) */
groupsRouter.get("/groups/:id", (_req, _res, next) => {
  next(new Error("Not implemented — see issue #19 (groups API)"));
});
