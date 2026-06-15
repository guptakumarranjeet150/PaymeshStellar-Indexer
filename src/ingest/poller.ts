/**
 * Soroban RPC ingestion loop.
 *
 * STRUCTURE ONLY. Implement the polling loop in the poller issue (#11):
 *  - read the cursor, call `getEvents` for the AutoShare contract,
 *  - decode each event (decoder, #12),
 *  - apply it via the matching handler and advance the cursor inside one
 *    transaction so ingestion stays crash-consistent (#13),
 *  - back off and retry on RPC errors instead of crashing (#14).
 */
export class Poller {
  private stopped = false;

  stop(): void {
    this.stopped = true;
  }

  /** Start the long-running ingestion loop. (#11) */
  async start(): Promise<void> {
    void this.stopped;
    void this.tick;
    throw new Error("Not implemented — see issue #11 (Soroban RPC poller)");
  }

  /** Process one page of events from the current cursor position. (#11) */
  private async tick(): Promise<void> {
    throw new Error("Not implemented — see issue #11 (Soroban RPC poller)");
  }
}
