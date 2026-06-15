import type pg from "pg";
import type { DecodedEvent } from "../../types/index.js";

/**
 * Handle a `distributed` event → record a distribution and its payouts. (#17)
 *
 * STRUCTURE ONLY. Expected decoded `data` shape (confirm against contract
 * `events.rs`): `{ group_id, token, total, payouts: [{ address, amount }] }`.
 */
export async function handleDistribution(
  _db: Pick<pg.PoolClient, "query">,
  _event: DecodedEvent,
): Promise<void> {
  throw new Error("Not implemented — see issue #17 (distributed handler)");
}
