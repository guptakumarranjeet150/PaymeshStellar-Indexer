-- Initial schema for the PaymeshStellar indexer.
-- Projected, query-optimised view of on-chain AutoShare state plus a raw event
-- log and the ingestion cursor.

CREATE TABLE IF NOT EXISTS groups (
    id              TEXT PRIMARY KEY,
    creator         TEXT NOT NULL,
    name            TEXT NOT NULL,
    token           TEXT NOT NULL,
    usage_count     INTEGER NOT NULL DEFAULT 0,
    created_ledger  BIGINT NOT NULL,
    updated_ledger  BIGINT NOT NULL,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_groups_creator ON groups (creator);

CREATE TABLE IF NOT EXISTS group_members (
    group_id    TEXT NOT NULL REFERENCES groups (id) ON DELETE CASCADE,
    address     TEXT NOT NULL,
    share_bps   INTEGER NOT NULL CHECK (share_bps >= 0 AND share_bps <= 10000),
    PRIMARY KEY (group_id, address)
);

CREATE INDEX IF NOT EXISTS idx_group_members_address ON group_members (address);

CREATE TABLE IF NOT EXISTS distributions (
    id            TEXT PRIMARY KEY,
    group_id      TEXT NOT NULL REFERENCES groups (id) ON DELETE CASCADE,
    total_amount  NUMERIC(40, 0) NOT NULL,
    token         TEXT NOT NULL,
    ledger        BIGINT NOT NULL,
    tx_hash       TEXT NOT NULL,
    created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_distributions_group ON distributions (group_id);
CREATE INDEX IF NOT EXISTS idx_distributions_ledger ON distributions (ledger);

CREATE TABLE IF NOT EXISTS distribution_payouts (
    distribution_id  TEXT NOT NULL REFERENCES distributions (id) ON DELETE CASCADE,
    address          TEXT NOT NULL,
    amount           NUMERIC(40, 0) NOT NULL,
    PRIMARY KEY (distribution_id, address)
);

CREATE INDEX IF NOT EXISTS idx_payouts_address ON distribution_payouts (address);

-- Raw, append-only log of every decoded contract event for replay/debugging.
CREATE TABLE IF NOT EXISTS raw_events (
    paging_token  TEXT PRIMARY KEY,
    event_type    TEXT NOT NULL,
    ledger        BIGINT NOT NULL,
    tx_hash       TEXT NOT NULL,
    event_index   INTEGER NOT NULL,
    payload       JSONB NOT NULL,
    ingested_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_raw_events_ledger ON raw_events (ledger);
CREATE INDEX IF NOT EXISTS idx_raw_events_type ON raw_events (event_type);

-- Single-row ingestion cursor so restarts resume from the last processed point.
CREATE TABLE IF NOT EXISTS ingest_cursor (
    id            BOOLEAN PRIMARY KEY DEFAULT TRUE CHECK (id),
    last_ledger   BIGINT NOT NULL DEFAULT 0,
    paging_token  TEXT,
    updated_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);
