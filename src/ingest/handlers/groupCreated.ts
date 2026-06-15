import type pg from "pg";
import type { DecodedEvent } from "../../types/index.js";

/**
 * Handle a `group_created` event → project into the `groups` table. (#15)
 *
 * STRUCTURE ONLY. Expected decoded `data` shape (confirm against contract
 * `events.rs`): `{ id, creator, name, token, usage_count }`.
 */
export async function handleGroupCreated(
  _db: Pick<pg.PoolClient, "query">,
  _event: DecodedEvent,
): Promise<void> {
  throw new Error("Not implemented — see issue #15 (group_created handler)");
}
