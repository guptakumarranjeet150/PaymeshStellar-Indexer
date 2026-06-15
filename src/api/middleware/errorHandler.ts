import type { NextFunction, Request, Response } from "express";
import { logger } from "../../utils/logger.js";

const log = logger.child({ component: "api" });

/** A typed error carrying an HTTP status, thrown by routes for client errors. */
export class HttpError extends Error {
  constructor(
    public readonly status: number,
    message: string,
  ) {
    super(message);
  }
}

/** Express error-handling middleware. Must be registered last. */
export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void {
  if (err instanceof HttpError) {
    res.status(err.status).json({ error: err.message });
    return;
  }
  log.error({ err }, "unhandled API error");
  res.status(500).json({ error: "Internal Server Error" });
}
