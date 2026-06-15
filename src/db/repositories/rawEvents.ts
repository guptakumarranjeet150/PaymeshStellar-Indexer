import type pg from "pg";
import type { DecodedEvent } from "../../types/index.js";

type Queryable = Pick<pg.PoolClient, "query">;

/**
 * Raw events repository — append-only log of decoded events for replay/debug.
 *
 * STRUCTURE ONLY. Implement query body in the database issues.
 */

/** Append a decoded event to the immutable raw log (idempotent). (#10) */
export async function insertRawEvent(
  _db: Queryable,
  _event: DecodedEvent,
): Promise<void> {
  throw new Error("Not implemented — see issue #10 (raw events repository)");
}
