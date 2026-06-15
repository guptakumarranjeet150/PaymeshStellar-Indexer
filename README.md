# PaymeshStellar Indexer

An off-chain indexer for the PaymeshStellar **AutoShare** payroll system — a decentralized payroll platform built on Stellar/Soroban where funds are automatically split among group members by predefined percentages.

The indexer ingests AutoShare contract events from the Soroban RPC, projects them into PostgreSQL, and serves the indexed payroll data (groups, members, distribution history) to the frontend over a REST API.

> **Status:** project scaffold. The directory structure and stubs are in place; the indexer logic is tracked as issues in [`issues.json`](issues.json).

## What it does

```text
 Soroban RPC  ──getEvents──▶  Poller ──decode──▶ Handlers ──▶ PostgreSQL ──▶ REST API ──▶ Frontend
 (AutoShare contract)          (cursor-tracked)   (project)     (projection)   (reads)
```

- **Ingestion worker** — polls `getEvents` for the AutoShare contract on a persisted cursor, decodes each Soroban event, and applies it (event + cursor advance in one transaction for crash-consistency).
- **REST API** — serves groups, members with their splits, and distribution history.

## Tech stack

| Layer | Choice |
| --- | --- |
| Runtime | Node.js ≥ 20, TypeScript (ESM) |
| Ingestion | Soroban RPC polling (`@stellar/stellar-sdk`) |
| Database | PostgreSQL |
| API | Express (REST) |
| Logging | pino |
| Tests | vitest |

## Project structure

```text
src/
├── index.ts                 # entry point — boots ingestion worker and/or API
├── config/env.ts            # validated env configuration
├── ingest/
│   ├── poller.ts            # Soroban getEvents polling loop
│   ├── decoder.ts           # decode Soroban XDR events → typed events
│   └── handlers/            # groupCreated, membersUpdated, distribution
├── db/
│   ├── client.ts            # pg connection pool + transaction helper
│   ├── migrate.ts           # forward-only migration runner
│   ├── migrations/          # SQL schema
│   └── repositories/        # typed data access per table
├── api/
│   ├── server.ts            # Express app + router wiring
│   ├── routes/              # groups, members, distributions, health
│   └── middleware/          # error handling
├── types/                   # domain types mirroring the contract models
└── utils/logger.ts
test/                        # vitest suites
docker-compose.yml           # local PostgreSQL
```

## Getting started

```bash
# 1. Install deps
npm install

# 2. Start local Postgres
docker compose up -d

# 3. Configure environment
cp .env.example .env        # set AUTOSHARE_CONTRACT_ID + SOROBAN_RPC_URL

# 4. Run migrations
npm run migrate

# 5. Run the indexer (ingestion + API)
npm run dev
```

### Run modes

```bash
npm run ingest   # ingestion worker only
npm run api      # REST API only
npm run dev      # both (default)
```

## REST API (planned)

| Method | Path | Description |
| --- | --- | --- |
| `GET` | `/health` | Liveness + last indexed ledger |
| `GET` | `/groups/:id` | Group with members |
| `GET` | `/groups?creator=<address>` | Groups owned by an address |
| `GET` | `/members/:address/groups` | Groups an address belongs to |
| `GET` | `/groups/:id/distributions` | Paginated payout history |

## Roadmap

The full build-out is broken into 28 issues in [`issues.json`](issues.json), grouped as:

- **Setup** (#1–#9): tooling, config, logging, DB, schema, types, bootstrap, RPC client
- **Database** (#10): repositories
- **Ingestion** (#11–#17, #26–#27): poller, decoder, cursor, error handling, event handlers, reorg, backfill
- **API** (#18–#22): server, groups, members, distributions, health
- **Quality & Ops** (#23–#25, #28): tests, CI, Docker, metrics
