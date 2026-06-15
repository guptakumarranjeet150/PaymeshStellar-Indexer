import { config as loadDotenv } from "dotenv";
import { z } from "zod";

loadDotenv();

/**
 * Centralised, validated runtime configuration.
 *
 * Every environment variable the indexer reads is declared and parsed here so
 * the rest of the codebase consumes a typed, already-validated object instead
 * of touching `process.env` directly.
 */
const schema = z.object({
  SOROBAN_RPC_URL: z.string().url(),
  STELLAR_NETWORK_PASSPHRASE: z.string().min(1),
  AUTOSHARE_CONTRACT_ID: z.string().min(1, "AUTOSHARE_CONTRACT_ID is required"),
  START_LEDGER: z.coerce.number().int().nonnegative().default(0),

  POLL_INTERVAL_MS: z.coerce.number().int().positive().default(5000),
  EVENTS_PAGE_SIZE: z.coerce.number().int().positive().max(10000).default(100),

  DATABASE_URL: z.string().min(1),

  API_PORT: z.coerce.number().int().positive().default(4000),
  API_CORS_ORIGINS: z
    .string()
    .default("http://localhost:3000")
    .transform((v) => v.split(",").map((s) => s.trim()).filter(Boolean)),

  LOG_LEVEL: z
    .enum(["trace", "debug", "info", "warn", "error"])
    .default("info"),
});

const parsed = schema.safeParse(process.env);

if (!parsed.success) {
  // Fail fast and loud — a misconfigured indexer should never start.
  console.error("❌ Invalid environment configuration:");
  console.error(parsed.error.flatten().fieldErrors);
  process.exit(1);
}

export const env = parsed.data;
export type Env = typeof env;
