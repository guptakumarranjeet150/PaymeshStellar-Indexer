import pino from "pino";
import { env } from "../config/env.js";

/**
 * Application-wide structured logger.
 *
 * In development output is pretty-printed; in production it emits JSON lines
 * suitable for log aggregation. Create child loggers with `logger.child({...})`
 * to attach component context (e.g. `{ component: "poller" }`).
 */
export const logger = pino({
  level: env.LOG_LEVEL,
  transport:
    process.env.NODE_ENV === "production"
      ? undefined
      : {
          target: "pino-pretty",
          options: { colorize: true, translateTime: "SYS:standard" },
        },
});

export type Logger = typeof logger;
