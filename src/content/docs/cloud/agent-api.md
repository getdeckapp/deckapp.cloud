---
title: Agent API
description: Ingest endpoints, command polling, and idempotency rules for Cloud agents.
---

When the Cloud agent is enabled, the package communicates with Deck Cloud over HTTPS using your API key. All endpoints live under `DECK_CLOUD_URL` (default `https://app.deckapp.cloud`).

## Endpoints

| Method | Endpoint | Purpose |
| --- | --- | --- |
| POST | `/api/v1/ingest/workers` | Worker snapshots + optional queue workload (max 100 workers) |
| GET | `/api/v1/agent/commands` | Pull commands for this project + environment |
| POST | `/api/v1/agent/commands/ack` | Acknowledge command results |
| POST | `/api/v1/ingest/events` | Batched execution events (max 100 per request) |

## Execution events

Events are idempotent on `(uuid, attempt)` — status updates in place (running → completed). Re-sending the same status is a no-op duplicate. Stale `running` events after a terminal status for the same `(uuid, attempt)` are ignored.

## Remote commands

Commands pulled from Cloud map to these agent actions:

| Command | Effect |
| --- | --- |
| `requestCancelExecution` | Cooperative cancel for a running job |
| `forceCancelExecution` | Force cancel flag |
| `cancelPending` | Remove pending jobs from queue |
| `blockClass` | Block a job class from dispatching |
| `unblockClass` | Remove a class block |
| `cancelAllRunningForClass` | Cancel all in-flight jobs for a class |

Configure sync behaviour via the variables in [Connecting Agents](/cloud/connecting-agents/).

Sync runs on Horizon `MasterSupervisorLooped` (when Horizon is installed), throttled `Queue::looping` (only when Horizon is **not** installed), and scheduled `deck:report-workers` / `deck:poll-commands`. If you use `queue:work` while the Horizon package is installed but Horizon is not running, rely on the scheduled commands or run `deck:report-workers` manually.
