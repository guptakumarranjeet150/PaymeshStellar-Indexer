import pg from "pg";
import { env } from "../config/env.js";
import { logger } from "../utils/logger.js";

const { Pool } = pg;

/**
 * Shared PostgreSQL connection pool.
 *
 * All repositories acquire connections from this single pool. Use `query` for
 * one-off statements and `withTransaction` when a unit of work must be atomic
 * (e.g. applying an event and advancing the cursor together).
 */
export const pool = new Pool({ connectionString: env.DATABASE_URL });

pool.on("error", (err) => {
  logger.error({ err }, "Unexpected idle Postgres client error");
});

export async function query<T extends pg.QueryResultRow = pg.QueryResultRow>(
  text: string,
  params?: unknown[],
): Promise<pg.QueryResult<T>> {
  return pool.query<T>(text, params as never[]);
}

/**
 * Run `fn` inside a single transaction, committing on success and rolling back
 * on any thrown error.
 */
export async function withTransaction<T>(
  fn: (client: pg.PoolClient) => Promise<T>,
): Promise<T> {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const result = await fn(client);
    await client.query("COMMIT");
    return result;
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
}

export async function closePool(): Promise<void> {
  await pool.end();
}
