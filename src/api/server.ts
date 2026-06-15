import express, { type Express } from "express";
import { healthRouter } from "./routes/health.js";
import { groupsRouter } from "./routes/groups.js";
import { membersRouter } from "./routes/members.js";
import { distributionsRouter } from "./routes/distributions.js";
import { errorHandler } from "./middleware/errorHandler.js";

/**
 * Build the REST API Express app and mount routers.
 *
 * STRUCTURE ONLY. Wiring is sketched here; CORS, JSON parsing, request logging
 * and graceful startup are implemented in the API server issue (#18).
 */
export function createServer(): Express {
  const app = express();

  // TODO (#18): app.use(cors(...)), express.json(), request logging.

  app.use(healthRouter);
  app.use(groupsRouter);
  app.use(membersRouter);
  app.use(distributionsRouter);

  app.use(errorHandler);

  return app;
}
