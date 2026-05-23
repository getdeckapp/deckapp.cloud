---
title: Connecting Agents
description: Wire each Laravel app to Deck Cloud with API keys and environment variables.
---

Each Laravel app with `deck/deck` installed becomes a Cloud agent when you set an API key. Complete [Cloud setup](/cloud/getting-started/) first so you have matching project, environment, and token values.

## Agent configuration

```env
DECK_PROJECT=billing-api
DECK_ENVIRONMENT=production
DECK_API_KEY=your-agent-token
DECK_CLOUD_URL=https://app.deckapp.cloud
```

`DECK_PROJECT` and `DECK_ENVIRONMENT` must match the slugs created in Cloud. The API key enables the agent automatically — no extra flag required unless you want to disable sync temporarily.

## Environment variables

| Variable | Default | Purpose |
| --- | --- | --- |
| `DECK_API_KEY` | — | Agent token; enables Cloud when set |
| `DECK_CLOUD_URL` | `http://deck.test` (local) / `https://app.deckapp.cloud` | Cloud base URL |
| `DECK_CLOUD_ENABLED` | auto | Set `false` to disable while keeping the key |
| `DECK_CLOUD_WORKERS_ENABLED` | `true` | Push worker snapshots |
| `DECK_CLOUD_WORKERS_INTERVAL` | `30` | Sync throttle in seconds |
| `DECK_CLOUD_COMMANDS_ENABLED` | `true` | Pull remote commands |
| `DECK_CLOUD_EVENTS_ENABLED` | `true` | Push execution events |
| `DECK_CLOUD_EVENTS_BATCH_SIZE` | `25` | Event batch size (1–100) |
| `DECK_CLOUD_PROMO` | `true` | Sidebar link to deckapp.cloud when Cloud is off |

Set `DECK_CLOUD_ENABLED=false` to disable the agent without removing the API key.

## Verify the connection

```bash
# With Laravel Horizon (recommended)
php artisan horizon

# Or, without Horizon:
php artisan queue:work

# Dispatch any queued job on your Laravel app.
# Executions should appear in Cloud Activity within a few seconds.
```

Check **Settings → Installation** in Cloud for connection status. The local `/deck` sidebar also shows a Cloud connection indicator when linked.

## Scheduled sync

The agent syncs workers and polls commands on Horizon `MasterSupervisorLooped`, throttled `Queue::looping` (when Horizon is not installed), and via `deck:report-workers` / `deck:poll-commands`. If Horizon is installed but not running, rely on the scheduled commands or run `deck:report-workers` manually.

Package-side Cloud settings live under `cloud.*` in `config/deck.php` — see the published config after `deck:install`.
