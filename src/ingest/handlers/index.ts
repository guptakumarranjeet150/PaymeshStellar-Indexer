import type pg from "pg";
import type { AutoShareEventType, DecodedEvent } from "../../types/index.js";
import { handleGroupCreated } from "./groupCreated.js";
import { handleMembersUpdated } from "./membersUpdated.js";
import { handleDistribution } from "./distribution.js";

type Handler = (
  db: Pick<pg.PoolClient, "query">,
  event: DecodedEvent,
) => Promise<void>;

/** Routing table from event type to its handler. */
export const handlers: Record<AutoShareEventType, Handler> = {
  group_created: handleGroupCreated,
  members_updated: handleMembersUpdated,
  distributed: handleDistribution,
};
