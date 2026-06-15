/**
 * Domain types mirroring the on-chain AutoShare contract models.
 *
 * These intentionally mirror the contract's `GroupMember` / `AutoShareDetails`
 * structures (see PaymeshStellar contract `base/types.rs`) so the indexed
 * projection stays faithful to on-chain state.
 */

/** A single payroll group member and their percentage allocation. */
export interface GroupMember {
  /** Stellar address (G... or C...) of the member. */
  address: string;
  /** Share in basis points (0–10000) so splits stay integer-exact. */
  shareBps: number;
}

/** Projected state of a payroll group. */
export interface Group {
  /** On-chain group id. */
  id: string;
  /** Address of the group creator/owner. */
  creator: string;
  /** Human-readable group name. */
  name: string;
  /** Payment token contract id used for distributions. */
  token: string;
  /** Remaining usage count for the group. */
  usageCount: number;
  /** Ledger sequence the group was created at. */
  createdLedger: number;
  /** Ledger sequence of the last update applied. */
  updatedLedger: number;
}

/** A distribution (payout split) executed against a group. */
export interface Distribution {
  /** Synthetic id (ledger + tx + index). */
  id: string;
  groupId: string;
  /** Total amount distributed, as a stringified i128 (stroops/token units). */
  totalAmount: string;
  token: string;
  ledger: number;
  /** Transaction hash that triggered the distribution. */
  txHash: string;
  /** Per-member payout breakdown. */
  payouts: DistributionPayout[];
}

export interface DistributionPayout {
  address: string;
  amount: string;
}

/** The kinds of contract events the indexer recognises. */
export type AutoShareEventType =
  | "group_created"
  | "members_updated"
  | "distributed";

/** A decoded contract event ready to be handled. */
export interface DecodedEvent<T = unknown> {
  type: AutoShareEventType;
  ledger: number;
  txHash: string;
  /** Position of the event within its transaction. */
  eventIndex: number;
  /** RPC paging token for cursor persistence. */
  pagingToken: string;
  data: T;
}
