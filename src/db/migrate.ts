import { readdir, readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { pool, closePool } from "./client.js";
import { logger } from "../utils/logger.js";

/**
 * Minimal forward-only migration runner.
 *
 * Applies every `*.sql` file in `migrations/` in lexical order exactly once,
 * tracking applied files in a `schema_migrations` table. Run with `npm run
 * migrate`.
 */
const log = logger.child({ component: "migrate" });
const migrationsDir = join(dirname(fileURLToPath(import.meta.url)), "migrations");

async function run(): Promise<void> {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS schema_migrations (
      name TEXT PRIMARY KEY,
      applied_at TIMESTAMPTZ NOT NULL DEFAULT now()
    );
  `);

  const files = (await readdir(migrationsDir))
    .filter((f) => f.endsWith(".sql"))
    .sort();

  for (const file of files) {
    const applied = await pool.query(
      "SELECT 1 FROM schema_migrations WHERE name = $1",
      [file],
    );
    if ((applied.rowCount ?? 0) > 0) {
      log.debug({ file }, "migration already applied, skipping");
      continue;
    }

    const sql = await readFile(join(migrationsDir, file), "utf8");
    log.info({ file }, "applying migration");
    await pool.query("BEGIN");
    try {
      await pool.query(sql);
      await pool.query("INSERT INTO schema_migrations (name) VALUES ($1)", [
        file,
      ]);
      await pool.query("COMMIT");
    } catch (err) {
      await pool.query("ROLLBACK");
      throw err;
    }
  }

  log.info("migrations complete");
}

run()
  .catch((err) => {
    log.error({ err }, "migration failed");
    process.exitCode = 1;
  })
  .finally(closePool);
