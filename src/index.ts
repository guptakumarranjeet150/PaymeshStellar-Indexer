import { env } from "./config/env.js";
import { logger } from "./utils/logger.js";
import { Poller } from "./ingest/poller.js";
import { createServer } from "./api/server.js";
import { closePool } from "./db/client.js";

/**
 * Indexer entry point.
 *
 * Supports three run modes via `--mode=`:
 *   - `ingest` → run only the Soroban ingestion worker
 *   - `api`    → run only the REST API
 *   - `all`    → run both in one process (default)
 *
 * STRUCTURE ONLY. Process orchestration and graceful shutdown wiring are
 * completed in the bootstrap issue (#8).
 */
function parseMode(): "ingest" | "api" | "all" {
  const arg = process.argv.find((a) => a.startsWith("--mode="));
  const mode = arg?.split("=")[1];
  if (mode === "ingest" || mode === "api") return mode;
  return "all";
}

async function main(): Promise<void> {
  const mode = parseMode();
  logger.info({ mode }, "starting paymesh-stellar-indexer");

  // TODO (#8): start poller and/or API based on mode, wire SIGINT/SIGTERM
  //            handlers to stop the poller, drain the server, and closePool().
  void Poller;
  void createServer;
  void closePool;
  void env;

  throw new Error("Not implemented — see issue #8 (process bootstrap)");
}

main().catch((err) => {
  logger.error({ err }, "fatal startup error");
  process.exitCode = 1;
});
