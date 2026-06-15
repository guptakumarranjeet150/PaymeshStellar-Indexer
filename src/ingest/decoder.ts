import type { xdr } from "@stellar/stellar-sdk";
import type { DecodedEvent } from "../types/index.js";

/**
 * Soroban event decoder.
 *
 * STRUCTURE ONLY. Implement XDR/ScVal decoding and topic→type mapping in the
 * decoder issue (#12). Should map the contract's emitted event symbols (see
 * contract `base/events.rs`) to internal `AutoShareEventType`s and convert the
 * ScVal payload to a native JS object — returning `null` for events the indexer
 * does not care about, and never throwing on a single malformed event.
 */

/** Shape of a single event entry returned by the Soroban RPC `getEvents`. */
export interface RawRpcEvent {
  type: string;
  ledger: number;
  txHash: string;
  id: string;
  pagingToken: string;
  topic: xdr.ScVal[];
  value: xdr.ScVal;
}

/** Decode a raw RPC event into a typed `DecodedEvent`, or `null` to skip. (#12) */
export function decodeEvent(
  _raw: RawRpcEvent,
  _eventIndex: number,
): DecodedEvent | null {
  throw new Error("Not implemented — see issue #12 (event decoder)");
}
