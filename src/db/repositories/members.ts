import type pg from "pg";
import type { GroupMember } from "../../types/index.js";

type Queryable = Pick<pg.PoolClient, "query">;

/**
 * Members repository — data access for the `group_members` table.
 *
 * STRUCTURE ONLY. Implement query bodies in the database issues.
 */

/** Replace the full member set for a group (delete-then-insert). (#10) */
export async function replaceMembers(
  _db: Queryable,
  _groupId: string,
  _members: GroupMember[],
): Promise<void> {
  throw new Error("Not implemented — see issue #10 (members repository)");
}
