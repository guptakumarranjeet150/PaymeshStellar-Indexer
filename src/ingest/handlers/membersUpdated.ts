import type pg from "pg";
import type { DecodedEvent } from "../../types/index.js";

/**
 * Handle a `members_updated` event → replace the group's member set. (#16)
 *
 * STRUCTURE ONLY. Expected decoded `data` shape (confirm against contract
 * `events.rs`): `{ group_id, members: [{ address, share_bps }] }`.
 */
export async function handleMembersUpdated(
  _db: Pick<pg.PoolClient, "query">,
  _event: DecodedEvent,
): Promise<void> {
  throw new Error("Not implemented — see issue #16 (members_updated handler)");
}
