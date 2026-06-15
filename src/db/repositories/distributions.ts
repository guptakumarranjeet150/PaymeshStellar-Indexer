import type pg from "pg";
import type { Distribution } from "../../types/index.js";

type Queryable = Pick<pg.PoolClient, "query">;

/**
 * Distributions repository — data access for `distributions` /
 * `distribution_payouts`.
 *
 * STRUCTURE ONLY. Implement query bodies in the database issues.
 */

export interface DistributionPage {
  limit: number;
  offset: number;
}

/** Persist a distribution and its per-member payout breakdown. (#10) */
export async function insertDistribution(
  _db: Queryable,
  _dist: Distribution,
): Promise<void> {
  throw new Error("Not implemented — see issue #10 (distributions repository)");
}

/** Page through a group's distribution history, newest first. (#10) */
export async function getDistributionsByGroup(
  _groupId: string,
  _page: DistributionPage,
): Promise<Distribution[]> {
  throw new Error("Not implemented — see issue #10 (distributions repository)");
}
