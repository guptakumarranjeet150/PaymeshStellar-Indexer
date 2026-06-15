import type pg from "pg";

type Queryable = Pick<pg.PoolClient, "query">;

/**
 * Ingestion cursor repository — reads/advances the single-row `ingest_cursor`.
 *
 * STRUCTURE ONLY. Implement query bodies in the cursor-persistence issue.
 */

export interface Cursor {
  lastLedger: number;
  pagingToken: string | null;
}

/** Read the ingestion cursor, seeding a default row on first run. (#13) */
export async function getCursor(): Promise<Cursor> {
  throw new Error("Not implemented — see issue #13 (cursor persistence)");
}

/** Advance the cursor (call within the same tx that applies events). (#13) */
export async function setCursor(
  _db: Queryable,
  _cursor: Cursor,
): Promise<void> {
  throw new Error("Not implemented — see issue #13 (cursor persistence)");
}
