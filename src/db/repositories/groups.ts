import type pg from "pg";
import type { Group, GroupMember } from "../../types/index.js";

type Queryable = Pick<pg.PoolClient, "query">;

/**
 * Groups repository — data access for the `groups` / `group_members` tables.
 *
 * STRUCTURE ONLY. Implement query bodies in the database issues.
 */

/** Insert a group, or update its mutable fields if it already exists. (#10) */
export async function upsertGroup(
  _db: Queryable,
  _group: Group,
): Promise<void> {
  throw new Error("Not implemented — see issue #10 (groups repository)");
}

/** Fetch a single group by id, with its members. (#10) */
export async function getGroupById(
  _id: string,
): Promise<(Group & { members: GroupMember[] }) | null> {
  throw new Error("Not implemented — see issue #10 (groups repository)");
}

/** List all groups owned by a creator address. (#10) */
export async function getGroupsByCreator(
  _creator: string,
): Promise<Group[]> {
  throw new Error("Not implemented — see issue #10 (groups repository)");
}
